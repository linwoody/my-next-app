# Next.js + MongoDB 專案開發日誌

本專案旨在建立一個基於 Next.js 的簡單資料庫操作系統，包含使用者資料的增刪改查與分頁功能。

## 1. 資料庫配置 (Database Configuration)
配置了與 MongoDB 的連線設定，確保開發與生產環境的穩定性。

- **環境變數**: 在 `.env.local` 設定 `MONGODB_URI=mongodb://127.0.0.1:27017/my_next_app`。 
- **連線工具 (`src/lib/mongodb.js`)**: 採用 **單例模式 (Singleton Pattern)**。

## 2. API 路由 (API Routes)

### 數據總覽與新增 (`src/app/api/data/route.js`)
- **POST 方法**: 接收 JSON 並存入 `test_collection`。
- **GET 方法 (Updated)**:
    - 支援 **分頁功能 (Pagination)**。
    - 根據 `page` 與 `limit` 參數過濾數據。
    - 返回數據總數、總頁數等分頁資訊。

### 特定數據與動態路由 (`src/app/api/data/[id]/route.js`)
- **GET 方法**: 取得特定 ID 的詳細內容。
- **PATCH 方法**: 支援更新特定欄位 (`name`) 或訊息 (`message`)。
- **DELETE 方法**: 刪除特定 ID 的數據。

## 3. 前端頁面與組件 (Frontend Pages & Components)

### 詳情頁與動態路由 (`src/app/data/[id]`)
- **詳情頁 (`page.js`)**: 顯示所有欄位資訊，並提供「返回」與「編輯」入口。
- **編輯頁 (`edit/page.js`) (New)**:
    - 獨立的編輯路由。
    - 使用 `EditForm` 組件預填原始數據。
    - 點擊儲存後調用 `PATCH` 更新資料庫。

### 首頁功能 (`src/app/page.js`)
- **數據新增表單**: 整合 `UserForm`。
- **分頁組件 (`Pagination.js`) (New)**:
    - 提供「上一頁/下一頁」導航。
    - 顯示當前頁碼與總頁數。
    - 自動計算每頁顯示數量 (5 筆) 並對應 API。
- **數據列表**: 顯示所有使用者並提供刪除功能。

---

## 已完成開發清單
- [x] 本地 MongoDB 連線與 CRUD (Create, Read, Update, Delete)。
- [x] 動態路由與 Server Component 數據獲取。
- [x] 視覺優化與 CSS 模組化。
- [x] 分頁功能 (Pagination)。
- [x] 獨立的數據編輯頁面功能。

## 4. 環境變數重構與安全優化 (Environment Variables & Refactoring) - 2026/02/22

### 環境變數管理
- **.env 檔案配置**:
    - 設定 `MONGODB_URI` 儲存 Atlas 連線字串。
    - 設定 `MONGODB_DB` 統一管理資料庫名稱（預設為 `my_next_app`）。
- **.gitignore**: 確保 `.env*` 檔案不會被提交到 Git，保護敏感資訊。

### 資料庫連線優化 (src/lib/mongodb.js)
- **Singleton 模式升級**: 採用 Next.js 推薦的開發環境 Singleton 模式，解決 HMR（熱更新）導致的 MongoDB 連線堆積問題。
- **錯誤處理**: 增強連線失敗時的錯誤提示（Connection Timeout 與 Atlas 連線錯誤）。

### 全域重構與移除硬編碼 (Refactoring & De-hardcoding)
- **API 路由同步**: `src/app/api/data/route.js` 與 `src/app/api/data/[id]/route.js` 全面改用 `process.env.MONGODB_DB`。
- **頁面組件同步**:
    - `Home` (`src/app/page.js`)
    - `Data Detail` (`src/app/data/[id]/page.js`)
    - `Edit Page` (`src/app/data/[id]/edit/page.js`)
    - 以上頁面皆已移除硬編碼的資料庫名稱。
- **安全修補 - About Page**:
    - 重寫 `src/app/about/page.js`。
    - 移除原本硬編碼在程式碼中的 MongoDB 密碼與 URI。
    - 改為引用 `src/lib/mongodb.js` 提供的 `clientPromise`。
