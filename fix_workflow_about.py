import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

workflow_regex = r'<!-- Workflow Section -->.*?<!-- Contact Section -->'
new_workflow = """<!-- Workflow Section -->
  <section id="workflow" class="py-16 lg:py-24 bg-slate-50 scroll-margin-top-24">
    <div class="max-w-7xl mx-auto px-5 md:px-10">
      <div class="mb-12 reveal">
        <h2 class="text-2xl lg:text-[32px] font-bold text-dark-bg tracking-tight">合作流程</h2>
        <div class="w-10 h-1 bg-primary mt-4"></div>
      </div>

      <div class="relative reveal">
        <!-- Desktop Horizontal Line -->
        <div class="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[1px] bg-slate-200 z-0"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          
          <div class="flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-6">
            <div class="w-14 h-14 rounded-full bg-white border border-primary text-primary font-bold text-[20px] flex items-center justify-center shrink-0 z-10 shadow-sm">1</div>
            <div class="text-left md:text-center">
              <h3 class="font-bold text-[16px] text-dark-bg mb-2">需求洽詢與圖面評估</h3>
              <p class="text-[14px] text-slate-600 leading-relaxed">提供產品圖面、規格與數量需求，由我們評估成型可行性。</p>
            </div>
          </div>

          <div class="flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-6">
            <div class="w-14 h-14 rounded-full bg-white border border-primary text-primary font-bold text-[20px] flex items-center justify-center shrink-0 z-10 shadow-sm">2</div>
            <div class="text-left md:text-center">
              <h3 class="font-bold text-[16px] text-dark-bg mb-2">製程規劃與報價</h3>
              <p class="text-[14px] text-slate-600 leading-relaxed">確立成型方式與模具移轉細節，提供正式的代工報價單。</p>
            </div>
          </div>

          <div class="flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-6">
            <div class="w-14 h-14 rounded-full bg-white border border-primary text-primary font-bold text-[20px] flex items-center justify-center shrink-0 z-10 shadow-sm">3</div>
            <div class="text-left md:text-center">
              <h3 class="font-bold text-[16px] text-dark-bg mb-2">模具測試與打樣</h3>
              <p class="text-[14px] text-slate-600 leading-relaxed">模具進廠後進行上機測試，並提供首件樣品供客戶確認。</p>
            </div>
          </div>

          <div class="flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-6">
            <div class="w-14 h-14 rounded-full bg-white border border-primary text-primary font-bold text-[20px] flex items-center justify-center shrink-0 z-10 shadow-sm">4</div>
            <div class="text-left md:text-center">
              <h3 class="font-bold text-[16px] text-dark-bg mb-2">批量生產與交付</h3>
              <p class="text-[14px] text-slate-600 leading-relaxed">樣品確認無誤後進入穩定量產，並依約定時程進行修邊與交付。</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="py-16 lg:py-24 bg-white scroll-margin-top-24">
    <div class="max-w-7xl mx-auto px-5 md:px-10">
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        <!-- Text -->
        <div class="w-full lg:w-1/2 reveal">
          <h2 class="text-2xl lg:text-[32px] font-bold text-dark-bg tracking-tight">關於萬順承</h2>
          <div class="w-10 h-1 bg-primary mt-4 mb-6"></div>
          <p class="text-[16px] text-slate-600 leading-relaxed mb-8">
            萬順承實業有限公司具備 35 年的 SMC／BMC 現場製程經驗。廠區位於桃園楊梅，致力於為各產業客戶提供專業、穩定的熱固性複合材料模壓成型代工服務。我們重視製程中的每一處細節，從溫控到壓制，確保產品品質符合工業應用需求。
          </p>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
              <span class="material-symbols-outlined text-primary" aria-hidden="true">factory</span>
            </div>
            <div>
              <div class="text-[14px] text-slate-500">生產基地</div>
              <div class="font-bold text-dark-bg text-[15px]">桃園市楊梅區</div>
            </div>
          </div>
        </div>
        <!-- Image -->
        <div class="w-full lg:w-1/2 reveal">
          <div class="aspect-[4/3] bg-slate-100 relative">
            <img src="./images/factory-interior-2.jpg" alt="萬順承廠區實景" loading="lazy" class="w-full h-full object-cover" />
            <!-- Decorative accent -->
            <div class="hidden lg:block absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->"""
html = re.sub(workflow_regex, new_workflow, html, flags=re.DOTALL)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
