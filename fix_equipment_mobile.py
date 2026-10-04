import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# For the 3 equipment cards
html = html.replace(
    'class="bg-slate-100 w-full aspect-[4/3] md:aspect-square lg:aspect-[3/4] p-4 flex items-center justify-center border-b border-slate-200"',
    'class="bg-slate-100 w-full aspect-[4/3] md:aspect-square lg:aspect-[3/4] p-0 md:p-4 flex items-center justify-center border-b border-slate-200"'
)

html = html.replace(
    'alt="250T 模壓成型機" loading="lazy" width="800" height="1066" class="w-full h-full object-contain"',
    'alt="250T 模壓成型機" loading="lazy" width="800" height="1066" class="w-full h-full object-cover md:object-contain"'
)

html = html.replace(
    'alt="400T 模壓成型機" loading="lazy" width="800" height="1066" class="w-full h-full object-contain"',
    'alt="400T 模壓成型機" loading="lazy" width="800" height="1066" class="w-full h-full object-cover md:object-contain"'
)

html = html.replace(
    'alt="500T 大型模壓成型機" loading="lazy" width="800" height="1066" class="w-full h-full object-contain"',
    'alt="500T 大型模壓成型機" loading="lazy" width="800" height="1066" class="w-full h-full object-cover md:object-contain"'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
