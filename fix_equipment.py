import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

equip_regex = r'<!-- Equipment Section -->.*?<!-- Workflow Section -->'
new_equip = """<!-- Equipment Section -->
  <section id="equipment" class="py-16 lg:py-24 bg-white scroll-margin-top-24">
    <div class="max-w-7xl mx-auto px-5 md:px-10">
      <div class="mb-10 reveal">
        <h2 class="text-2xl lg:text-[32px] font-bold text-dark-bg tracking-tight">廠內設備</h2>
        <div class="w-10 h-1 bg-primary mt-4"></div>
      </div>

      <div class="flex flex-col lg:flex-row gap-6 lg:gap-10 reveal">
        <!-- Main Image -->
        <div class="w-full lg:w-[65%]">
          <div class="aspect-[4/3] lg:aspect-[16/10] bg-slate-100 overflow-hidden relative">
            <img id="equip-main-img" src="./images/equip-250t.jpg" alt="250T 熱壓成型機" loading="lazy" class="w-full h-full object-cover transition-opacity duration-300" />
          </div>
        </div>

        <!-- Equipment List / Tabs -->
        <div class="w-full lg:w-[35%] flex flex-col gap-3">
          <!-- Item 1 -->
          <button class="equip-tab active text-left p-5 border border-primary bg-primary/5 rounded flex flex-col gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-img="./images/equip-250t.jpg" data-alt="250T 熱固性壓機">
            <h3 class="font-bold text-[18px] text-primary">250T 熱固性壓機</h3>
            <p class="text-[14px] text-slate-600 leading-relaxed">提供中小尺寸部件的模壓成型，穩定性佳。</p>
          </button>
          <!-- Item 2 -->
          <button class="equip-tab text-left p-5 border border-slate-200 bg-white hover:border-primary/50 rounded flex flex-col gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-img="./images/equip-400t.jpg" data-alt="400T 熱固性壓機">
            <h3 class="font-bold text-[18px] text-dark-bg group-hover:text-primary">400T 熱固性壓機</h3>
            <p class="text-[14px] text-slate-600 leading-relaxed">適合中大型 SMC／BMC 產品，具備優異的壓力控制。</p>
          </button>
          <!-- Item 3 -->
          <button class="equip-tab text-left p-5 border border-slate-200 bg-white hover:border-primary/50 rounded flex flex-col gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-img="./images/equip-500t.jpg" data-alt="500T 熱固性壓機">
            <h3 class="font-bold text-[18px] text-dark-bg group-hover:text-primary">500T 熱固性壓機</h3>
            <p class="text-[14px] text-slate-600 leading-relaxed">廠內最大噸數設備，滿足大面積或高深度的特殊成型需求。</p>
          </button>
        </div>
      </div>

      <!-- Aux Equipment -->
      <div class="mt-12 lg:mt-16 pt-8 border-t border-slate-200 reveal">
        <h3 class="text-[18px] font-bold text-dark-bg mb-6">輔助設備</h3>
        <div class="flex items-center gap-5 p-5 bg-slate-50 border border-slate-100 rounded">
          <div class="w-20 h-20 bg-white shrink-0 hidden sm:block">
            <img src="./images/equip-shini-stm.jpg" alt="模具溫度控制系統" loading="lazy" class="w-full h-full object-contain" />
          </div>
          <div>
            <h4 class="font-bold text-[16px] text-dark-bg mb-1">模具溫度控制系統</h4>
            <p class="text-[14px] text-slate-600">配備 SHINI 模溫機，精準控制模具溫度，確保熱固性材料交聯反應完全與品質穩定。</p>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- Workflow Section -->"""
html = re.sub(equip_regex, new_equip, html, flags=re.DOTALL)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
