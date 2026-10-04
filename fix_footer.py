import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_footer = r'<footer class="bg-\[\#0B1C2E\].*?</footer>'

new_footer = """<footer class="bg-[#0B1C2E] text-slate-300 pt-12 pb-[calc(1.5rem+env(safe-area-inset-bottom))] md:pt-16 md:pb-10 border-t border-slate-800">
  <div class="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
    <div class="flex flex-col md:flex-row justify-between gap-10 md:gap-8 lg:gap-12">
      
      <!-- Left: Brand & Contact -->
      <div class="flex flex-col">
        <!-- Brand -->
        <div class="mb-8 md:mb-10">
          <h2 class="text-[24px] md:text-[26px] lg:text-[28px] font-bold text-white mb-1 tracking-wider">萬順承實業有限公司</h2>
          <div class="text-[12px] lg:text-[14px] font-mono text-slate-400 tracking-wider">WAN SHUN CHENG INDUSTRIAL CO., LTD.</div>
        </div>
        
        <!-- Contact List -->
        <div class="flex flex-col gap-4 text-[14px] lg:text-[15px]">
          <!-- Address -->
          <div class="flex items-start gap-2 md:gap-3 lg:gap-4">
            <div class="flex items-center gap-1.5 md:gap-2 shrink-0 w-[72px] lg:w-[80px]">
              <span class="material-symbols-outlined text-white text-[18px] lg:text-[20px]" aria-hidden="true">location_on</span>
              <span class="text-white font-bold tracking-widest">地址</span>
            </div>
            <a href="https://www.google.com/maps/search/?api=1&query=%E6%A1%83%E5%9C%92%E5%B8%82%E6%A5%8A%E6%A2%85%E5%8D%80%E4%B8%8A%E6%B9%96%E9%87%8C%E4%B8%8A%E6%B9%96%E4%B8%89%E8%B7%AF166%E5%B7%B72%E8%99%9F" target="_blank" rel="noopener noreferrer" class="text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded leading-relaxed break-words py-1 -my-1 -mt-1 lg:-mt-0.5 max-w-[280px] lg:max-w-none">
              桃園市楊梅區上湖里上湖三路166巷2號
            </a>
          </div>
          <!-- Phone -->
          <div class="flex items-start gap-2 md:gap-3 lg:gap-4">
            <div class="flex items-center gap-1.5 md:gap-2 shrink-0 w-[72px] lg:w-[80px] mt-0.5 md:mt-0">
              <span class="material-symbols-outlined text-white text-[18px] lg:text-[20px]" aria-hidden="true">call</span>
              <span class="text-white font-bold tracking-widest">電話</span>
            </div>
            <a href="tel:034721912" class="font-mono text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded py-1 -my-1">
              03-4721912
            </a>
          </div>
          <!-- Tax ID -->
          <div class="flex items-start gap-2 md:gap-3 lg:gap-4">
            <div class="flex items-center gap-1.5 md:gap-2 shrink-0 w-[72px] lg:w-[80px] mt-0.5 md:mt-0">
              <span class="material-symbols-outlined text-white text-[18px] lg:text-[20px]" aria-hidden="true">receipt_long</span>
              <span class="text-white font-bold tracking-widest">統編</span>
            </div>
            <span class="font-mono text-slate-300 py-1 -my-1">
              69728478
            </span>
          </div>
          <!-- Email -->
          <div class="flex items-start gap-2 md:gap-3 lg:gap-4">
            <div class="flex items-center gap-1.5 md:gap-2 shrink-0 w-[72px] lg:w-[80px] mt-0.5 md:mt-0">
              <span class="material-symbols-outlined text-white text-[18px] lg:text-[20px]" aria-hidden="true">mail</span>
              <span class="text-white font-bold tracking-widest">信箱</span>
            </div>
            <a href="mailto:fan6772@gmail.com" class="font-mono text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded break-all py-1 -my-1">
              fan6772@gmail.com
            </a>
          </div>
        </div>
      </div>
      
      <!-- Mobile Divider -->
      <div class="h-px w-full bg-slate-700/60 md:hidden my-2"></div>

      <!-- Right: Links & Button -->
      <div class="flex flex-col justify-between items-start md:items-end w-full md:w-auto gap-8 md:gap-10">
        <!-- Links Grid -->
        <div class="grid grid-cols-2 md:grid-flow-col md:grid-rows-2 md:auto-cols-max gap-x-6 md:gap-x-12 lg:gap-x-20 gap-y-5 md:gap-y-6 w-full md:w-auto">
          <a href="#applications" class="font-bold text-[15px] lg:text-[16px] text-white hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded py-1 -my-1">承製案例</a>
          <a href="#capabilities" class="font-bold text-[15px] lg:text-[16px] text-white hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded py-1 -my-1">製造能力</a>
          <a href="#equipment" class="font-bold text-[15px] lg:text-[16px] text-white hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded py-1 -my-1">設備能力</a>
          <a href="#workflow" class="font-bold text-[15px] lg:text-[16px] text-white hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded py-1 -my-1">合作流程</a>
          <a href="#about" class="font-bold text-[15px] lg:text-[16px] text-white hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded py-1 -my-1">關於萬順承</a>
        </div>
        
        <!-- Action Button -->
        <a href="#contact" class="w-full md:w-auto inline-flex items-center justify-center bg-white text-[#0B1C2E] hover:bg-slate-100 px-8 py-3 rounded-full font-bold text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-sm self-start md:self-end mt-2 md:mt-0">
          聯絡我們
        </a>
      </div>
      
    </div>
    
    <!-- Copyright -->
    <div class="mt-12 md:mt-16 pt-6 border-t border-slate-700/60 text-center md:text-left text-[12px] lg:text-[13px] text-slate-400">
      <p>&copy; <span id="current-year">2026</span> 萬順承實業有限公司 版權所有</p>
    </div>
  </div>
</footer>"""

html = re.sub(old_footer, new_footer, html, flags=re.DOTALL)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
