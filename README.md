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
