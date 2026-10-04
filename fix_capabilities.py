import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

cap_regex = r'<!-- Capabilities Section -->.*?<!-- Equipment Section -->'
new_cap = """<!-- Capabilities Section -->
  <section id="capabilities" class="py-16 lg:py-24 bg-slate-50 scroll-margin-top-24">
    <div class="max-w-7xl mx-auto px-5 md:px-10">
      
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        <!-- Left: Image -->
        <div class="w-full lg:w-1/2 reveal">
          <div class="relative aspect-[4/3] w-full bg-slate-200">
            <img src="./images/factory-interior-1.jpg" alt="萬順承廠內作業環境" loading="lazy" class="w-full h-full object-cover" />
            <!-- Decorative cut -->
            <div class="hidden lg:block absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 -z-10"></div>
          </div>
        </div>

        <!-- Right: Text Content -->
        <div class="w-full lg:w-1/2 flex flex-col justify-center reveal">
          <h2 class="text-2xl lg:text-[32px] font-bold text-dark-bg tracking-tight">製造能力</h2>
          <div class="w-10 h-1 bg-primary mt-4 mb-8"></div>
          
          <div class="flex flex-col gap-8">
            <div class="flex gap-4 items-start">
              <span class="material-symbols-outlined text-primary text-[28px] shrink-0 mt-1" aria-hidden="true">engineering</span>
              <div>
                <h3 class="text-[18px] font-bold text-dark-bg mb-2">圖面適配與模具移轉</h3>
                <p class="text-[15px] text-slate-600 leading-relaxed">
                  提供現有模具移轉至廠內生產的完整銜接服務，並可針對現有圖面進行 SMC／BMC 製程適配性評估。
                </p>
              </div>
            </div>

            <div class="flex gap-4 items-start">
              <span class="material-symbols-outlined text-primary text-[28px] shrink-0 mt-1" aria-hidden="true">precision_manufacturing</span>
              <div>
                <h3 class="text-[18px] font-bold text-dark-bg mb-2">模壓試作與穩定量產</h3>
                <p class="text-[15px] text-slate-600 leading-relaxed">
                  從前端打樣試作到最終批量生產，廠內配備完整熱壓成型設備，確保各階段品質穩定一致。
                </p>
              </div>
            </div>

            <div class="flex gap-4 items-start">
              <span class="material-symbols-outlined text-primary text-[28px] shrink-0 mt-1" aria-hidden="true">handyman</span>
              <div>
                <h3 class="text-[18px] font-bold text-dark-bg mb-2">廠內修邊與後加工</h3>
                <p class="text-[15px] text-slate-600 leading-relaxed">
                  提供成型後的去毛邊、鑽孔、攻牙等基本修整加工服務，簡化客戶後端作業流程。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- Equipment Section -->"""
html = re.sub(cap_regex, new_cap, html, flags=re.DOTALL)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
