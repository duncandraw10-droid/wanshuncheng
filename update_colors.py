import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Header
html = re.sub(r'from-\[\#08192B\]/95 to-\[\#0B1C2E\]/95', r'from-dark-bg/95 to-[#0F1C2E]/95', html)

# Hero bg
html = re.sub(r'bg-\[\#051426\]', r'bg-dark-bg', html)

# Footer bg
html = re.sub(r'bg-\[\#0B1C2E\]', r'bg-dark-bg', html)

# Buttons using #0B1C2E text
html = re.sub(r'text-\[\#0B1C2E\]', r'text-dark-bg', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
