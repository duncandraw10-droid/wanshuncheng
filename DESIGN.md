# 現行視覺規範

實際樣式以 `src/styles.css` 與 `src/page-layout.css` 為準；這份文件記錄已確認的呈現方式。

## 色彩

| Token | 色碼 | 用途 |
| --- | --- | --- |
| `--brand-navy`／`--text-primary` | #172B46 | 標題、內文主色、深色背景 |
| `--brand-blue` | #2563EB | 品牌 Logo、主要操作、互動狀態 |
| `--text-secondary` | #526174 | 說明文字 |
| `--surface-white`／`--text-on-dark` | #FFFFFF | 白色背景與深底文字 |
| `--surface-subtle` | #F4F6F8 | 區塊底色 |
| `--border-default` | #D7DEE7 | 一般分隔線 |
| `--border-control` | #7B8798 | 操作元件邊框 |
| `--text-muted-on-dark` | #CBD5E1 | 深底次要文字 |

品牌 Token 對應 Bootstrap 的色彩變數。Logo 的透明形狀、裁切與品牌顏色設定需一起保留。

## 字級與文字

字型：Noto Sans TC、Inter、system-ui。Google Fonts 合併為一次 CSS 請求，含兩個 preconnect 與 display=swap。圖示使用本機 Material Symbols 子集；新增未包含的圖示應使用 inline SVG。

| 用途 | 桌機 ≥992px | 小螢幕 |
| --- | --- | --- |
| Hero 標題 | 48–56px／700／1.2 | 32–36px／700／1.2 |
| 區塊標題 | 35px／700／1.4 | 28–32px／700／1.4 |
| 子標題 | 24px／600／1.5 | 20px／600／1.5 |
| 正文 | 18px／400 | 16px／400 |
| 小字 | 14px／400 | 14px／400 |

全站區塊標題 `.section-heading` 字距統一為 `0em`。

正文一般行高 1.8；製造能力、合作流程及設備介紹 1.65，電話資訊 1.5，Footer 資訊桌機 1.6／手機 1.2；手機資訊列及連結最小高度 32px，列間距 8px。Hero CTA 文字與 SVG 箭頭整組置中，桌機寬度 174px。

## 排版與互動

- 桌機內容容器最大 1440px；內距 40px，≥1200px 時 80px；手機一般內距 24px。
- 七個主要內容區塊與 Footer 統一上下內距：桌機 ≥992px 各 96px，小螢幕 <992px 各 56px；Footer 底部另保留裝置安全區。Hero 維持原有視窗高度與控制元件的預留空間。
- 主要內容區塊的標題與說明文字統一靠左，對齊內容容器左緣；案例卡片仍保留兩側箭頭空間。
- 獨立標題區到內容的距離：桌機 48px、手機 32px；案例輪播外框內距計入此距離。「關於萬順承」桌機保留標題與介紹並排，手機堆疊時採 32px 間距。
- 製造能力與合作流程的小標題行高 1.4、正文行高 1.65，標題到正文 8px。合作流程保留四步驟：≥1200px 四欄、768–1199px 兩欄、<768px 單欄；欄距 24px／≥1200px 48px，手機步驟文字間隔 40px。
- 案例手機圖片 1:1，設備圖片使用 contain，不裁掉機台輪廓。
- 詢價準備資料清單項目間距：<992px 為 6px，桌機 ≥992px 為 8px；文字行高及每項最小高度 44px 維持原設定。
- Footer 三欄兩列的文字行高保持 1.5，列距 20px、欄距 72px，整組靠右。
- 膠囊按鈕採完整圓角；案例與設備按鈕 12px，設備圖片卡片 16px。
- 動畫為漸層、淡入、上下小幅位移；依 prefers-reduced-motion 停用自動輪播與主要動畫。

## 操作字重與共用 Token

主要操作使用 `.cta-primary`／`--weight-cta: 600`，包括聯絡詢價、討論產品需求、開始詢價、撥打手機、開啟郵件及 Footer 聯絡我們。次要操作使用 `.cta-secondary`／`--weight-secondary-action: 500`，包括 Hero 次要連結、複製操作與外框按鈕；不要再加會衝突的 `fw-*` 類別。

| 行高 Token | 值 | 使用情境 |
| --- | --- | --- |
| `--leading-solid` | 1 | 圖示、Hero 按鈕文字群組 |
| `--leading-tight` | 1.2 | Hero 標題、手機 Footer 資訊 |
| `--leading-stat` | 1.3 | 公司數據 |
| `--leading-card-title` | 1.35 | 設備卡片標題 |
| `--leading-heading` | 1.4 | 區塊標題 |
| `--leading-ui` | 1.5 | 操作與電話資訊 |
| `--leading-footer` | 1.6 | 桌機 Footer 資訊 |
| `--leading-compact-copy` | 1.65 | 設備、製造能力與合作流程說明 |
| `--leading-body` | 1.8 | 一般正文 |
| `--leading-company` | 1.9 | 公司介紹 |

圓角命名為 `inline: 4px`、`soft: 8px`、`card: 12px`、`panel: 16px`、`pill: 999px`、`circle: 50%`，使用 `--radius-*`，並對應適用的 Bootstrap 圓角變數。

間距使用 `--space-*`，尺度為 4、8、12、16、20、24、28、32、40、48、56、64、72、80、96px。區塊上下內距由 `--layout-space` 引用 56／96；標題間距由 `--section-heading-gap` 引用 32／48。保留機台透明邊界的逐張視覺校正內距，避免共用尺度使機台偏移。

Hero 桌機主按鈕寬度由 `--hero-cta-width: 174px` 管理；桌機案例高度及手機文字區預留高度分別由 `--portfolio-card-height: 540px`、`--portfolio-caption-reserve: 168px` 管理。不要重新追加舊的 204px 最小寬度覆寫。

## Logo 正式資產

- Topbar、開場動畫、隱私政策頁及企業結構化資料統一使用 `logo-topbar.png`。
- 藍色 Logo 使用透明遮罩呈現 `--brand-blue`，短版圖形採同一裁切比例；Footer 保留白色完整名稱的 `logo-footer.png`。
- 開場 Logo 寬度為 `clamp(176px, 18vw, 259px)`，維持上一版可見圖形的大小；圖形比例為 416／77。
- 開場副標題以 Bootstrap `mt-1` 與 Logo 間隔 4px。
- 舊 `logo.webp` 已無正式頁面引用並移除。
