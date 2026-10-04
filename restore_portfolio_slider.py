import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find the end of portfolio section
# The portfolio section has <section id="applications" ...>
portfolio_regex = r'(<section id="applications".*?)(</div>\s*</div>\s*</section>)'

portfolio_end = """</div>
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

html = re.sub(portfolio_regex, r'\1' + portfolio_end, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
