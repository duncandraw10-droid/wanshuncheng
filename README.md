# 萬順承實業網站

正式網站：https://wsctw.com/

Bootstrap 5、原生 JavaScript 與 Vite 靜態網站，沒有線上詢價收件後端。

## 開發與發佈

```sh
npm install
npm run dev
npm test
npm run build
```

`dist/` 為自動產生的發佈內容，不要直接修改。推送 `main` 後，GitHub Actions 執行測試、建置及 GitHub Pages 發佈。正式網域由 GitHub Pages 設定管理。

## 檔案分工

| 檔案 | 用途 |
| --- | --- |
| `index.html` | 首頁資訊、SEO／分享標籤、企業結構化資料與 GA4 設定 |
| `privacy.html` | 隱私說明 |
| `404.html` | 找不到頁面的返回入口 |
| `src/styles.css` | 品牌色彩、字級、按鈕、Logo 與 Hero 動畫 |
| `src/page-layout.css` | 各區塊排版、圖片比例與 RWD |
| `src/main.js` | 開場／Hero 及各功能模組初始化 |
| `src/navigation.js` | 手機導覽、目前區塊提示、捲動顯示與數字遞增 |
| `src/media.js` | 設備分頁、圖片放大與關閉 |
| `src/portfolio.js` | 案例切換、介紹展開及自動輪播 |
| `src/contact.js` | 複製、提示訊息、準備資料與聯絡操作事件追蹤 |
| `public/images/` | 正式頁面實際使用的圖片 |
| `public/vendor/bootstrap/` | 本機 Bootstrap CSS／JS |
| `public/fonts/` | 本機圖示字型 |
| `tests/` | 輪播行為的回歸測試 |

## 必須保留的行為

- 導覽順序：承製案例、設備能力、關於萬順承、製造能力、合作流程、聯絡詢價。
- Logo 使用現有資產；Topbar 與開場透過 CSS 呈現品牌藍，Footer 保留白色圖稿。
- 開場約 1.3 秒，回訪及深層連結略過；減少動態效果設定會停用開場與自動輪播。
- Hero 三張主視覺的主要詢價入口固定為 `#contact`。
- 案例：桌機三張，平板約 1.2 張，手機一張且圖片維持正方形。每 4 秒自動前進，到最後一組回到開始；保留左右切換，滑鼠停留、鍵盤閱讀、展開介紹、圖片放大、離開區塊或切換分頁時停留。不顯示獨立的開始／暫停按鈕。
- 設備採 Bootstrap Tab／Pill，保留 250T、400T、500T 的圖片與介紹；手機才顯示圖片下方介紹。
- 三個公司數據以 Intersection Observer 觸發，1.8 秒遞增一次。
- 聯絡區保留三欄等寬等高、電話等距、按鈕群組置中與所有電話／Email 連結。
- Footer 桌機導覽三欄兩列，左右間距 72px、上下間距 20px，整組靠右；手機維持雙欄排列。

## 追蹤與資料

GA4：`G-B4193HZQEP`。僅正式網域及原 GitHub Pages 網域會啟用設定與聯絡事件；本機測試不送出事件。聯絡事件為 `contact_click`、`contact_copy`、`inquiry_cta_click`，僅包含操作方法、位置與動作，不包含訪客聯絡資料或郵件內文。GA4 後台轉換設定需另外管理。

詢價透過 `tel:`、`mailto:` 或複製資料；目前沒有站內表單送出服務。請勿加入無法收件的送出按鈕或未確認的設備規格。

圖片更新請參閱 `IMAGE_REPLACEMENT.md`；視覺規範請參閱 `DESIGN.md`。
