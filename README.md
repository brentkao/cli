# 🧰 MyCLI - 跨平台 CLI 工具範本

這是一個使用 TypeScript 開發的 CLI 工具模板，支援 Windows / macOS，並提供互動式選單與單指令模式。

---

## 🚀 使用方式（for 使用者）

請前往 [Releases](https://github.com/brentkao/cli/releases) 下載對應平台壓縮檔：

| 平台 | 下載檔案 | 使用方式 |
|------|----------|----------|
| 🪟 Windows | `cli-win.zip` | 解壓後：點 `launchers/win/start.bat` |
| 🍎 macOS   | `cli-macos.zip` | 解壓後：點 `launchers/mac/start.command` |

---

## 🧩 安裝 / 移除 CLI 到全域

| 平台 | 動作      | 操作方式                          |
|------|-----------|-----------------------------------|
| 🪟 Windows | 安裝 | 點 `launchers/win/install.bat`    |
| 🪟 Windows | 移除 | 點 `launchers/win/uninstall.bat`  |
| 🍎 macOS   | 安裝 | 點 `launchers/mac/install.command` |
| 🍎 macOS   | 移除 | 點 `launchers/mac/uninstall.command` |

🧪 安裝後可直接在終端機輸入 `mycli` 使用！

---

## 👨‍💻 開發者使用

```bash
npm install               # 安裝依賴
npm run dev -- help       # 使用 ts-node 測試 CLI 指令
npm run build             # 編譯 TypeScript 至 dist/
npm run pkg:all           # 打包成可執行檔（mac/win/linux）
npm run make-launchers    # 生成啟動與安裝腳本
npm run release:build     # 一鍵打包 + 產生所有平台腳本
```

## 專案結構
```
bin/
├── cli.ts
src/
├── core/
│   ├── configService.ts       ←  ✨ 儲存與讀取 ~/.cli/config.json 的工具
│   └── playerApi.ts           ←  處理 API 呼叫，例如 fetchAllPlayers 等
│
├── handlers/
│   └── xxxHandler.ts          ←  功能執行邏輯，例如實際去呼叫 API
│
├── menus/
│   ├── mainMenu.ts            ←  主選單，選擇「設定環境」、「功能」等
│   ├── envMenu.ts             ←  環境設定（dev/staging/prod）
│   ├── serviceMenu.ts         ←  選擇要操作的服務（例如 money-service）
│   ├── featureMenu.ts         ←  選擇操作功能（如 fetchPlayerInfo）
│   └── pickerMenu.ts          ←  🚧（待擴充）泛用選擇器
│
├── types/
│   └── config.ts              ←  設定檔類型定義（如 env, service, feature）
│
└── index.ts                   ←  CLI 進入點，初始化 config + 執行 mainMenu()

```