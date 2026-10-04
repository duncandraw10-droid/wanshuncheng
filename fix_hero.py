import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

hero_regex = r'<!-- Hero Section -->.*?<!-- Applications Section -->'

new_hero = """<!-- Hero Section -->
  <section class="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden flex flex-col justify-center">
    <div class="absolute inset-0 z-0 overflow-hidden bg-[#051426]">
      <img src="./images/factory-hero.jpg" alt="萬順承廠房實景" fetchpriority="high" width="1920" height="1080" class="w-full h-full object-cover object-[75%_center] md:object-center opacity-100" />
      
      <!-- Mobile Gradient overlay: ensures text readability across full width while hinting at background -->
      <div class="absolute inset-0 z-10 pointer-events-none md:hidden" style="background: linear-gradient(90deg, rgba(5, 20, 38, 0.95) 0%, rgba(5, 20, 38, 0.85) 60%, rgba(5, 20, 38, 0.6) 100%);"></div>
      
      <!-- Desktop Gradient overlay: fades to transparent on the right to show factory equipment clearly -->
      <div class="absolute inset-0 z-10 pointer-events-none hidden md:block" style="background: linear-gradient(90deg, rgba(5, 20, 38, 0.95) 0%, rgba(5, 20, 38, 0.8) 45%, rgba(5, 20, 38, 0.2) 75%, rgba(5, 20, 38, 0) 100%);"></div>
    </div>
    
    <div class="relative z-20 max-w-7xl mx-auto px-5 md:px-10 w-full flex-grow flex flex-col justify-center mt-2 md:mt-0">
      <div class="max-w-[480px] md:max-w-xl lg:max-w-2xl">
        <h1 class="hero-animate text-[32px] leading-[1.25] md:text-[44px] lg:text-[52px] font-bold text-white tracking-tight mb-5 md:mb-6">
          SMC／BMC 模壓成型代工
        </h1>
        <p class="hero-animate hero-delay-1 text-[16px] md:text-[18px] lg:text-[20px] text-[rgba(255,255,255,0.85)] mb-8 md:mb-10 leading-relaxed font-medium">
          位於桃園楊梅，專注提供 SMC／BMC 模壓成型、現有模具移轉與穩定量產等專業製造服務。
        </p>
        
        <div class="hero-animate hero-delay-2 flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 md:mb-12">
          <a href="#contact" class="min-h-[48px] inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white sm:px-8 rounded-md font-bold text-[16px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm group">
            洽詢製程評估
            <span class="material-symbols-outlined text-[20px] transition-transform duration-150 group-hover:translate-x-[2px]" aria-hidden="true">arrow_forward</span>
          </a>
          <a href="#equipment" class="min-h-[48px] inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white border border-white/30 sm:px-8 rounded-md font-medium text-[16px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            查看設備能力
          </a>
        </div>
      </div>
    </div>

    <!-- Capabilities Summary -->
    <div class="hero-animate hero-delay-3 relative z-20 max-w-7xl mx-auto px-5 md:px-10 w-full mt-auto pt-6 md:pt-8 border-t border-white/15">
      <div class="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-4 max-w-2xl">
        <div class="flex flex-col gap-1">
          <div class="text-[15px] md:text-lg font-bold text-white leading-tight">模壓成型代工</div>
          <div class="text-[13px] md:text-[14px] text-slate-300 leading-tight">模具移轉、試作與量產</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-[15px] md:text-lg font-bold text-white tabular-nums leading-tight">250T／400T／500T</div>
          <div class="text-[13px] md:text-[14px] text-slate-300 leading-tight">廠內熱固性壓機設備</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Applications Section -->"""

html = re.sub(hero_regex, new_hero, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
