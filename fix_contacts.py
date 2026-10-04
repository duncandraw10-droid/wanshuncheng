import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update old email globally
html = html.replace('service@wanshuncheng.com.tw', 'fan6772@gmail.com')

# 2. Update About section's 廠區資訊
old_about = r"""          <div class="bg-slate-800/50 rounded-md p-5 border border-slate-700/50 inline-block">
            <div class="flex items-center gap-2 mb-3">
              <span class="material-symbols-outlined text-primary" aria-hidden="true">factory</span>
              <span class="font-bold text-\[15px\] text-white">廠區資訊</span>
            </div>
            <div class="text-slate-300 text-\[14px\] space-y-2">
              <div class="flex items-start gap-2">
                <span class="material-symbols-outlined text-slate-400 text-\[16px\] shrink-0" aria-hidden="true">location_on</span>
                <div>
                  桃園市楊梅區上湖三路166巷2號
                  <a href="https://www.google.com/maps/search/\?api=1&query=%E6%A1%83%E5%9C%92%E5%B8%82%E6%A5%8A%E6%A2%85%E5%8D%80%E4%B8%8A%E6%B9%96%E4%B8%89%E8%B7%AF166%E5%B7%B72%E8%99%9F" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-0.5 text-primary hover:text-blue-400 mt-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded transition-colors">
                    在 Google Maps 查看 <span class="material-symbols-outlined text-\[14px\]" aria-hidden="true">open_in_new</span>
                  </a>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-slate-400 text-\[16px\]" aria-hidden="true">call</span>
                <span>03-4721912</span>
                <span class="text-slate-600 mx-1">\|</span>
                <span class="material-symbols-outlined text-slate-400 text-\[16px\]" aria-hidden="true">fax</span>
                <span>03-4728290</span>
              </div>
            </div>
          </div>"""

new_about = """          <div class="bg-slate-800/50 rounded-md p-5 border border-slate-700/50 inline-block w-full max-w-sm">
            <div class="flex items-center gap-2 mb-4">
              <span class="material-symbols-outlined text-primary" aria-hidden="true">factory</span>
              <span class="font-bold text-[15px] text-white">廠區資訊</span>
            </div>
            <div class="text-slate-300 text-[14px] space-y-3">
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-slate-400 text-[16px] shrink-0 mt-0.5" aria-hidden="true">person</span>
                <span class="flex-grow">負責人：范整鏞</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-slate-400 text-[16px] shrink-0 mt-0.5" aria-hidden="true">call</span>
                <span class="flex-grow">
                  <a href="tel:034721912" class="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded font-mono">03-4721912</a>
                  <span class="text-slate-600 mx-2">|</span>
                  <span class="text-slate-400">傳真：<span class="font-mono">03-4728290</span></span>
                </span>
              </div>
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-slate-400 text-[16px] shrink-0 mt-0.5" aria-hidden="true">location_on</span>
                <div class="flex-grow">
                  桃園市楊梅區上湖三路166巷2號
                  <a href="https://www.google.com/maps/search/?api=1&query=%E6%A1%83%E5%9C%92%E5%B8%82%E6%A5%8A%E6%A2%85%E5%8D%80%E4%B8%8A%E6%B9%96%E4%B8%89%E8%B7%AF166%E5%B7%B72%E8%99%9F" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1 text-primary hover:text-blue-400 mt-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded transition-colors w-fit">
                    在 Google Maps 查看 <span class="material-symbols-outlined text-[14px]" aria-hidden="true">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>
          </div>"""

html = re.sub(old_about, new_about, html, flags=re.MULTILINE)

# 3. Update Contact Section content
old_contact_block = r'<div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">.*?<p class="text-\[12px\] text-slate-400 text-center mt-4">\s*\* 點擊寄送需求將開啟您的本機郵件軟體。為加速評估，請於信件中自行夾帶產品圖面或照片檔案。\s*</p>'

