import re

with open('src/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

new_animations = """  @keyframes hero-fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-animate {
    opacity: 0;
    animation: hero-fade-in-up 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
  
  @keyframes geo-mask-slide {
    from {
      transform: translateX(-10%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .hero-geo-animate {
    opacity: 0;
    animation: geo-mask-slide 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .slant-cut {
    clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
  }
  
  .slant-cut-line {
    clip-path: polygon(100% 0, 100% 0, 0 100%, 0 100%);
  }"""

css = re.sub(r'@keyframes hero-fade-in-up.*?\.hero-geo-animate\s*\{[^}]*\}', new_animations, css, flags=re.DOTALL)

# Let's just rewrite the whole file cleanly to ensure no leftovers.
