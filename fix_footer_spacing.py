import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_footer = r'<footer class="bg-\[\#0B1C2E\] text-slate-300 py-10 lg:py-16 border-t border-slate-800">.*?</footer>'

new_footer = """<footer class="bg-[#0B1C2E] text-slate-300 py-10 lg:py-16 border-t border-slate-800">
  <div class="max-w-6xl mx-auto px-5 md:px-10">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1.2fr_1fr] gap-8 lg:gap-12">
      
      <!-- 公司資料 -->
      <div class="flex flex-col gap-4">
        <div>
          <h2 class="text-[18px] lg:text-[20px] font-bold text-white mb-1 tracking-wider">萬順承實業有限公司</h2>
          <div class="text-[13px] font-mono text-slate-400 tracking-wider">WAN SHUN CHENG INDUSTRIAL CO., LTD.</div>
        </div>
        
        <div class="flex flex-col gap-3 lg:gap-4 text-[14px] lg:text-[15px] mt-2">
          <div class="flex items-start gap-3">
            <span class="w-[64px] shrink-0 text-slate-400 font-medium mt-0.5">統一編號</span>
            <span class="font-mono text-slate-200">69728478</span>
          </div>
          <div class="flex items-start gap-3">
            <span class="w-[64px] shrink-0 text-slate-400 font-medium mt-0.5">公司地址</span>
            <a href="https://www.google.com/maps/search/?api=1&query=%E6%A1%83%E5%9C%92%E5%B8%82%E6%A5%8A%E6%A2%85%E5%8D%80%E4%B8%8A%E6%B9%96%E9%87%8C%E4%B8%8A%E6%B9%96%E4%B8%89%E8%B7%AF166%E5%B7%B72%E8%99%9F" target="_blank" rel="noopener noreferrer" class="text-slate-200 hover:text-white underline underline-offset-[3px] decoration-slate-600 hover:decoration-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded leading-relaxed inline-block break-words">
              桃園市楊梅區上湖里上湖三路166巷2號
            </a>
          </div>
        </div>
      </div>
      
      <!-- 聯絡資訊 -->
      <div class="flex flex-col gap-3 lg:gap-4 text-[14px] lg:text-[15px]">
        <h3 class="text-[15px] font-bold text-white mb-1 tracking-widest border-b border-slate-700/50 pb-2">聯絡資訊</h3>
        <div class="flex items-start gap-3 mt-1">
          <span class="w-[64px] shrink-0 text-slate-400 font-medium mt-0.5">聯絡人</span>
          <span class="text-slate-200">范整鐘</span>
        </div>
        <div class="flex items-start gap-3">
          <span class="w-[64px] shrink-0 text-slate-400 font-medium mt-0.5">手機號碼</span>
          <a href="tel:0932271570" class="font-mono text-slate-200 hover:text-white underline underline-offset-[3px] decoration-slate-600 hover:decoration-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">0932-271570</a>
        </div>
        <div class="flex items-start gap-3">
          <span class="w-[64px] shrink-0 text-slate-400 font-medium mt-0.5">公司電話</span>
          <a href="tel:034721912" class="font-mono text-slate-200 hover:text-white underline underline-offset-[3px] decoration-slate-600 hover:decoration-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">03-4721912</a>
        </div>
        <div class="flex items-start gap-3">
          <span class="w-[64px] shrink-0 text-slate-400 font-medium mt-0.5">詢價信箱</span>
          <a href="mailto:fan6772@gmail.com" class="font-mono text-slate-200 hover:text-white underline underline-offset-[3px] decoration-slate-600 hover:decoration-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded break-all">fan6772@gmail.com</a>
        </div>
        <div class="flex items-start gap-3 mt-1 text-[13px]">
          <span class="w-[64px] shrink-0 text-slate-500 mt-0.5">傳真號碼</span>
          <span class="font-mono text-slate-400">03-4728290</span>
        </div>
      </div>
      
      <!-- 快速導覽 -->
      <div class="flex flex-col text-[14px] lg:text-[15px]">
        <h3 class="text-[15px] font-bold text-white mb-1 tracking-widest border-b border-slate-700/50 pb-2">快速導覽</h3>
        <div class="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-2 lg:gap-y-3 mt-4">
          <a href="#applications" class="text-slate-300 hover:text-white transition-colors flex items-center p-1 -ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded min-h-[44px] lg:min-h-0">承製案例</a>
          <a href="#capabilities" class="text-slate-300 hover:text-white transition-colors flex items-center p-1 -ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded min-h-[44px] lg:min-h-0">製造能力</a>
          <a href="#equipment" class="text-slate-300 hover:text-white transition-colors flex items-center p-1 -ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded min-h-[44px] lg:min-h-0">設備能力</a>
          <a href="#workflow" class="text-slate-300 hover:text-white transition-colors flex items-center p-1 -ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded min-h-[44px] lg:min-h-0">合作流程</a>
          <a href="#about" class="text-slate-300 hover:text-white transition-colors flex items-center p-1 -ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded min-h-[44px] lg:min-h-0">關於萬順承</a>
        </div>
      </div>
    </div>
    
    <div class="mt-8 lg:mt-12 pt-5 lg:pt-6 border-t border-slate-700/60 flex flex-col items-center md:items-start text-[12px] lg:text-[13px] leading-relaxed text-slate-400 pb-[calc(1.5rem+env(safe-area-inset-bottom))] lg:pb-8">
      <p class="text-center md:text-left break-words">&copy; <span id="current-year">2026</span> 萬順承實業有限公司 版權所有</p>
    </div>
  </div>
</footer>"""

html = re.sub(old_footer, new_footer, html, flags=re.DOTALL)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
