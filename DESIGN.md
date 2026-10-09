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

正文一般行高 1.8；製造能力及設備介紹 1.65，電話資訊 1.5，Footer 資訊桌機 1.6／手機 1.2；手機資訊列及連結最小高度 32px，列間距 8px。Hero CTA 文字與 SVG 箭頭整組置中，桌機寬度 174px。

## 排版與互動

- 桌機內容容器最大 1440px；內距 40px，≥1200px 時 80px；手機一般內距 24px。
- 區塊一般上下距離：桌機 96px／手機 56px；製造能力 48–72px，聯絡區桌機 72px，Footer 桌機 56px。
- 案例手機圖片 1:1，設備圖片使用 contain，不裁掉機台輪廓。
- Footer 三欄兩列的文字行高保持 1.5，列距 20px、欄距 72px，整組靠右。
- 膠囊按鈕採完整圓角；案例與設備按鈕 12px，設備圖片卡片 16px。
- 動畫為漸層、淡入、上下小幅位移；依 prefers-reduced-motion 停用自動輪播與主要動畫。
