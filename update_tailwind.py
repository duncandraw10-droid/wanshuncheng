with open('tailwind.config.js', 'r') as f:
    content = f.read()

content = content.replace("'primary': '#155EA8'", "'primary': '#2563EB'")
content = content.replace("'primary-hover': '#104985'", "'primary-hover': '#1D4ED8'")
content = content.replace("'dark-bg': '#0B1728'", "'dark-bg': '#172B46'")
content = content.replace("'surface': '#F3F5F7'", "'surface': '#F8FAFC'")

with open('tailwind.config.js', 'w') as f:
    f.write(content)
