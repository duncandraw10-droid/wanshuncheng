from bs4 import BeautifulSoup
import re

with open('index.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

# Update Desktop Nav
desktop_nav = soup.select_one('header nav')
desktop_links = desktop_nav.find_all('a', href=re.compile(r'^#'))
# Remove old links except CTA
for a in desktop_links:
    if a.get('href') != '#contact':
        a.extract()

new_links_data = [
    ('#applications', '承製案例'),
    ('#capabilities', '製造能力'),
    ('#equipment', '設備能力'),
    ('#workflow', '合作流程'),
    ('#about', '關於萬順承')
]

cta = desktop_nav.find('a', href='#contact')
for href, text in new_links_data:
    new_a = soup.new_tag('a', href=href, **{'class': 'text-[15px] font-medium text-slate-300 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1 py-1'})
    new_a.string = text
    desktop_nav.insert_before(cta, new_a)

# Update Mobile Nav
mobile_nav = soup.select_one('#mobile-menu')
mobile_links = mobile_nav.find_all('a', href=re.compile(r'^#'))
for a in mobile_links:
    if a.get('href') != '#contact':
        a.extract()

cta_mobile = mobile_nav.find('a', href='#contact')
for href, text in new_links_data:
    new_a = soup.new_tag('a', href=href, **{'class': 'mobile-nav-link block py-2 text-[15px] font-medium text-slate-300 hover:text-white border-b border-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm'})
    new_a.string = text
    mobile_nav.insert_before(cta_mobile, new_a)

# Update Footer Nav
footer_nav = soup.select_one('footer .flex.flex-wrap')
if footer_nav:
    footer_nav.clear()
    for i, (href, text) in enumerate(new_links_data):
        new_a = soup.new_tag('a', href=href, **{'class': 'hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded'})
        new_a.string = text
        footer_nav.append(new_a)
        if i < len(new_links_data) - 1:
            span = soup.new_tag('span', **{'class': 'hidden sm:inline text-slate-600'})
            span.string = '•'
            footer_nav.append(span)

# Reorder sections in main
main = soup.select_one('main')
hero = main.find('section', class_=re.compile(r'relative pt-24'))
applications = main.find('section', id='applications')
capabilities = main.find('section', id='capabilities')
equipment = main.find('section', id='equipment')
workflow = main.find('section', id='workflow')
about = main.find('section', id='about')
contact = main.find('section', id='contact')

for sec in [hero, applications, capabilities, equipment, workflow, about, contact]:
    if sec:
        sec.extract()

main.append(hero)
main.append(applications)
main.append(capabilities)
main.append(equipment)
main.append(workflow)
main.append(about)
main.append(contact)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))
