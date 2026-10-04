import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# --- 1. Global Spacing, Scrolling & Typography ---
html = re.sub(r'py-\[56px\] md:py-\[80px\]', 'py-12 lg:py-20', html)
html = html.replace('scroll-margin-top-16', 'scroll-margin-top-24')

# --- 2. Navbar Breakpoint & Logo ---
# Change md: to lg: for navbar toggles
html = html.replace('class="hidden md:flex items-center gap-6"', 'class="hidden lg:flex items-center gap-6"')
html = html.replace('class="md:hidden flex items-center justify-center w-11 h-11 text-white', 'class="lg:hidden flex items-center justify-center w-11 h-11 text-white')
html = html.replace('class="hidden md:hidden bg-[#0B1C2E]', 'class="hidden lg:hidden bg-[#0B1C2E]')
# Enlarge Logo
html = html.replace('class="h-[46px] md:h-[54px] w-auto object-contain"', 'class="h-[54px] lg:h-[64px] w-auto object-contain transform scale-110 origin-left"')

# --- 3. Hero Section ---
# Increase Hero Title sizes slightly for desktop (30-32px requested, 3xl is 30px, 4xl is 36px. We'll use text-3xl lg:text-4xl)
html = re.sub(r'text-3xl md:text-5xl', 'text-3xl lg:text-4xl', html)
# Mobile image position
html = html.replace('class="w-full h-full object-cover object-center opacity-60"', 'class="w-full h-full object-cover object-[center_60%] lg:object-center opacity-60"')
# Buttons stack on mobile
html = html.replace('class="hero-animate hero-delay-3 flex flex-col sm:flex-row gap-4 mb-16"', 'class="hero-animate hero-delay-3 flex flex-col sm:flex-row gap-4 mb-16"') # already flex-col

# --- 4. Hero Stats (35年, 250T-500T, 完整製程) ---
# Make mobile 3 columns compact or 3 rows if crowded. 
# Current: grid grid-cols-2 sm:grid-cols-3 gap-6
html = html.replace('grid grid-cols-2 sm:grid-cols-3 gap-6', 'grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6')
# Current stats text: text-2xl md:text-3xl -> text-2xl lg:text-3xl
# Keep text-slate-300 contrast
html = html.replace('text-slate-400', 'text-slate-300') 
# Re-replace for specific cases if needed, but let's be careful globally replacing text-slate-400.
# Let's target the stats specifically:
stats_block_old = r'<div class="flex flex-col gap-1">\s*<span class="font-bold text-2xl md:text-3xl text-white">35 年\+</span>\s*<span class="text-\[14px\] text-slate-400">專業成型經驗</span>\s*</div>'
stats_block_new = r'''<div class="flex flex-col gap-1 bg-white/5 p-4 sm:p-0 sm:bg-transparent rounded-md border border-white/10 sm:border-transparent">
            <span class="font-bold text-2xl lg:text-[32px] text-white">35 年+</span>
            <span class="text-[14px] text-slate-300">專業成型經驗</span>
          </div>'''
html = re.sub(stats_block_old, stats_block_new, html)

stats_block_old2 = r'<div class="flex flex-col gap-1">\s*<span class="font-bold text-2xl md:text-3xl text-white">250T - 500T</span>\s*<span class="text-\[14px\] text-slate-400">完整機台噸位</span>\s*</div>'
stats_block_new2 = r'''<div class="flex flex-col gap-1 bg-white/5 p-4 sm:p-0 sm:bg-transparent rounded-md border border-white/10 sm:border-transparent">
            <span class="font-bold text-2xl lg:text-[32px] text-white">250T - 500T</span>
            <span class="text-[14px] text-slate-300">完整機台噸位</span>
          </div>'''
html = re.sub(stats_block_old2, stats_block_new2, html)

stats_block_old3 = r'<div class="flex flex-col gap-1 col-span-2 sm:col-span-1">\s*<span class="font-bold text-2xl md:text-3xl text-white">一站式</span>\s*<span class="text-\[14px\] text-slate-400">從試作到量產加工</span>\s*</div>'
stats_block_new3 = r'''<div class="flex flex-col gap-1 bg-white/5 p-4 sm:p-0 sm:bg-transparent rounded-md border border-white/10 sm:border-transparent">
            <span class="font-bold text-2xl lg:text-[32px] text-white">一站式</span>
            <span class="text-[14px] text-slate-300">從試作到量產加工</span>
          </div>'''
html = re.sub(stats_block_old3, stats_block_new3, html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

