import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Equipment Container
old_container = r'<div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-6 items-stretch">'
new_container = r'<div class="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 lg:gap-8 pb-4 pt-1 scrollbar-hide -mx-5 px-[7.5vw] md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible items-stretch">'
html = html.replace(old_container, new_container)

# 2. Update Equipment Cards
old_card1 = r'<div class="reveal delay-0 bg-white rounded-md border border-slate-200 overflow-hidden relative flex flex-col h-full">'
new_card1 = r'<div class="w-[85vw] md:w-full shrink-0 snap-center md:snap-align-none reveal delay-0 bg-white rounded-md border border-slate-200 overflow-hidden relative flex flex-col h-full">'
html = html.replace(old_card1, new_card1)

old_card2 = r'<div class="reveal delay-60 bg-white rounded-md border border-slate-200 overflow-hidden relative flex flex-col h-full">'
new_card2 = r'<div class="w-[85vw] md:w-full shrink-0 snap-center md:snap-align-none reveal delay-60 bg-white rounded-md border border-slate-200 overflow-hidden relative flex flex-col h-full">'
html = html.replace(old_card2, new_card2)

old_card3 = r'<div class="reveal delay-120 bg-white rounded-md border border-slate-200 overflow-hidden relative flex flex-col h-full">'
new_card3 = r'<div class="w-[85vw] md:w-full shrink-0 snap-center md:snap-align-none reveal delay-120 bg-white rounded-md border border-slate-200 overflow-hidden relative flex flex-col h-full">'
html = html.replace(old_card3, new_card3)

# 3. Remove Aux Equipment Section
aux_regex = r'<!-- Aux Equipment -->.*?<!-- CTA -->'
html = re.sub(aux_regex, '<!-- CTA -->', html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
