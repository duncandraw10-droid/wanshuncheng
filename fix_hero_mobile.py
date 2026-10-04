import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

hero_regex = r'<!-- Hero Section -->.*?<!-- Applications Section -->'

new_hero = """<!-- Hero Section -->
  <section class="relative bg-[#051426] flex flex-col pt-[72px] md:pt-36 md:pb-16 overflow-hidden md:justify-center">
    
    <!-- Hero Image Container (Mobile: Static block 4:3, Desktop: Absolute background) -->
    <div class="relative w-full aspect-[4/3] md:absolute md:inset-0 md:aspect-auto md:h-full z-0 shrink-0">
      <img src="./images/factory-hero.jpg" alt="萬順承廠房實景" fetchpriority="high" width="1920" height="1080" class="w-full h-full object-cover object-[75%_center] md:object-center opacity-100" />
      
      <!-- Desktop Gradient overlay: fades to transparent on the right to show factory equipment clearly -->
      <div class="absolute inset-0 z-10 pointer-events-none hidden md:block" style="background: linear-gradient(90deg, rgba(5, 20, 38, 0.95) 0%, rgba(5, 20, 38, 0.8) 45%, rgba(5, 20, 38, 0.2) 75%, rgba(5, 20, 38, 0) 100%);"></div>
    </div>
    
    <!-- Hero Content Container -->
    <div class="relative z-20 max-w-7xl mx-auto px-5 md:px-10 w-full flex-grow flex flex-col justify-center py-10 md:py-0">
      <div class="max-w-[480px] md:max-w-xl lg:max-w-2xl">
        <h1 class="hero-animate text-[28px] sm:text-[32px] leading-[1.3] md:text-[44px] lg:text-[52px] font-bold text-white tracking-tight mb-4 md:mb-6">
          SMC／BMC<br class="md:hidden"><span class="hidden md:inline"> </span>模壓成型代工
        </h1>
        <p class="hero-animate hero-delay-1 text-[15px] md:text-[18px] lg:text-[20px] text-[rgba(255,255,255,0.85)] mb-8 md:mb-10 leading-[1.6] md:leading-relaxed font-medium">
          位於桃園楊梅，專注提供 SMC／BMC 模壓成型、現有模具移轉與穩定量產等專業製造服務。
        </p>
        
        <div class="hero-animate hero-delay-2 flex flex-col md:flex-row gap-5 md:gap-4 mb-8 md:mb-12 items-start md:items-stretch">
          <a href="#contact" class="min-h-[48px] w-full md:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white md:px-8 rounded-md font-bold text-[16px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm group">
            洽詢製程評估
            <span class="material-symbols-outlined text-[20px] transition-transform duration-150 group-hover:translate-x-[2px]" aria-hidden="true">arrow_forward</span>
          </a>
          <!-- Desktop Secondary Button -->
          <a href="#equipment" class="hidden md:inline-flex min-h-[48px] items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 rounded-md font-medium text-[16px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            查看設備能力
          </a>
          <!-- Mobile Secondary Text Link -->
          <a href="#equipment" class="md:hidden inline-flex items-center gap-1.5 text-[15px] text-slate-300 hover:text-white underline underline-offset-4 decoration-slate-500 hover:decoration-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-1 -ml-1">
            查看設備能力
            <span class="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_downward</span>
          </a>
        </div>
      </div>
      
      <!-- Capabilities Summary -->
      <div class="hero-animate hero-delay-3 w-full mt-auto pt-6 md:pt-8 border-t border-white/15">
        <div class="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 max-w-2xl">
          <div class="flex flex-col gap-1">
            <div class="text-[15px] md:text-lg font-bold text-white leading-tight">35 年</div>
            <div class="text-[13px] md:text-[14px] text-slate-300 leading-tight">產業實務經驗</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[15px] md:text-lg font-bold text-white tabular-nums leading-tight">250T／400T／500T</div>
            <div class="text-[13px] md:text-[14px] text-slate-300 leading-tight">廠內熱固性壓機設備</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Applications Section -->"""

html = re.sub(hero_regex, new_hero, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
