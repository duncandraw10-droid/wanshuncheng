import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_banner = r'<!-- Call to action Banner -->.*?</div>\s*</section>'

new_banner = """<!-- Call to action Banner -->
      <div class="mt-12 lg:mt-16 bg-[#0B1C2E] rounded-md overflow-hidden relative shadow-lg">
        <div class="absolute inset-0 z-0">
          <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>
        
        <div class="relative z-10 p-6 md:p-8 lg:p-10 flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-8">
          <div class="flex-grow">
            <h3 class="font-bold text-[18px] lg:text-[22px] text-white mb-2">需要製程或機台適配評估？</h3>
            <p class="text-[14px] lg:text-[15px] text-slate-300 leading-relaxed">
              請備妥產品圖面或現有模具尺寸，我們將為您建議最合適的成型設備與排程。
            </p>
          </div>
          <a href="#contact" class="shrink-0 min-h-[44px] w-full md:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-md font-bold text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1C2E]">
            <span class="material-symbols-outlined text-[20px]" aria-hidden="true">mail</span>
            與我們聯繫
          </a>
        </div>
      </div>
    </div>
  </section>"""

html = re.sub(old_banner, new_banner, html, flags=re.DOTALL)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
