import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

apps_regex = r'<!-- Applications Section -->.*?<!-- Capabilities Section -->'
new_apps = """<!-- Applications Section -->
  <section id="applications" class="py-16 lg:py-24 bg-white scroll-margin-top-24">
    <div class="max-w-7xl mx-auto px-5 md:px-10">
      <div class="mb-10 reveal flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 class="text-2xl lg:text-[32px] font-bold text-dark-bg tracking-tight">承製案例</h2>
          <div class="w-10 h-1 bg-primary mt-4"></div>
          <p class="max-w-[600px] text-[16px] text-slate-600 mt-5 leading-relaxed">
            以下皆為實際承製品項，我們專注於工業部件與特殊結構的模壓成型，更多案例歡迎洽詢。
          </p>
        </div>
        
        <!-- Desktop Slider Controls -->
        <div class="hidden md:flex gap-3">
          <button id="slider-prev" class="w-12 h-12 bg-surface hover:bg-slate-200 text-dark-bg rounded flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-30 disabled:cursor-not-allowed" aria-label="上一頁">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <button id="slider-next" class="w-12 h-12 bg-surface hover:bg-slate-200 text-dark-bg rounded flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-30 disabled:cursor-not-allowed" aria-label="下一頁">
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      <div class="relative reveal">
        <!-- Slider Container -->
        <div id="portfolio-slider" class="flex items-stretch overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-8 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0">
          
          <!-- Item 1 -->
          <div class="w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-center sm:snap-start group cursor-pointer">
            <div class="aspect-[4/3] bg-surface overflow-hidden relative mb-4">
              <img src="./images/portfolio-box.jpg" alt="玻璃纖維強化複合防護箱" loading="lazy" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
            </div>
            <div class="pr-4">
              <h3 class="font-bold text-[18px] text-dark-bg mb-2">玻璃纖維強化複合防護箱</h3>
              <p class="text-[15px] text-slate-600 line-clamp-2">SMC 模壓成型、修邊加工，應用於工業箱體與設備外殼。</p>
            </div>
          </div>

          <!-- Item 2 -->
          <div class="w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-center sm:snap-start group cursor-pointer">
            <div class="aspect-[4/3] bg-surface overflow-hidden relative mb-4">
              <img src="./images/portfolio-chair.jpg" alt="SMC 模壓公共座椅" loading="lazy" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
            </div>
            <div class="pr-4">
              <h3 class="font-bold text-[18px] text-dark-bg mb-2">SMC 模壓公共座椅</h3>
              <p class="text-[15px] text-slate-600 line-clamp-2">SMC 模壓成型，應用於戶外家具與公共設施，具備高耐候性。</p>
            </div>
          </div>

          <!-- Item 3 -->
          <div class="w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-center sm:snap-start group cursor-pointer">
            <div class="aspect-[4/3] bg-surface overflow-hidden relative mb-4">
              <img src="./images/portfolio-panel.jpg" alt="建築用裝飾壁板" loading="lazy" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
            </div>
            <div class="pr-4">
              <h3 class="font-bold text-[18px] text-dark-bg mb-2">建築用裝飾壁板</h3>
              <p class="text-[15px] text-slate-600 line-clamp-2">SMC 模壓成型，應用於建材與裝潢，提供極佳的結構強度。</p>
            </div>
          </div>

          <!-- Item 4 -->
          <div class="w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-center sm:snap-start group cursor-pointer">
            <div class="aspect-[4/3] bg-surface overflow-hidden relative mb-4">
              <img src="./images/portfolio-glare.jpg" alt="公路防眩板" loading="lazy" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
            </div>
            <div class="pr-4">
              <h3 class="font-bold text-[18px] text-dark-bg mb-2">公路防眩板</h3>
              <p class="text-[15px] text-slate-600 line-clamp-2">SMC 模壓成型，應用於交通與公路安全設施。</p>
            </div>
          </div>

          <!-- Item 5 -->
          <div class="w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-center sm:snap-start group cursor-pointer">
            <div class="aspect-[4/3] bg-surface overflow-hidden relative mb-4">
              <img src="./images/portfolio-base.jpg" alt="機電設備基座" loading="lazy" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
            </div>
            <div class="pr-4">
              <h3 class="font-bold text-[18px] text-dark-bg mb-2">機電設備基座</h3>
              <p class="text-[15px] text-slate-600 line-clamp-2">BMC 模壓成型，具備優異的絕緣與耐高溫特性。</p>
            </div>
          </div>

          <!-- Item 6 -->
          <div class="w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-center sm:snap-start group cursor-pointer">
            <div class="aspect-[4/3] bg-surface overflow-hidden relative mb-4">
              <img src="./images/portfolio-train.jpg" alt="軌道車輛絕緣件" loading="lazy" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
            </div>
            <div class="pr-4">
              <h3 class="font-bold text-[18px] text-dark-bg mb-2">軌道車輛絕緣件</h3>
              <p class="text-[15px] text-slate-600 line-clamp-2">BMC 模壓成型，專為軌道交通設計的特種絕緣部件。</p>
            </div>
          </div>

        </div>
        
        <!-- Slider Progress Bar -->
        <div class="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-2 md:mt-4">
          <div id="slider-progress" class="h-full bg-primary w-[16.666%] transition-all duration-300"></div>
        </div>
        
      </div>
    </div>
  </section>

  <!-- Capabilities Section -->"""
html = re.sub(apps_regex, new_apps, html, flags=re.DOTALL)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
