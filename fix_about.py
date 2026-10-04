import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_about = r'<section id="about".*?</section>'
new_about = """  <section id="about" class="py-12 lg:py-20 bg-dark-bg text-white border-t border-slate-800 scroll-margin-top-24">
    <div class="max-w-7xl mx-auto px-5 md:px-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <h2 class="text-2xl lg:text-3xl font-bold tracking-tight mb-5">關於萬順承實業</h2>
          <p class="text-[16px] text-slate-300 leading-relaxed mb-8 max-w-lg">
            技術團隊專注於提供穩定的複合材料熱壓成型代工服務。我們以紮實的現場實務為基礎，協助客戶克服開模與量產挑戰。
          </p>
          <div class="bg-slate-800/50 rounded-md p-6 lg:p-8 border border-slate-700/50 inline-block w-full max-w-md">
            <div class="flex items-center gap-2 mb-6">
              <span class="material-symbols-outlined text-[#3B82F6] text-[22px]" aria-hidden="true">factory</span>
              <span class="font-bold text-[16px] text-white">廠區資訊</span>
            </div>
            <div class="text-slate-200 text-[15px] space-y-4">
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-[#3B82F6] text-[18px] shrink-0 mt-0.5" aria-hidden="true">person</span>
                <span class="flex-grow">負責人：范整鏞</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-[#3B82F6] text-[18px] shrink-0 mt-0.5" aria-hidden="true">call</span>
                <div class="flex-grow flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                  <a href="tel:034721912" class="hover:text-white text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded font-mono">03-4721912</a>
                  <span class="hidden sm:inline text-slate-600 mx-3">|</span>
                  <span class="text-slate-400">傳真：<span class="font-mono">03-4728290</span></span>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-[#3B82F6] text-[18px] shrink-0 mt-0.5" aria-hidden="true">location_on</span>
                <div class="flex-grow">
                  <div class="mb-1">桃園市楊梅區上湖三路166巷2號</div>
                  <a href="https://www.google.com/maps/search/?api=1&query=%E6%A1%83%E5%9C%92%E5%B8%82%E6%A5%8A%E6%A2%85%E5%8D%80%E4%B8%8A%E6%B9%96%E4%B8%89%E8%B7%AF166%E5%B7%B72%E8%99%9F" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1 text-[#60A5FA] hover:text-[#93C5FD] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#60A5FA] rounded transition-colors w-fit text-[14px]">
                    在 Google Maps 查看 <span class="material-symbols-outlined text-[14px]" aria-hidden="true">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex flex-col gap-6 lg:gap-8">
          <div class="flex gap-4 items-start">
            <div class="w-12 h-12 bg-slate-800 rounded-md flex shrink-0 items-center justify-center border border-slate-700">
              <span class="material-symbols-outlined text-[#3B82F6] text-[24px]" aria-hidden="true">history</span>
            </div>
            <div>
              <h3 class="font-bold text-[16px] text-white mb-2">35 年現場製程經驗</h3>
              <p class="text-[14px] text-slate-400 leading-relaxed">深厚的複合材料成型技術底蘊，確保量產穩定性。</p>
            </div>
          </div>
          <div class="flex gap-4 items-start">
            <div class="w-12 h-12 bg-slate-800 rounded-md flex shrink-0 items-center justify-center border border-slate-700">
              <span class="material-symbols-outlined text-[#3B82F6] text-[24px]" aria-hidden="true">sync_alt</span>
            </div>
            <div>
              <h3 class="font-bold text-[16px] text-white mb-2">支援既有模具移轉</h3>
              <p class="text-[14px] text-slate-400 leading-relaxed">專業評估機台適配度，無縫接軌客戶現有生產模具。</p>
            </div>
          </div>
          <div class="flex gap-4 items-start">
            <div class="w-12 h-12 bg-slate-800 rounded-md flex shrink-0 items-center justify-center border border-slate-700">
              <span class="material-symbols-outlined text-[#3B82F6] text-[24px]" aria-hidden="true">category</span>
            </div>
            <div>
              <h3 class="font-bold text-[16px] text-white mb-2">廠內後道加工整合</h3>
              <p class="text-[14px] text-slate-400 leading-relaxed">提供修邊、去毛邊等一站式服務，降低委外風險。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>"""
html = re.sub(old_about, new_about, html, flags=re.DOTALL)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
