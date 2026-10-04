import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_copy = r"""window.copyToClipboard = async function\(text\) \{.*?\}

window.copyTemplate = async function\(\) \{.*?\}"""

new_copy = """window.copyToClipboard = async function(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('已複製！');
  } catch (err) {
    showToast('複製失敗，請手動複製：' + text);
  }
}

window.copyTemplate = async function() {
  const template = `您好，我們有模壓成型的需求，請協助評估：

1. 產品用途與尺寸：
2. 材料需求（如已知）：
3. 預計數量：
4. 是否已有模具：
5. 希望交期：

（備註：將隨信附上圖面或產品照片）`;
  try {
    await navigator.clipboard.writeText(template);
    showToast('已複製！');
  } catch (err) {
    showToast('複製失敗，請手動複製。');
  }
}"""

js = re.sub(old_copy, new_copy, js, flags=re.DOTALL)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
