import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

contact_regex = r'<section id="contact".*?</section>'

new_contact = """<section id="contact" class="py-12 lg:py-20 bg-surface scroll-margin-top-24 relative">
    <div class="max-w-5xl mx-auto px-5 md:px-10">
      
      <div class="text-center mb-10 lg:mb-12">
        <h2 class="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">聯絡詢價</h2>
        <div class="w-8 h-1 bg-primary mt-3 mb-4 rounded-md mx-auto"></div>
        <p class="text-[15px] lg:text-[16px] text-slate-600 max-w-lg mx-auto">
          歡迎提供產品需求、圖面或照片，洽詢製程評估與報價。
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mb-8">
        
        <!-- Phone Card -->
        <div class="bg-white rounded-md border border-slate-200 shadow-sm p-6 lg:p-8 flex flex-col gap-6">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-primary text-[24px]" aria-hidden="true">call</span>
            </div>
            <h3 class="font-bold text-[18px] lg:text-[20px] text-slate-900">電話聯絡</h3>
          </div>
          
          <div class="flex flex-col gap-4 text-[15px] lg:text-[16px] text-slate-700">
            <div class="flex items-center gap-3">
              <span class="text-slate-500 w-[64px] shrink-0 font-medium">負責人</span>
              <span class="font-bold text-slate-900">范整鐘</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-slate-500 w-[64px] shrink-0 font-medium">手機</span>
              <div class="flex items-center gap-1 group">
                <a href="tel:0932271570" class="font-bold text-[18px] text-slate-900 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded underline underline-offset-4 decoration-transparent hover:decoration-primary">0932-271570</a>
                <button onclick="copyToClipboard('0932271570')" class="hidden lg:flex w-11 h-11 items-center justify-center rounded-md text-slate-400 hover:text-primary hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="複製手機號碼" title="複製號碼">
                  <span class="material-symbols-outlined text-[18px]" aria-hidden="true">content_copy</span>
                </button>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-slate-500 w-[64px] shrink-0 font-medium">電話</span>
              <div class="flex items-center gap-1 group">
                <a href="tel:034721912" class="text-[16px] text-slate-700 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded underline underline-offset-4 decoration-transparent hover:decoration-primary">03-4721912</a>
                <button onclick="copyToClipboard('034721912')" class="hidden lg:flex w-11 h-11 items-center justify-center rounded-md text-slate-400 hover:text-primary hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="複製公司電話" title="複製號碼">
                  <span class="material-symbols-outlined text-[18px]" aria-hidden="true">content_copy</span>
                </button>
              </div>
            </div>
            <div class="flex items-center gap-3 mt-1">
              <span class="text-slate-400 w-[64px] shrink-0 text-[14px]">傳真</span>
              <span class="text-[14px] text-slate-500">03-4728290</span>
            </div>
          </div>
          
          <div class="pt-6 border-t border-slate-100">
            <a href="tel:0932271570" class="min-h-[48px] w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white rounded-md font-bold text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              <span class="material-symbols-outlined text-[20px]" aria-hidden="true">smartphone</span>
              撥打手機
            </a>
          </div>
        </div>
        
        <!-- Email Card -->
        <div class="bg-white rounded-md border border-slate-200 shadow-sm p-6 lg:p-8 flex flex-col gap-6">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-primary text-[24px]" aria-hidden="true">mail</span>
            </div>
            <h3 class="font-bold text-[18px] lg:text-[20px] text-slate-900">Email 詢價</h3>
          </div>
          
          <div class="flex flex-col gap-3">
            <span class="text-slate-500 text-[15px] font-medium">詢價信箱</span>
            <a href="mailto:fan6772@gmail.com" class="text-primary font-bold text-[20px] break-all leading-tight hover:text-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded w-fit underline underline-offset-4 decoration-transparent hover:decoration-primary">fan6772@gmail.com</a>
            <p class="text-[14px] text-slate-500 leading-relaxed mt-2">
              將開啟您的郵件程式，圖面或照片請自行附加。
            </p>
          </div>
          
          <div class="flex flex-col gap-3 pt-6 border-t border-slate-100 mt-auto">
            <a href="mailto:fan6772@gmail.com?subject=模壓代工詢價&body=您好，我們有模壓成型的需求，請協助評估：%0D%0A%0D%0A1.%20產品用途與尺寸：%0D%0A2.%20材料需求（如已知）：%0D%0A3.%20預計數量：%0D%0A4.%20是否已有模具：%0D%0A5.%20希望交期：%0D%0A%0D%0A（請記得夾帶圖面或照片檔案）" class="min-h-[48px] w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white rounded-md font-bold text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              <span class="material-symbols-outlined text-[20px]" aria-hidden="true">mail</span>
              Email 詢價
            </a>
            <div class="grid grid-cols-2 gap-3">
              <button onclick="copyToClipboard('fan6772@gmail.com')" class="min-h-[44px] w-full inline-flex items-center justify-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-md font-medium text-[14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                <span class="material-symbols-outlined text-[18px]" aria-hidden="true">content_copy</span>
                複製信箱
              </button>
              <button onclick="copyTemplate()" class="min-h-[44px] w-full inline-flex items-center justify-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-md font-medium text-[14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                <span class="material-symbols-outlined text-[18px]" aria-hidden="true">assignment</span>
                複製範本
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Inquiry Data Prep List (Desktop) -->
      <div class="hidden lg:block bg-white border border-slate-200 rounded-md p-8 shadow-sm">
        <div class="flex items-center gap-2 font-bold text-slate-900 mb-4 text-[16px]">
          <span class="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">list_alt</span>
          詢價前可準備的資料
        </div>
        <p class="text-[14px] text-slate-500 mb-5">資料尚未齊全，也歡迎先聯絡。</p>
        <div class="grid grid-cols-2 gap-y-4 gap-x-6 text-[15px] text-slate-700">
          <div class="flex items-start gap-2.5"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" aria-hidden="true">check</span> 產品用途與尺寸</div>
          <div class="flex items-start gap-2.5"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" aria-hidden="true">check</span> 材料需求（如已知）</div>
          <div class="flex items-start gap-2.5"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" aria-hidden="true">check</span> 預計數量</div>
          <div class="flex items-start gap-2.5"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" aria-hidden="true">check</span> 是否已有模具</div>
          <div class="flex items-start gap-2.5"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" aria-hidden="true">check</span> 希望交期</div>
          <div class="flex items-start gap-2.5"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" aria-hidden="true">check</span> 圖面或產品照片</div>
        </div>
      </div>

      <!-- Inquiry Data Prep List (Mobile Accordion) -->
      <details class="lg:hidden bg-white border border-slate-200 rounded-md shadow-sm group">
        <summary class="flex flex-col p-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md list-none [&::-webkit-details-marker]:hidden relative">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 font-bold text-slate-900 text-[16px]">
              <span class="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">list_alt</span>
              詢價前可準備的資料
            </div>
            <span class="material-symbols-outlined text-slate-400 transition-transform duration-300 group-open:-rotate-180" aria-hidden="true">expand_more</span>
          </div>
          <p class="text-[13px] text-slate-500 mt-2">資料尚未齊全，也歡迎先聯絡。</p>
        </summary>
        <div class="px-6 pb-6 pt-2 border-t border-slate-100">
          <div class="grid grid-cols-1 gap-y-3 text-[14px] text-slate-700">
            <div class="flex items-start gap-2.5"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" aria-hidden="true">check</span> 產品用途與尺寸</div>
            <div class="flex items-start gap-2.5"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" aria-hidden="true">check</span> 材料需求（如已知）</div>
            <div class="flex items-start gap-2.5"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" aria-hidden="true">check</span> 預計數量</div>
            <div class="flex items-start gap-2.5"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" aria-hidden="true">check</span> 是否已有模具</div>
            <div class="flex items-start gap-2.5"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" aria-hidden="true">check</span> 希望交期</div>
            <div class="flex items-start gap-2.5"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" aria-hidden="true">check</span> 圖面或產品照片</div>
          </div>
        </div>
      </details>

    </div>
  </section>"""

html = re.sub(contact_regex, new_contact, html, flags=re.DOTALL)

toast_regex = r'<div id="toast" class="fixed bottom-5'
new_toast = r'<div id="toast" class="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))]'
html = re.sub(toast_regex, new_toast, html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
