import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_workflow = r'<section id="workflow".*?</section>'
new_workflow = """  <section id="workflow" class="py-12 lg:py-20 bg-white border-t border-slate-200 scroll-margin-top-24">
    <div class="max-w-7xl mx-auto px-5 md:px-10">
      <div class="mb-12 lg:mb-16 reveal">
        <h2 class="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">合作流程</h2>
        <div class="w-8 h-1 bg-primary mt-3 rounded-md"></div>
        <p class="max-w-[720px] text-[15px] lg:text-[16px] text-slate-600 mt-4 leading-relaxed">
          每個專案均由需求確認開始，逐步完成評估、試作、生產、檢驗與交付。
        </p>
      </div>
      
      <div class="relative">
        <!-- Desktop Horizontal Line -->
        <div class="hidden xl:block absolute top-[20px] left-5 right-5 h-[2px] bg-slate-200 z-0"></div>
        <!-- Mobile/Tablet Vertical Line -->
        <div class="xl:hidden absolute top-5 bottom-5 left-[19px] w-[2px] bg-slate-200 z-0"></div>

        <div class="grid grid-cols-1 xl:grid-cols-6 gap-y-8 gap-x-4 relative z-10">
          
          <div class="reveal delay-0 flex xl:flex-col items-start gap-5">
            <div class="w-10 h-10 bg-primary text-white rounded-full flex shrink-0 items-center justify-center font-bold font-mono text-[15px] z-10 ring-4 ring-white">1</div>
            <div>
              <h3 class="font-bold text-[16px] text-slate-900 mb-1 xl:mb-2">需求確認</h3>
              <p class="text-[15px] xl:text-[14px] text-slate-600 leading-relaxed xl:pr-2">確認產品圖面、材質、數量與交期規範。</p>
            </div>
          </div>
          
          <div class="reveal delay-60 flex xl:flex-col items-start gap-5">
            <div class="w-10 h-10 bg-white text-primary rounded-full flex shrink-0 items-center justify-center font-bold font-mono text-[15px] border-2 border-slate-300 z-10 ring-4 ring-white">2</div>
            <div>
              <h3 class="font-bold text-[16px] text-slate-900 mb-1 xl:mb-2">圖面／模具評估</h3>
              <p class="text-[15px] xl:text-[14px] text-slate-600 leading-relaxed xl:pr-2">評估工程圖面可行性或機台適配性。</p>
            </div>
          </div>

          <div class="reveal delay-120 flex xl:flex-col items-start gap-5">
            <div class="w-10 h-10 bg-white text-primary rounded-full flex shrink-0 items-center justify-center font-bold font-mono text-[15px] border-2 border-slate-300 z-10 ring-4 ring-white">3</div>
            <div>
              <h3 class="font-bold text-[16px] text-slate-900 mb-1 xl:mb-2">試作與確認</h3>
              <p class="text-[15px] xl:text-[14px] text-slate-600 leading-relaxed xl:pr-2">打樣試模，確認成型參數與產品品質。</p>
            </div>
          </div>

          <div class="reveal delay-180 flex xl:flex-col items-start gap-5">
            <div class="w-10 h-10 bg-white text-primary rounded-full flex shrink-0 items-center justify-center font-bold font-mono text-[15px] border-2 border-slate-300 z-10 ring-4 ring-white">4</div>
            <div>
              <h3 class="font-bold text-[16px] text-slate-900 mb-1 xl:mb-2">生產與後加工</h3>
              <p class="text-[15px] xl:text-[14px] text-slate-600 leading-relaxed xl:pr-2">依照確認製程參數進行量產，並於廠內執行修邊、去毛邊等後道工序。</p>
            </div>
          </div>

          <div class="reveal delay-180 flex xl:flex-col items-start gap-5">
            <div class="w-10 h-10 bg-white text-primary rounded-full flex shrink-0 items-center justify-center font-bold font-mono text-[15px] border-2 border-slate-300 z-10 ring-4 ring-white">5</div>
            <div>
              <h3 class="font-bold text-[16px] text-slate-900 mb-1 xl:mb-2">品質檢查</h3>
              <p class="text-[15px] xl:text-[14px] text-slate-600 leading-relaxed xl:pr-2">依公司品質作業規範進行產品外觀與尺寸檢驗。</p>
            </div>
          </div>

          <div class="reveal delay-180 flex xl:flex-col items-start gap-5">
            <div class="w-10 h-10 bg-white text-primary rounded-full flex shrink-0 items-center justify-center font-bold font-mono text-[15px] border-2 border-slate-300 z-10 ring-4 ring-white">6</div>
            <div>
              <h3 class="font-bold text-[16px] text-slate-900 mb-1 xl:mb-2">包裝交付</h3>
              <p class="text-[15px] xl:text-[14px] text-slate-600 leading-relaxed">依據客戶要求妥善包裝，並準時交付。</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>"""
html = re.sub(old_workflow, new_workflow, html, flags=re.DOTALL)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