new_contact_block = """<div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
        <!-- Phone -->
        <div class="flex flex-col gap-4 p-6 md:p-8 rounded-md border border-slate-200 bg-white shadow-sm h-full">
          <div class="flex items-center gap-2 mb-2">
            <span class="material-symbols-outlined text-2xl text-primary" aria-hidden="true">call</span>
            <h3 class="font-bold text-[18px] text-slate-900">電話洽詢</h3>
          </div>
          
          <div class="space-y-3 text-[15px] text-slate-700 flex-grow">
            <div class="flex items-center gap-2">
              <span class="text-slate-400 w-20 shrink-0">負責人</span>
              <span class="font-medium">范整鏞</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-slate-400 w-20 shrink-0">手機</span>
              <span class="font-mono">0932-271570</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-slate-400 w-20 shrink-0">公司電話</span>
              <span class="font-mono">03-4721912</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-slate-400 w-20 shrink-0">傳真</span>
              <span class="font-mono text-slate-500">03-4728290</span>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-3 mt-4">
            <a href="tel:0932271570" class="min-h-[44px] inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white rounded-md font-medium text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              <span class="material-symbols-outlined text-[18px]" aria-hidden="true">smartphone</span>
              撥打手機
            </a>
            <a href="tel:034721912" class="min-h-[44px] inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-md font-medium text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              <span class="material-symbols-outlined text-[18px]" aria-hidden="true">call</span>
              公司電話
            </a>
          </div>
        </div>
        
        <!-- Email -->
        <div class="flex flex-col gap-4 p-6 md:p-8 rounded-md border border-slate-200 bg-white shadow-sm h-full">
          <div class="flex items-center gap-2 mb-2">
            <span class="material-symbols-outlined text-2xl text-primary" aria-hidden="true">mail</span>
            <h3 class="font-bold text-[18px] text-slate-900">寄送需求</h3>
          </div>
          
          <div class="space-y-3 text-[15px] text-slate-700 flex-grow">
            <div class="flex items-center gap-2">
              <span class="text-slate-400 w-20 shrink-0">詢價信箱</span>
              <span class="font-mono text-primary font-medium break-all">fan6772@gmail.com</span>
            </div>
            <p class="text-[13px] text-slate-500 mt-4 leading-relaxed">
              點擊「開啟郵件撰寫」將喚起您的本機郵件軟體。為加速評估，<span class="text-slate-700 font-medium">圖面或照片檔案請自行夾帶</span>，謝謝！
            </p>
          </div>
          
          <div class="flex flex-col gap-3 mt-4">
            <a href="mailto:fan6772@gmail.com?subject=SMC／BMC%20模壓成型詢價&body=您好，我們有模壓成型的需求，請協助評估：%0D%0A%0D%0A1.%20公司名稱：%0D%0A2.%20聯絡人與電話：%0D%0A3.%20產品名稱／用途：%0D%0A4.%20材料需求：%0D%0A5.%20預估數量：%0D%0A6.%20是否有現成模具：%0D%0A7.%20希望交期：%0D%0A8.%20其他需求（如表面處理）：%0D%0A%0D%0A（請記得夾帶圖面或照片檔案，謝謝！）" class="min-h-[44px] inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white rounded-md font-medium text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              <span class="material-symbols-outlined text-[18px]" aria-hidden="true">edit_square</span>
              開啟郵件撰寫
            </a>
            <div class="grid grid-cols-2 gap-3">
              <button onclick="copyToClipboard('fan6772@gmail.com')" class="min-h-[44px] inline-flex items-center justify-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-md font-medium text-[14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                <span class="material-symbols-outlined text-[16px]" aria-hidden="true">content_copy</span>
                複製信箱
              </button>
              <button onclick="copyTemplate()" class="min-h-[44px] inline-flex items-center justify-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-md font-medium text-[14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                <span class="material-symbols-outlined text-[16px]" aria-hidden="true">assignment</span>
                複製詢價範本
              </button>
            </div>
          </div>
        </div>
      </div>"""
      
html = re.sub(old_contact_block, new_contact_block, html, flags=re.DOTALL)

# 4. Update Footer
old_footer = r'<footer.*?</footer>'
new_footer = """<footer class="bg-dark-bg text-slate-400 border-t border-slate-800 py-10 text-[14px]">
  <div class="max-w-7xl mx-auto px-5 md:px-10 text-center">
    <div class="mb-6 space-y-1">
      <div class="text-[16px] font-bold text-slate-200">萬順承實業有限公司</div>
      <div class="text-[12px] font-mono text-slate-500 uppercase tracking-wider">WAN SHUN CHENG INDUSTRIAL CO., LTD.</div>
    </div>
    
    <div class="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-8 text-slate-400 text-[13px]">
      <a href="#applications" class="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded">承製案例</a>
      <span class="hidden sm:inline text-slate-600">•</span>
      <a href="#capabilities" class="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded">製造能力</a>
      <span class="hidden sm:inline text-slate-600">•</span>
      <a href="#equipment" class="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded">設備能力</a>
      <span class="hidden sm:inline text-slate-600">•</span>
      <a href="#workflow" class="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded">合作流程</a>
      <span class="hidden sm:inline text-slate-600">•</span>
      <a href="#about" class="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded">關於萬順承</a>
    </div>
    
    <div class="text-slate-400 space-y-1.5 md:space-y-0 md:flex md:flex-wrap md:justify-center md:items-center md:gap-x-4 mb-6">
      <div class="flex items-center justify-center gap-1.5">統一編號：<span class="font-mono">69728478</span></div>
      <span class="hidden md:inline text-slate-700">|</span>
      <div>桃園市楊梅區上湖三路166巷2號</div>
      <span class="hidden md:inline text-slate-700">|</span>
      <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
        <span>電話：<a href="tel:034721912" class="font-mono hover:text-white transition-colors">03-4721912</a></span>
        <span>傳真：<span class="font-mono">03-4728290</span></span>
      </div>
      <span class="hidden md:inline text-slate-700">|</span>
      <div>Email：<a href="mailto:fan6772@gmail.com" class="font-mono hover:text-white transition-colors break-all">fan6772@gmail.com</a></div>
    </div>

    <p class="text-slate-500 text-[13px]">&copy; 2026 萬順承實業有限公司 版權所有</p>
  </div>
</footer>"""

html = re.sub(old_footer, new_footer, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
