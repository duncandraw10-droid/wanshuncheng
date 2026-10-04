import re

with open("index.html", "r") as f:
    content = f.read()

pattern = re.compile(r'<!-- Contact Section -->.*?</main>', re.DOTALL)
match = re.search(pattern, content)
if match:
    print(match.group(0))
