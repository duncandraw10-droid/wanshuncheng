import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Update slider padding for mobile
html = html.replace(
    'class="flex items-stretch overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-6 pt-2 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0"',
    'class="flex items-stretch overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-6 pt-2 scrollbar-hide -mx-5 px-[7.5vw] sm:mx-0 sm:px-0"'
)

# Update snap-start to snap-center sm:snap-start for cards
html = re.sub(
    r'shrink-0 snap-start bg-white rounded-md',
    r'shrink-0 snap-center sm:snap-start bg-white rounded-md',
    html
)

# Update arrows to be slightly bigger and nicer
html = html.replace(
    'w-10 h-10 bg-white border border-slate-200 rounded-full',
    'w-12 h-12 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
