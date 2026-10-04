import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_slider_controls = r'<div class="relative group reveal">\s*<!-- Desktop Slider Controls -->\s*<button id="slider-prev".*?</button>\s*<button id="slider-next".*?</button>'

new_slider_controls = """<div class="relative group reveal">
        <!-- Desktop Slider Controls -->
        <button id="slider-prev" class="hidden md:flex absolute -left-6 lg:-left-8 top-[calc(50%-24px)] -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full items-center justify-center text-slate-600 hover:text-primary shadow-md z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-opacity opacity-100 lg:opacity-0 lg:group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed" aria-label="上一頁">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <button id="slider-next" class="hidden md:flex absolute -right-6 lg:-right-8 top-[calc(50%-24px)] -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full items-center justify-center text-slate-600 hover:text-primary shadow-md z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-opacity opacity-100 lg:opacity-0 lg:group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed" aria-label="下一頁">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>"""

html = re.sub(old_slider_controls, new_slider_controls, html, flags=re.DOTALL)

# Add progress bar below slider
old_slider_end = r'(</div>\s*</div>\s*</div>\s*</section>)'
new_slider_end = """</div>
        <!-- Progress Bar (Desktop & Tablet) -->
        <div class="hidden md:flex justify-center mt-6">
          <div class="w-48 h-1 bg-slate-200 rounded-full overflow-hidden relative">
            <div id="slider-progress" class="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-300 w-1/3"></div>
          </div>
        </div>
        <!-- Swipe Hint (Mobile) -->
        <div class="md:hidden flex items-center justify-center gap-2 mt-4 text-slate-400 text-[13px]">
          <span class="material-symbols-outlined text-[16px] animate-pulse">swipe</span>
          <span>向左右滑動查看更多</span>
        </div>
      </div>
    </div>
</section>"""
html = re.sub(old_slider_end, new_slider_end, html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
