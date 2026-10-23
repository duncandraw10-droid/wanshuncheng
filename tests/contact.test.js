import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';

function setup(host = 'wsctw.com') {
  const writes = [], events = [], messages = [], handlers = {};
  const button = { dataset: { copyText: 'info@wsctw.com' }, addEventListener: (name, fn) => { handlers.copy = fn; } };
  const template = { addEventListener: (name, fn) => { handlers.template = fn; } };
  const toast = { textContent: '' };
  const source = fs.readFileSync(new URL('../src/contact.js', import.meta.url), 'utf8').replace('export function', 'function');
  vm.runInNewContext(source + '\ninitContact();', {
    document: {
      getElementById: id => id === 'toast-message' ? toast : {},
      querySelector: selector => selector === '[data-copy-template]' ? template : null,
      querySelectorAll: () => [button],
      addEventListener: (name, fn) => { handlers[name] = fn; },
    },
    navigator: { clipboard: { writeText: async text => { writes.push(text); } } },
    bootstrap: { Toast: { getOrCreateInstance: () => ({ show: () => messages.push(toast.textContent) }) } },
    location: { hostname: host, origin: `https://${host}`, href: `https://${host}/cases/bmc-tabletop.html` },
    URL,
    window: { gtag: (...args) => events.push(args) },
  });
  return { writes, events, messages, handlers };
}

test('copies the public company email and exact inquiry template with feedback', async () => {
  const h = setup(); await h.handlers.copy(); await h.handlers.template();
  assert.equal(h.writes[0], 'info@wsctw.com');
  assert.equal(h.writes[1], '您好，我們有模壓成型的需求，請協助評估：\n\n1. 產品用途與尺寸：\n2. 材料與性能要求（如已知）：\n3. 預計數量：\n4. 是否已有模具：\n5. 希望交期：\n6. 關鍵尺寸、外觀與驗收要求：\n\n（備註：將隨信附上圖面或產品照片）');
  assert.deepEqual(h.messages, ['已複製！', '已複製！']);
  assert.equal(h.events.length, 2);
  assert.ok(!JSON.stringify(h.events).includes('info@wsctw.com'));
});

test('preview copy actions do not send GA4 events', async () => {
  const h = setup('127.0.0.1'); await h.handlers.copy();
  assert.equal(h.events.length, 0); assert.equal(h.writes.length, 1);
});

function clickAnchor(h, href, area = 'service_intro') {
  const anchor = {
    getAttribute: () => href,
    closest: selector => selector === '[data-contact-location]' ? { dataset: { contactLocation: area } } : null,
  };
  h.handlers.click({ target: { closest: () => anchor } });
}

test('tracks local and cross-page inquiry anchors exactly once, without counting external hashes', () => {
  const h = setup();
  for (const href of ['#contact', '../#contact', 'https://wsctw.com/#contact']) clickAnchor(h, href);
  clickAnchor(h, 'https://example.com/#contact');
  clickAnchor(h, '../#equipment');
  assert.equal(h.events.length, 3);
  for (const [, name, data] of h.events) {
    assert.equal(name, 'inquiry_cta_click'); assert.equal(data.contact_location, 'service_intro');
    assert.deepEqual(Object.keys(data).sort(), ['contact_location', 'transport_type']);
  }
});

test('phone and mail links stay distinct from inquiry navigation and never include mail content', () => {
  const h = setup();
  clickAnchor(h, 'tel:034721912', 'case_intro');
  clickAnchor(h, 'mailto:info@wsctw.com?subject=private&body=confidential', 'case_intro');
  assert.equal(h.events.length, 2);
  assert.equal(h.events[0][1], 'contact_click'); assert.equal(h.events[0][2].contact_method, 'phone');
  assert.equal(h.events[1][2].contact_method, 'email'); assert.equal(h.events[1][2].contact_location, 'case_intro');
  assert.ok(!JSON.stringify(h.events).includes('confidential'));
});

test('preview navigation and contact clicks stay out of production analytics', () => {
  const h = setup('127.0.0.1'); clickAnchor(h, '#contact'); clickAnchor(h, 'tel:034721912');
  assert.equal(h.events.length, 0);
});
