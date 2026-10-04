import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the buttons for 250T, 400T, 500T
def replace_main_equipment(match):
    # match.group(1) is the delay class e.g. "delay-0"
    delay_class = match.group(1)
    # match.group(2) is the tonnage e.g. "250T"
    tonnage = match.group(2)
    # match.group(3) is the image tag
    img_tag = match.group(3)
    
    return f"""<div class="reveal {delay_class} bg-slate-100 rounded-md border border-slate-200 overflow-hidden relative w-full p-0">
          <div class="absolute top-3 left-3 bg-dark-bg/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-sm shadow-sm z-10">{tonnage}</div>
          {img_tag}
        </div>"""

# Match the <button> ... </button> block
pattern = r'<button onclick="openModal\([^\)]+\)" class="reveal (delay-\d+) text-left bg-slate-100 rounded-md border border-slate-200 overflow-hidden relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-full p-0">\s*<div class="absolute top-3 left-3 bg-dark-bg/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-sm shadow-sm z-10">(.*?)</div>\s*<div class="absolute bottom-3 right-3[^>]+>.*?</div>\s*(<img[^>]+>)\s*</button>'

html = re.sub(pattern, replace_main_equipment, html, flags=re.DOTALL)

# Replace the Aux Equipment button
aux_pattern = r'<button onclick="openModal\([^\)]+\)" class="text-left w-full md:w-1/3 aspect-\[4/3\] md:aspect-auto bg-slate-100 shrink-0 relative overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset">\s*<div class="absolute bottom-3 right-3[^>]+>.*?</div>\s*(<img[^>]+>)\s*</button>'

def replace_aux_equipment(match):
    img_tag = match.group(1)
    return f"""<div class="w-full md:w-1/3 aspect-[4/3] md:aspect-auto bg-slate-100 shrink-0 relative overflow-hidden">
          {img_tag}
        </div>"""

html = re.sub(aux_pattern, replace_aux_equipment, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
