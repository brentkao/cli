import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const baseDir = path.join(__dirname, "..");
const releaseDir = path.join(baseDir, "release");
const launcherDir = path.join(baseDir, "launchers");
const macDir = path.join(launcherDir, "mac");
const winDir = path.join(launcherDir, "win");

// macOS scripts
const macScripts = {
  "start.command": `#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"
osascript -e 'tell application "Terminal" to do script "'"$DIR/../../release/cli-macos"'"'
`,
  "install.command": `#!/bin/bash
TARGET="/usr/local/bin/mycli"
SOURCE="$(cd "$(dirname "$0")" && pwd)/../../release/cli-macos"

echo "🔧 Installing mycli..."
sudo cp "$SOURCE" "$TARGET"
sudo chmod +x "$TARGET"
echo "✅ Installed as 'mycli'"
`,
  "uninstall.command": `#!/bin/bash
TARGET="/usr/local/bin/mycli"

echo "🗑️ Uninstalling mycli..."
sudo rm -f "$TARGET"
echo "✅ Uninstalled"
`,
};

// Windows scripts
const winScripts = {
  "start.bat": `@echo off
start cmd /k "%~dp0\\..\\..\\release\\cli-win.exe"
`,
  "install.bat": `@echo off
set CLI_NAME=mycli
set CLI_SOURCE=%~dp0\\..\\..\\release\\cli-win.exe
set CLI_TARGET=%ProgramData%\\mycli

echo Installing %CLI_NAME%...
mkdir "%CLI_TARGET%" >nul 2>&1
copy "%CLI_SOURCE%" "%CLI_TARGET%\\%CLI_NAME%.exe" >nul
echo ✅ Installed. Use: %CLI_TARGET%\\%CLI_NAME%.exe
`,
  "uninstall.bat": `@echo off
set CLI_NAME=mycli
set CLI_TARGET=%ProgramData%\\mycli

echo Uninstalling %CLI_NAME%...
del "%CLI_TARGET%\\%CLI_NAME%.exe" >nul
rmdir "%CLI_TARGET%" >nul 2>&1
echo ✅ Uninstalled.
`,
};

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function createFile(
  dir: string,
  name: string,
  content: string,
  makeExecutable = false
) {
  const filePath = path.join(dir, name);
  fs.writeFileSync(filePath, content, { encoding: "utf-8" });
  if (makeExecutable) {
    execSync(`chmod +x "${filePath}"`);
  }
  console.log(`✅ Created: ${filePath}`);
}

function main() {
  ensureDir(macDir);
  ensureDir(winDir);

  for (const [name, content] of Object.entries(macScripts)) {
    createFile(macDir, name, content, true);
  }

  for (const [name, content] of Object.entries(winScripts)) {
    createFile(winDir, name, content, false);
  }
}

main();
