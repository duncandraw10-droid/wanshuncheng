import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix the duplicate info div and broken structure
broken_part = r"""      <div class="flex items-start md:items-center gap-2 text-\[13px\] text-slate-500 mb-10">
        <span class="material-symbols-outlined text-\[16px\] shrink-0 mt-0\.5 md:mt-0" aria-hidden="true">info</span>
        <span>工作台尺寸、模具高度、開模行程與實際適配性，將依產品圖面、模具及實機條件確認。</span>
      </div>
        <span class="material-symbols-outlined text-\[14px\]" aria-hidden="true">info</span>
        工作台尺寸、模具高度、開模行程與實際適配性，將依產品圖面、模具及實機條件確認。
      </div>"""

fixed_part = """      <div class="flex items-start md:items-center gap-2 text-[13px] text-slate-500 mb-10">
        <span class="material-symbols-outlined text-[16px] shrink-0 mt-0.5 md:mt-0" aria-hidden="true">info</span>
        <span>工作台尺寸、模具高度、開模行程與實際適配性，將依產品圖面、模具及實機條件確認。</span>
      </div>"""

html = re.sub(broken_part, fixed_part, html)

# Re-apply Aux Equipment fix
old_aux = r'<!-- Aux Equipment -->.*?<!-- CTA -->'
new_aux = """<!-- Aux Equipment -->
      <div class="reveal bg-white rounded-md border border-slate-200 overflow-hidden flex flex-col md:flex-row items-stretch">
        <div class="w-full md:w-[40%] bg-slate-100 shrink-0 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-slate-200">
          <img src="./images/equip-shini-stm.jpg" alt="SHINI STM 模溫控制系統" loading="lazy" width="800" height="600" class="w-full h-auto object-contain max-h-[280px]" />
        </div>
        <div class="p-6 md:p-8 lg:p-10 w-full flex flex-col justify-center">
          <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
            <h3 class="font-bold text-[18px] lg:text-[20px] text-slate-900">模具溫度控制系統</h3>
            <span class="inline-block w-fit bg-slate-100 text-slate-600 px-2 py-0.5 rounded-sm text-xs font-bold font-mono border border-slate-200">SHINI STM</span>
          </div>
          <p class="text-[14px] lg:text-[15px] text-slate-600 leading-relaxed mb-6">
            廠內配備專業級水式模溫機，確保 SMC／BMC 等熱固性複合材料在成型過程中，模具溫度維持高度穩定。
          </p>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex items-start gap-2">
              <span class="material-symbols-outlined text-primary text-[20px] shrink-0" aria-hidden="true">device_thermostat</span>
              <div>
                <h4 class="font-bold text-[14px] text-slate-900 mb-1">精準溫控</h4>
                <p class="text-[13px] text-slate-500 leading-relaxed">提供精確的加熱與保溫控制，降低產品變形率。</p>
              </div>
            </div>
            <div class="flex items-start gap-2">
              <span class="material-symbols-outlined text-primary text-[20px] shrink-0" aria-hidden="true">settings_timelapse</span>
              <div>
                <h4 class="font-bold text-[14px] text-slate-900 mb-1">穩定交期</h4>
                <p class="text-[13px] text-slate-500 leading-relaxed">有效減少升溫等待時間，提升量產效率與良率。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->"""
html = re.sub(old_aux, new_aux, html, flags=re.DOTALL)

# Re-apply Banner fix
old_banner = r'<!-- CTA -->\s*<div class="bg-dark-bg rounded-md p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-12 border border-slate-800">.*?</div>\s*</div>\s*</section>'
new_banner = """<!-- CTA -->
      <div class="mt-12 lg:mt-16 bg-[#0B1C2E] rounded-md overflow-hidden relative shadow-lg">
        <div class="absolute inset-0 z-0">
          <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>
        
        <div class="relative z-10 p-6 md:p-8 lg:p-10 flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-8">
          <div class="flex-grow">
            <h3 class="font-bold text-[18px] lg:text-[22px] text-white mb-2">需要製程或機台適配評估？</h3>
            <p class="text-[14px] lg:text-[15px] text-slate-300 leading-relaxed">
              請備妥產品圖面或現有模具尺寸，我們將為您建議最合適的成型設備與排程。
            </p>
          </div>
          <a href="#contact" class="shrink-0 min-h-[44px] w-full md:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-md font-bold text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1C2E]">
            <span class="material-symbols-outlined text-[20px]" aria-hidden="true">mail</span>
            與我們聯繫
          </a>
        </div>
      </div>
    </div>
  </section>"""
html = re.sub(old_banner, new_banner, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
