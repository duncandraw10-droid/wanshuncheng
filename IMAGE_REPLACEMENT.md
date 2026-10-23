# 圖片維護

`public/images/` 只保留正式頁面使用的資產，包含既有產品／設備圖片、核准的作業情境圖與製程概念圖。作業情境圖不作為設備尺寸、檢驗結果或實際案例成果的證明。

- 一般照片使用 WebP；Topbar、開場、隱私政策與企業資料使用 `logo-topbar.png`；Footer 使用 `logo-footer.png`，透明 Logo 為 PNG，請保留其透明度與色彩處理。
- 首屏 Hero 圖保留優先載入設定；下方案例、工廠與設備圖片保留 `loading="lazy"`、`decoding="async"` 及尺寸資訊。
- 更換 `<picture>` 時，同步更新 `<source srcset>`、`<img src>` 及圖片放大按鈕的 `data-photo`／`data-photo-webp`，並核對 `alt` 與品項名稱。
- 設備圖片需同步核對對應分頁與預載入的 `data-img-webp`。機台仍以 contain 置中呈現。
- 工廠雙全景使用同一張圖的上下裁切，不要改變 `factory-view`、`factory-photo-upper`／`factory-photo-lower` 比例設定。
- 手機案例圖片使用 1:1 容器與 object-fit: cover，不拉伸原圖；桌機保留既有漸層介紹效果。
- 分享圖片與企業 Logo 使用正式網址 `https://wsctw.com/images/...`，更換檔名時也要檢查 `<head>`。
- 製造能力的 `manufacturing-*`、品質管理的 `quality-incoming-review`／`quality-dimension-check`／`quality-final-inspection`／`quality-record-linkage`，以及案例評估的 `case-*` 共 11 張圖片，使用核准版本輸出為 1440 × 1080 WebP；480／960px 版本位於 `responsive/`。PNG 原稿與製作紀錄保存在專案外，不隨網站發佈。
- 新增三區圖片完整顯示為 4:3，使用共用 `.section-photo`；不套用首頁輪播的正方形裁切。箱體特寫與板件放大窗來自同一主圖裁切，更換時需一起核對。

不要直接修改 `dist/`；修改來源檔案後重新執行建置。
