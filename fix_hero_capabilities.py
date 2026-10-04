import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Pattern to find the capabilities summary
pattern = r'<!-- Capabilities Summary -->.*?</div>\s*</div>\s*</section>'

new_capabilities = """<!-- Capabilities Summary -->
    <div class="hero-animate hero-delay-3 relative z-20 max-w-7xl mx-auto px-5 md:px-10 w-full mt-auto pt-6 md:pt-8 border-t border-white/15">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-5 max-w-3xl">
        <div class="flex flex-col gap-1">
          <div class="text-[15px] md:text-lg font-bold text-white leading-tight">35 年</div>
          <div class="text-[13px] md:text-[14px] text-slate-300 leading-tight">產業實務經驗</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-[15px] md:text-lg font-bold text-white leading-tight">模壓成型代工</div>
          <div class="text-[13px] md:text-[14px] text-slate-300 leading-tight">模具移轉、試作與量產</div>
        </div>
        <div class="flex flex-col gap-1 col-span-2 md:col-span-1">
          <div class="text-[15px] md:text-lg font-bold text-white tabular-nums leading-tight">250T／400T／500T</div>
          <div class="text-[13px] md:text-[14px] text-slate-300 leading-tight">廠內熱固性壓機設備</div>
        </div>
      </div>
    </div>
  </section>"""

html = re.sub(pattern, new_capabilities, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
