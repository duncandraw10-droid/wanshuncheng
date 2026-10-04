import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

bad_code = r"""  } catch \(err\) \{
    showToast\('複製失敗，請手動複製。'\);
  \}
\} catch \(err\) \{
    showToast\('複製失敗，請手動複製範本。'\);
  \}
\}"""

good_code = """  } catch (err) {
    showToast('複製失敗，請手動複製。');
  }
}"""

js = re.sub(bad_code, good_code, js)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
