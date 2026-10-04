import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Header Glassmorphism
html = html.replace('bg-dark-bg/80 backdrop-blur-md border-b border-white/10', 'bg-dark-bg/70 backdrop-blur-lg border-b border-white/5')

# 2. Hero animation
# add an inline style animation for the hero image to slowly zoom in
html = html.replace('scale-100 opacity-40 transition-transform duration-[15000ms] ease-out hover:scale-[1.025]', 'opacity-40 animate-[kenBurns_20s_ease-out_forwards]')

# 3. Capability cards
old_cap = 'bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-primary/40 transition-all'
new_cap = 'bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/40 transition-all duration-300 group'
html = html.replace(old_cap, new_cap)
html = html.replace('text-primary text-3xl mb-4"', 'text-primary text-3xl mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300"')

# 4. Equipment cards
html = html.replace('bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"', 'bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"')
html = html.replace('bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow', 'bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300')
html = html.replace('bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-8 items-center', 'bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-8 items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300')

# 5. Workflow cards
html = html.replace('relative bg-slate-50 border border-slate-200 rounded-xl p-6"', 'relative bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl p-6 group"')
html = html.replace('absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold font-mono text-lg shadow-md"', 'absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold font-mono text-lg shadow-md group-hover:bg-primary-hover group-hover:scale-110 transition-all duration-300"')

# 6. About section dark card
html = html.replace('bg-slate-800/50 rounded-lg p-6 border border-slate-700 max-w-sm mx-auto', 'bg-slate-800/40 backdrop-blur-lg rounded-lg p-6 border border-slate-700/50 shadow-2xl max-w-sm mx-auto hover:bg-slate-800/60 transition-colors')

# 7. Contact cards
html = html.replace('hover:border-primary/50 hover:bg-blue-50/50 transition-all group', 'hover:border-primary/50 hover:bg-blue-50/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group')
html = html.replace('hover:border-emerald-500/50 hover:bg-emerald-50/50 transition-all group', 'hover:border-emerald-500/50 hover:bg-emerald-50/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
