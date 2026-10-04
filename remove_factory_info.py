import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Pattern to match the entire "廠區資訊" div block
pattern = r'<div class="bg-slate-800/50 rounded-md p-6 lg:p-8 border border-slate-700/50 inline-block w-full max-w-md">\s*<div class="flex items-center gap-2 mb-6">\s*<span class="material-symbols-outlined text-\[\#3B82F6\] text-\[22px\]" aria-hidden="true">factory</span>\s*<span class="font-bold text-\[16px\] text-white">廠區資訊</span>.*?</div>\s*</div>\s*</div>\s*</div>'

html = re.sub(pattern, '', html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
