import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_info = r'<div class="flex items-start md:items-center gap-2 text-\[13px\] text-slate-500 mb-10">'
new_info = """<!-- Swipe Hint (Mobile) -->
      <div class="md:hidden flex items-center justify-center gap-2 mt-4 mb-6 text-slate-400 text-[13px]">
        <span class="material-symbols-outlined text-[16px] animate-pulse">swipe</span>
        <span>向左右滑動查看更多機型</span>
      </div>

      <div class="flex items-start md:items-center gap-2 text-[13px] text-slate-500 mb-10">"""

html = re.sub(old_info, new_info, html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
