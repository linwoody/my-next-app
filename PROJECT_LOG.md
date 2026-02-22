# Next.js + MongoDB 專案開發紀錄

本文件紀錄了專案中已實作的功能、檔案結構與技術細節。

## 1. 資料庫配置 (Database Configuration)
實作了本地 MongoDB 的連接方案，確保開發環境下的效能與穩定性。

- **環境變數**: 於 `.env.local` 設定 `MONGODB_URI=mongodb://127.0.0.1:27017/my_next_app`。
- **連接工具 (`src/lib/mongodb.js`)**: 採用 **單例模式 (Singleton Pattern)**。

## 2. API 路由 (API Routes)

### 基礎資料操作 (`src/app/api/data/route.js`)
- **POST 方法**: 接收 JSON 並儲存至 `test_collection`。
- **GET 方法 (Updated)**: 
    - 支援 **分頁讀取 (Pagination)**。
    - 接受 `page` 與 `limit` 查詢參數。
    - 回傳資料列表與分頁元數據（總頁數、總筆數）。

### 動態資料查詢與管理 (`src/app/api/data/[id]/route.js`)
- **GET 方法**: 讀取特定文件內容。
- **PATCH 方法**: 支援部分更新姓名 (`name`) 或訊息 (`message`)。
- **DELETE 方法**: 永久刪除特定資料。

## 3. 前端頁面與組件 (Frontend Pages & Components)

### 動態詳情與編輯 (`src/app/data/[id]`)
- **詳情頁面 (`page.js`)**: 顯示用戶完整資訊，並提供「返回」與「編輯」入口。
- **編輯頁面 (`edit/page.js`) (New)**: 
    - 獨立的編輯路由。
    - 使用 `EditForm` 組件預載原有資料。
    - 提交後透過 `PATCH` 更新資料庫。

### 強化版首頁 (`src/app/page.js`)
- **新增資料表單**: 整合 `UserForm`。
- **分頁控制 (`Pagination.js`) (New)**: 
    - 實作「上一頁/下一頁」按鈕。
    - 顯示目前頁碼與總頁數。
    - 當資料量超過每頁上限 (5 筆) 時自動顯示。
- **資料列表**: 支援快速刪除與連結至詳情頁。

---

## 已完成功能總結
- [x] 本地 MongoDB 連接與 CRUD (Create, Read, Update, Delete)。
- [x] 動態路由與 Server Component 數據讀取。
- [x] 漂亮的 CSS 樣式與動畫效果。
- [x] 分頁功能 (Pagination)。
- [x] 獨立的資料編輯頁面。
