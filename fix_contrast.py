import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Portfolio slider list labels
html = html.replace('text-slate-400 shrink-0', 'text-slate-500 shrink-0')

# Capabilities list icons
html = html.replace('text-slate-400 text-[18px]', 'text-slate-500 text-[18px]')
html = html.replace('text-slate-300 text-[18px]', 'text-slate-500 text-[18px]')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
