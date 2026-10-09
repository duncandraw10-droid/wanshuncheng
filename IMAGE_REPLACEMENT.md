# 圖片維護

`public/images/` 只保留目前正式頁面使用的資產。網站已使用公司提供的圖片，沒有「示意圖」佔位素材。

- 一般照片使用 WebP；Topbar、開場、隱私政策與企業資料使用 `logo-topbar.png`；Footer 使用 `logo-footer.png`，透明 Logo 為 PNG，請保留其透明度與色彩處理。
- 首屏 Hero 圖保留優先載入設定；下方案例、工廠與設備圖片保留 `loading="lazy"`、`decoding="async"` 及尺寸資訊。
- 更換 `<picture>` 時，同步更新 `<source srcset>`、`<img src>` 及圖片放大按鈕的 `data-photo`／`data-photo-webp`，並核對 `alt` 與品項名稱。
- 設備圖片需同步核對對應分頁與預載入的 `data-img-webp`。機台仍以 contain 置中呈現。
- 工廠雙全景使用同一張圖的上下裁切，不要改變 `factory-view`、`factory-photo-upper`／`factory-photo-lower` 比例設定。
- 手機案例圖片使用 1:1 容器與 object-fit: cover，不拉伸原圖；桌機保留既有漸層介紹效果。
- 分享圖片與企業 Logo 使用正式網址 `https://wsctw.com/images/...`，更換檔名時也要檢查 `<head>`。

不要直接修改 `dist/`；修改來源檔案後重新執行建置。
