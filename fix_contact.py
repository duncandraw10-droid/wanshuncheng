import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

contact_regex = r'<!-- Contact Section -->.*?<!-- Footer -->'
new_contact = """<!-- Contact Section -->
  <section id="contact" class="py-16 lg:py-24 bg-slate-50 scroll-margin-top-24 border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-5 md:px-10">
      
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        <!-- Left: Intro & Prep List -->
        <div class="w-full lg:w-1/2 flex flex-col reveal order-1 lg:order-1">
          <h2 class="text-2xl lg:text-[32px] font-bold text-dark-bg tracking-tight">聯絡詢價</h2>
          <div class="w-10 h-1 bg-primary mt-4 mb-6"></div>
          <p class="text-[16px] text-slate-600 leading-relaxed mb-8">
            歡迎提供產品需求、圖面或照片，洽詢製程評估與報價。
          </p>

          <!-- Desktop Prep List (Hidden on Mobile) -->
          <div class="hidden lg:block mt-2">
            <h3 class="font-bold text-dark-bg text-[18px] mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[22px]">list_alt</span>
              詢價前可準備的資料
            </h3>
            <p class="text-[14px] text-slate-500 mb-5">資料尚未齊全，也歡迎先聯絡。</p>
            <ul class="space-y-3 text-[15px] text-slate-700">
              <li class="flex items-start gap-3"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check</span>產品用途與尺寸</li>
              <li class="flex items-start gap-3"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check</span>材料需求（如已知）</li>
              <li class="flex items-start gap-3"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check</span>預計數量</li>
              <li class="flex items-start gap-3"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check</span>是否已有模具</li>
              <li class="flex items-start gap-3"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check</span>希望交期</li>
              <li class="flex items-start gap-3"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check</span>圖面或產品照片</li>
            </ul>
          </div>
        </div>

        <!-- Right: Contact Methods -->
        <div class="w-full lg:w-1/2 flex flex-col gap-10 reveal order-2 lg:order-2">
          
          <!-- Phone Block -->
          <div class="pb-8 border-b border-slate-200">
            <div class="flex items-center gap-2 mb-4">
              <span class="material-symbols-outlined text-dark-bg text-[22px]">call</span>
              <h3 class="font-bold text-dark-bg text-[18px]">電話聯絡</h3>
            </div>
            
            <div class="flex flex-col gap-5">
              <!-- Mobile -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div class="text-[13px] text-slate-500 mb-1">負責人 / 范整鏞</div>
                  <div class="flex items-center gap-3">
                    <a href="tel:0932271570" class="tabular-nums font-bold text-[22px] text-dark-bg hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">0932-271570</a>
                    <button onclick="copyToClipboard('0932271570')" class="hidden sm:flex text-slate-400 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary p-1 rounded" aria-label="複製手機號碼" title="複製號碼">
                      <span class="material-symbols-outlined text-[18px]">content_copy</span>
                    </button>
                  </div>
                </div>
                <a href="tel:0932271570" class="sm:hidden w-full inline-flex items-center justify-center gap-2 bg-primary text-white h-[48px] rounded font-bold text-[16px]">
                  撥打手機
                </a>
              </div>
              
              <!-- Office Phone & Fax -->
              <div class="flex flex-col sm:flex-row gap-6 sm:gap-12 pt-2">
                <div>
                  <div class="text-[13px] text-slate-500 mb-1">公司電話</div>
                  <div class="flex items-center gap-2">
                    <a href="tel:034721912" class="tabular-nums font-bold text-[16px] text-dark-bg hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">03-4721912</a>
                    <button onclick="copyToClipboard('034721912')" class="hidden sm:flex text-slate-400 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary p-1 rounded" aria-label="複製公司電話" title="複製號碼">
                      <span class="material-symbols-outlined text-[16px]">content_copy</span>
                    </button>
                  </div>
                </div>
                <div>
                  <div class="text-[13px] text-slate-500 mb-1">傳真號碼</div>
                  <div class="tabular-nums font-bold text-[16px] text-dark-bg">03-4728290</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Email Block -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <span class="material-symbols-outlined text-dark-bg text-[22px]">mail</span>
              <h3 class="font-bold text-dark-bg text-[18px]">Email 詢價</h3>
            </div>
            
            <p class="text-[14px] text-slate-500 mb-4">將開啟您的郵件程式，圖面或照片請自行附加。</p>
            
            <div class="flex items-center gap-3 mb-5">
              <a href="mailto:fan6772@gmail.com" class="tabular-nums font-bold text-[18px] sm:text-[20px] text-dark-bg hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded break-all">fan6772@gmail.com</a>
              <button onclick="copyToClipboard('fan6772@gmail.com')" class="hidden sm:flex text-slate-400 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary p-1 rounded" aria-label="複製 Email" title="複製信箱">
                <span class="material-symbols-outlined text-[18px]">content_copy</span>
              </button>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-3">
              <button onclick="copyTemplate()" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-dark-bg text-white h-[48px] px-8 rounded font-bold text-[15px] hover:bg-[#203a5c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                使用信件範本
              </button>
              <button onclick="copyToClipboard('fan6772@gmail.com')" class="sm:hidden w-full inline-flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-600 h-[48px] rounded font-bold text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                複製信箱
              </button>
            </div>
          </div>
          
        </div>

        <!-- Mobile Prep List Accordion (Hidden on Desktop) -->
        <div class="w-full lg:hidden reveal order-3 mt-4">
          <details class="bg-white border border-slate-200 rounded group">
            <summary class="flex flex-col p-5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded list-none [&::-webkit-details-marker]:hidden relative">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 font-bold text-dark-bg text-[16px]">
                  <span class="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">list_alt</span>
                  詢價前可準備的資料
                </div>
                <span class="material-symbols-outlined text-slate-400 transition-transform duration-300 group-open:-rotate-180" aria-hidden="true">expand_more</span>
              </div>
              <p class="text-[13px] text-slate-500 mt-2">資料尚未齊全，也歡迎先聯絡。</p>
            </summary>
            <div class="px-5 pb-5 pt-2 border-t border-slate-100">
              <ul class="space-y-3 text-[14px] text-slate-700">
                <li class="flex items-start gap-2.5"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check</span>產品用途與尺寸</li>
                <li class="flex items-start gap-2.5"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check</span>材料需求（如已知）</li>
                <li class="flex items-start gap-2.5"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check</span>預計數量</li>
                <li class="flex items-start gap-2.5"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check</span>是否已有模具</li>
                <li class="flex items-start gap-2.5"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check</span>希望交期</li>
                <li class="flex items-start gap-2.5"><span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check</span>圖面或產品照片</li>
              </ul>
            </div>
          </details>
        </div>

      </div>
    </div>
  </section>

  <!-- Footer -->"""
html = re.sub(contact_regex, new_contact, html, flags=re.DOTALL)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
