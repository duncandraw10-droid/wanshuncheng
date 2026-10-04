import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_aux = r'<!-- Aux Equipment -->.*?<div class="mt-12 md:mt-16 bg-\[\#0B1728\] rounded-md overflow-hidden relative shadow-lg">'

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

      <!-- Call to action Banner -->
      <div class="mt-12 lg:mt-16 bg-[#0B1C2E] rounded-md overflow-hidden relative shadow-lg">"""

html = re.sub(old_aux, new_aux, html, flags=re.DOTALL)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
