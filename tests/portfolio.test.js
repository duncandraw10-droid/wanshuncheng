import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';

// Exercise the production module with a controlled clock and native-scroll stand-in.
// No Bootstrap or browser internals are reimplemented here.
class Element {
  constructor() {
    this.handlers = {}; this.classes = new Set(); this.children = {}; this.attributes = {};
    this.classList = { contains: name => this.classes.has(name), toggle: (name, open) => open ? this.classes.add(name) : this.classes.delete(name) };
    this.style = { setProperty() {} };
  }
  addEventListener(name, fn) { (this.handlers[name] ||= []).push(fn); }
  emit(name, event = {}) { (this.handlers[name] || []).forEach(fn => fn(event)); }
  querySelector(selector) { return this.children[selector] || null; }
  contains(element) { return element === this || element?.insideGallery; }
  matches() { return this.focusVisible || false; }
  setAttribute(name, value) { this.attributes[name] = value; }
}

function setup() {
  const gallery = new Element(), slider = new Element(), prev = new Element(), next = new Element();
  const button = new Element(), card = new Element(), toggle = new Element(), modal = new Element();
  const doc = new Element(), motion = new Element(), hover = new Element();
  button.children['.portfolio-autoplay-icon path'] = new Element();
  button.insideGallery = true;
  toggle.children['.application-detail-label'] = new Element();
  card.children = { '.application-detail-toggle': toggle, '.application-details': new Element(), h3: { textContent: '案例' }, '.application-image-frame': new Element(), '.application-caption': new Element() };
  slider.closest = () => gallery;
  slider.scrollWidth = 1800; slider.clientWidth = 900; slider.scrollLeft = 0;
  slider.querySelectorAll = () => [{ offsetLeft: 0 }, { offsetLeft: 300 }];
  slider.scrollBy = ({ left }) => { slider.scrollLeft = Math.min(900, Math.max(0, slider.scrollLeft + left)); slider.emit('scroll'); };
  slider.scrollTo = ({ left }) => { slider.scrollLeft = Math.min(900, left); slider.emit('scroll'); };
  doc.activeElement = new Element(); doc.hidden = false;
  doc.getElementById = id => ({ 'portfolio-slider': slider, 'slider-prev': prev, 'slider-next': next, 'portfolio-autoplay': button })[id];
  doc.querySelectorAll = selector => selector === '.application-card' ? [card] : [];
  motion.matches = false; hover.matches = true;
  const timers = new Map(), frames = []; let timerId = 0, intersection;
  const scope = {
    document: doc, queueMicrotask: fn => fn(), clearTimeout: id => timers.delete(id),
    requestAnimationFrame: fn => { frames.push(fn); return frames.length; },
    window: { matchMedia: () => hover, setTimeout: (fn, delay) => { assert.equal(delay, 4000); timers.set(++timerId, fn); return timerId; } },
    IntersectionObserver: class { constructor(fn) { intersection = fn; } observe() {} },
    ResizeObserver: class { constructor(fn) { this.fn = fn; } observe() { this.fn(); } },
    motion, modal,
  };
  const source = fs.readFileSync(new URL('../src/portfolio.js', import.meta.url), 'utf8').replace('export function', 'function');
  vm.runInNewContext(source + '\ninitPortfolio({motion, modalElement:modal});', scope);
  return {
    gallery, slider, prev, next, button, card, toggle, doc, motion, modal, hover, timers,
    visible: value => intersection([{ isIntersecting: value, intersectionRatio: value ? 1 : 0 }]),
    flush: () => { while (frames.length) frames.shift()(); },
    tick: () => { assert.equal(timers.size, 1); const [id, fn] = timers.entries().next().value; timers.delete(id); fn(); },
  };
}

test('advances one card, wraps and preserves user pause across section visits', () => {
  const h = setup(); assert.equal(h.timers.size, 0);
  h.visible(true); h.tick(); h.flush(); assert.equal(h.slider.scrollLeft, 300);
  h.slider.scrollLeft = 900; h.tick(); h.flush(); assert.equal(h.slider.scrollLeft, 0);
  h.button.emit('click'); assert.equal(h.timers.size, 0);
  h.visible(false); h.visible(true); assert.equal(h.timers.size, 0);
  assert.equal(h.button.attributes['aria-label'], '開始承製案例自動輪播');
  assert.equal(h.button.children['.portfolio-autoplay-icon path'].attributes.d, 'M8 5v14l11-7z');
  h.button.emit('click'); assert.equal(h.timers.size, 1);
  h.next.emit('click'); h.flush(); assert.equal(h.slider.scrollLeft, 300);
  h.prev.emit('click'); h.flush(); assert.equal(h.slider.scrollLeft, 0);
});

test('pauses for hover, drag, expanded text, image zoom and keyboard reading', () => {
  const h = setup(); h.visible(true);
  h.gallery.emit('pointerenter', { pointerType: 'mouse' }); assert.equal(h.timers.size, 0);
  h.gallery.emit('pointerleave', { pointerType: 'mouse' }); assert.equal(h.timers.size, 1);
  h.gallery.emit('pointerdown'); assert.equal(h.timers.size, 0);
  h.doc.emit('pointercancel'); assert.equal(h.timers.size, 1);
  h.toggle.emit('click'); assert.equal(h.timers.size, 0); assert.equal(h.toggle.attributes['aria-expanded'], 'true');
  h.toggle.emit('click'); assert.equal(h.timers.size, 1); assert.equal(h.toggle.attributes['aria-expanded'], 'false');
  h.modal.emit('show.bs.modal'); assert.equal(h.timers.size, 0);
  h.modal.emit('hidden.bs.modal'); assert.equal(h.timers.size, 1);
  const focus = new Element(); focus.insideGallery = true; focus.focusVisible = true; h.doc.activeElement = focus;
  h.gallery.emit('focusin'); assert.equal(h.timers.size, 0);
  focus.focusVisible = false; h.gallery.emit('focusin'); assert.equal(h.timers.size, 1);
});

test('respects reduced motion, background tabs, offscreen state and touch breakpoints', () => {
  const h = setup(); h.visible(true);
  h.doc.hidden = true; h.doc.emit('visibilitychange'); assert.equal(h.timers.size, 0);
  h.doc.hidden = false; h.doc.emit('visibilitychange'); assert.equal(h.timers.size, 1);
  h.motion.matches = true; h.motion.emit('change'); assert.equal(h.timers.size, 0); assert.equal(h.button.disabled, true);
  h.motion.matches = false; h.motion.emit('change'); assert.equal(h.timers.size, 1);
  h.hover.matches = false; h.hover.emit('change');
  h.gallery.emit('pointerenter', { pointerType: 'mouse' }); assert.equal(h.timers.size, 1);
  h.visible(false); assert.equal(h.timers.size, 0);
});
