import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# -----------------
# 1. HEADER
# -----------------
# Update bg color from `#0B1C2E` gradient to `dark-bg`
html = re.sub(
    r'bg-gradient-to-r from-\[\#08192B\]/95 to-\[\#0B1C2E\]/95',
    r'bg-dark-bg/95',
    html
)
# Update text colors in mobile menu
html = re.sub(
    r'bg-\[\#0B1C2E\]',
    r'bg-dark-bg',
    html
)

# -----------------
# 2. HERO SECTION
# -----------------
hero_regex = r'<!-- Hero Section -->.*?<!-- Applications Section -->'
new_hero = """<!-- Hero Section -->
  <section id="hero" class="relative bg-slate-50 flex flex-col md:flex-row md:min-h-[75vh] overflow-hidden pt-[72px] md:pt-0">
    
    <!-- Mobile Image (Top, approx 3:2) -->
    <div class="relative w-full aspect-[3/2] z-0 md:hidden shrink-0">
      <img src="./images/factory-hero.jpg" alt="萬順承廠房實景" fetchpriority="high" class="w-full h-full object-cover object-[75%_center]" />
    </div>
    
    <!-- Desktop Image Background -->
    <div class="hidden md:block absolute inset-0 z-0 bg-slate-100">
      <img src="./images/factory-hero.jpg" alt="萬順承廠房實景" fetchpriority="high" class="w-full h-full object-cover object-[80%_center]" />
    </div>

    <!-- Geometric Dark Navy Block (Desktop) / Background (Mobile) -->
    <div class="relative w-full bg-dark-bg z-10 md:absolute md:left-0 md:top-0 md:h-full md:w-[60%] lg:w-[55%] md:slant-cut hero-geo-animate shrink-0">
      <!-- Thin blue decorative line on the cut edge -->
      <div class="hidden md:block absolute top-0 right-0 h-full w-[6px] bg-primary"></div>
    </div>

    <!-- Content Container -->
    <div class="relative z-20 w-full md:w-[50%] lg:w-[45%] flex flex-col justify-center px-6 py-12 md:px-10 lg:pl-16 lg:pr-8 text-white md:h-full">
      <div class="max-w-[480px]">
        <h1 class="hero-animate text-[32px] leading-[1.25] md:text-[44px] lg:text-[52px] font-bold tracking-tight mb-5">
          SMC／BMC<br class="md:hidden"> 模壓成型代工
        </h1>
        <p class="hero-animate hero-delay-1 text-[16px] md:text-[18px] lg:text-[20px] text-slate-300 mb-10 leading-[1.7] font-medium">
          位於桃園楊梅，專注提供 SMC／BMC 模壓成型、現有模具移轉與穩定量產等專業製造服務。
        </p>
        
        <div class="hero-animate hero-delay-2 flex flex-col md:flex-row gap-4 items-start">
          <a href="#contact" class="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 h-[52px] rounded font-bold text-[16px] transition-colors shadow-sm group">
            洽詢製程評估
            <span class="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1" aria-hidden="true">arrow_forward</span>
          </a>
          <a href="#equipment" class="w-full md:w-auto inline-flex items-center justify-center gap-1.5 text-slate-200 hover:text-white transition-colors h-[52px] font-bold text-[16px] underline underline-offset-4 decoration-slate-600 hover:decoration-white">
            查看設備能力
            <span class="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_downward</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Applications Section -->"""
html = re.sub(hero_regex, new_hero, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
