import fs from "fs";
import path from "path";
import { loadConfig, updateConfig } from "../core/configService";
import chalk from "chalk";
import inquirer from "inquirer";

const EXPORT_PATH = path.resolve(process.cwd(), "cli-config-export.json");

export function viewConfig() {
  const config = loadConfig();
  console.log(chalk.cyanBright("\n📦 目前設定內容："));
  console.log(JSON.stringify(config, null, 2));

  return;
}

export async function updateUid() {
  const { uid } = await inquirer.prompt([
    {
      type: "input",
      name: "uid",
      message: "輸入你的 uid",
    },
  ]);
  updateConfig({ user: { id: uid } });
  console.log(chalk.green(`✅ 使用者 UID 已更新為 ${uid}`));
}

export function exportConfig() {
  const config = loadConfig();
  fs.writeFileSync(EXPORT_PATH, JSON.stringify(config, null, 2));
  console.log(chalk.blueBright(`✅ 設定已匯出至 ${EXPORT_PATH}`));
  console.log(chalk.cyan("📤 設定已成功匯出！"));
  console.log(`✅ 儲存路徑 ✏️ ${chalk.blueBright(EXPORT_PATH)}`);
}

export async function importConfig(): Promise<void> {
  const { filePath } = await inquirer.prompt([
    {
      type: "input",
      name: "filePath",
      message: "請輸入要匯入的設定檔 JSON 路徑：",
    },
  ]);

  if (!fs.existsSync(filePath)) {
    console.error(chalk.red(`❌ 找不到檔案：${filePath}`));
    return;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(raw);

    if (typeof json !== "object" || !json.env || !json.user) {
      console.error(chalk.red("❌ 匯入失敗：JSON 結構不正確"));
      return;
    }

    updateConfig(json);
    console.log(chalk.magenta("✅ 匯入成功，路徑：") + chalk.cyan(filePath));
  } catch (err) {
    console.error(chalk.red("❌ 匯入失敗：請確認 JSON 格式是否正確"));
  }
}
