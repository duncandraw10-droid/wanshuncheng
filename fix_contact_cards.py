import re

with open("index.html", "r") as f:
    content = f.read()

contact_replacement = """
  <!-- Contact Section -->
  <section id="contact" class="py-16 lg:py-24 bg-[#f8fafc] scroll-margin-top-24 border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-5 md:px-10">
      
      <div class="text-center mb-12 lg:mb-16 reveal">
        <h2 class="text-3xl font-bold text-slate-900 tracking-tight">聯絡詢價</h2>
        <div class="w-12 h-1 bg-[#2563EB] mt-4 mb-6 mx-auto"></div>
        <p class="text-[16px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
          歡迎提供產品需求、圖面或照片，洽詢製程評估與報價。<br class="hidden sm:block"/>資料尚未齊全，也歡迎先聯絡。
        </p>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        
        <!-- Prep Data Card -->
        <div class="bg-white border border-slate-200 p-8 flex flex-col h-full reveal delay-0">
          <div class="flex items-center gap-3 mb-6">
            <span class="material-symbols-outlined text-[#2563EB] text-[28px]" aria-hidden="true">list_alt</span>
            <h3 class="font-bold text-[20px] text-slate-900">詢價前可準備的資料</h3>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-4 gap-x-6 text-[16px] text-slate-600 mt-2">
            <div class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2.5 shrink-0"></span> 產品用途與尺寸</div>
            <div class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2.5 shrink-0"></span> 材料需求（如已知）</div>
            <div class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2.5 shrink-0"></span> 預計數量</div>
            <div class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2.5 shrink-0"></span> 是否已有模具</div>
            <div class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2.5 shrink-0"></span> 希望交期</div>
            <div class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2.5 shrink-0"></span> 圖面或產品照片</div>
          </div>
        </div>

        <!-- Phone Card -->
        <div class="bg-white border border-slate-200 p-8 flex flex-col h-full reveal delay-60">
          <div class="flex items-center gap-3 mb-8">
            <span class="material-symbols-outlined text-[#2563EB] text-[28px]" aria-hidden="true">call</span>
            <h3 class="font-bold text-[20px] text-slate-900">電話聯絡</h3>
          </div>
          
          <div class="flex flex-col gap-5 text-[16px] text-slate-600 flex-grow">
            <div class="flex items-center justify-between">
              <span class="font-medium w-16 shrink-0">負責人</span>
              <span class="font-bold text-slate-900 flex-grow text-right">范整鏞</span>
            </div>
            <div class="flex items-center justify-between group">
              <span class="font-medium w-16 shrink-0">手機</span>
              <div class="flex items-center gap-2">
                <a href="tel:0932271570" class="tabular-nums font-bold text-slate-900 hover:text-[#2563EB] transition-colors">0932-271570</a>
                <button onclick="copyToClipboard('0932271570')" class="text-slate-400 hover:text-[#2563EB] transition-colors p-1" title="複製號碼">
                  <span class="material-symbols-outlined text-[18px]">content_copy</span>
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between group">
              <span class="font-medium w-16 shrink-0">電話</span>
              <div class="flex items-center gap-2">
                <a href="tel:034721912" class="tabular-nums text-slate-900 hover:text-[#2563EB] transition-colors">03-4721912</a>
                <button onclick="copyToClipboard('034721912')" class="text-slate-400 hover:text-[#2563EB] transition-colors p-1" title="複製號碼">
                  <span class="material-symbols-outlined text-[18px]">content_copy</span>
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="font-medium w-16 shrink-0 text-slate-500">傳真</span>
              <span class="tabular-nums text-slate-500">03-4728290</span>
            </div>
          </div>
          
          <div class="mt-8 pt-6 border-t border-slate-100">
            <a href="tel:0932271570" class="min-h-[48px] w-full inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-[16px] transition-colors">
              <span class="material-symbols-outlined text-[20px]" aria-hidden="true">smartphone</span>
              撥打手機
            </a>
          </div>
        </div>

        <!-- Email Card -->
        <div class="bg-white border border-slate-200 p-8 flex flex-col h-full reveal delay-120">
          <div class="flex items-center gap-3 mb-8">
            <span class="material-symbols-outlined text-[#2563EB] text-[28px]" aria-hidden="true">mail</span>
            <h3 class="font-bold text-[20px] text-slate-900">Email 詢價</h3>
          </div>
          
          <div class="flex flex-col gap-5 flex-grow">
            <div class="flex flex-col gap-2">
              <span class="text-[16px] font-medium text-slate-600">詢價信箱</span>
              <a href="mailto:fan6772@gmail.com" class="tabular-nums font-bold text-[18px] text-slate-900 hover:text-[#2563EB] transition-colors break-all">
                fan6772@gmail.com
              </a>
            </div>
            
            <p class="text-[14px] text-slate-500 mt-2 leading-relaxed">
              點擊下方「開啟郵件」將會開啟您的郵件程式，請自行夾帶圖面與照片附件。
            </p>
          </div>
          
          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
            <a href="mailto:fan6772@gmail.com?subject=模壓代工詢價&body=您好，我們有模壓成型的需求，請協助評估：%0D%0A%0D%0A1.%20產品用途與尺寸：%0D%0A2.%20材料需求（如已知）：%0D%0A3.%20預計數量：%0D%0A4.%20是否已有模具：%0D%0A5.%20希望交期：%0D%0A%0D%0A（請記得夾帶圖面或照片檔案）" class="min-h-[48px] w-full inline-flex items-center justify-center gap-2 bg-[#172B46] hover:bg-slate-800 text-white font-bold text-[16px] transition-colors">
              <span class="material-symbols-outlined text-[20px]" aria-hidden="true">mail</span>
              開啟郵件
            </a>
            <div class="grid grid-cols-2 gap-3">
              <button onclick="copyToClipboard('fan6772@gmail.com')" class="min-h-[48px] inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-[15px] transition-colors">
                <span class="material-symbols-outlined text-[18px]" aria-hidden="true">content_copy</span>
                複製信箱
              </button>
              <button onclick="copyTemplate()" class="min-h-[48px] inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-[15px] transition-colors">
                <span class="material-symbols-outlined text-[18px]" aria-hidden="true">assignment</span>
                複製範本
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
"""

pattern = re.compile(r'<!-- Contact Section -->.*?</main>', re.DOTALL)
new_content = re.sub(pattern, contact_replacement + '\n</main>', content)

with open("index.html", "w") as f:
    f.write(new_content)

print("Contact section redesigned as cards")
