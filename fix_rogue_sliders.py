import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# The block to remove:
rogue_block = r'</div>\s*<!-- Progress Bar \(Desktop & Tablet\) -->\s*<div class="hidden md:flex justify-center mt-6">\s*<div class="w-48 h-1 bg-slate-200 rounded-full overflow-hidden relative">\s*<div id="slider-progress" class="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-300 w-1/3"></div>\s*</div>\s*</div>\s*<!-- Swipe Hint \(Mobile\) -->\s*<div class="md:hidden flex items-center justify-center gap-2 mt-4 text-slate-400 text-\[13px\]">\s*<span class="material-symbols-outlined text-\[16px\] animate-pulse">swipe</span>\s*<span>向左右滑動查看更多</span>\s*</div>\s*</div>\s*</div>\s*</section>'

# Replace it with just the closing tags
correct_ending = r'</div>\s*</div>\s*</div>\s*</section>'

# Replace ALL occurrences first
html = re.sub(rogue_block, '</div>\n    </div>\n  </section>', html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
