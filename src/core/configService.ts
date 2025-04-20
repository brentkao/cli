import fs from "fs";
import os from "os";
import path from "path";
import { CliConfig, DeepPartial, DeepPartialCliConfig } from "../types/config";
import { Env } from "../types/enums";
import inquirer from "inquirer";
import chalk from "chalk";

const DIR_PATH = path.join(os.homedir(), ".parazeni-cli"); // ⬅ 改這裡
const CONFIG_PATH = path.join(DIR_PATH, "config.json"); // ⬅ config.json 路徑
const DEFAULT_CONFIG: CliConfig = {
  env: Env.DEV,
  domains: {
    [Env.DEV]: "",
    [Env.CIT]: "",
    [Env.STG]: "",
    [Env.PROD]: "",
  },
  service: "",
  feature: "",
  user: {
    id: "",
    token: "",
  },
};

export function ensureConfigFileExists() {
  if (!fs.existsSync(DIR_PATH)) {
    fs.mkdirSync(DIR_PATH);
  }
  if (!fs.existsSync(CONFIG_PATH)) {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(DEFAULT_CONFIG, null, 2));
  }
}

export function loadConfig(): CliConfig {
  ensureConfigFileExists();
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
}

function saveConfig(config: CliConfig) {
  ensureConfigFileExists();
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

function deepMerge<T>(target: T, source: DeepPartial<T>): T {
  const output: any = Array.isArray(target) ? [...target] : { ...target };
  const src: any = source;

  for (const key in src) {
    if (
      typeof src[key] === "object" &&
      src[key] !== null &&
      !Array.isArray(src[key])
    ) {
      output[key] = deepMerge(output[key] ?? {}, src[key]);
    } else {
      output[key] = src[key];
    }
  }

  return output;
}


export function updateConfig(partial: DeepPartialCliConfig) {
  const current = loadConfig();
  const merged = deepMerge<CliConfig>(current, partial);
  const completed: CliConfig = deepMerge(DEFAULT_CONFIG, merged);
  saveConfig(completed);
}

export async function resetConfig() {
  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "⚠️ 你確定要重設所有設定嗎？此動作無法復原。",
      default: false,
    },
  ]);

  if (confirm) {
    updateConfig(DEFAULT_CONFIG);
    console.log(chalk.yellow("✅ 設定已重置為預設狀態"));
  } else {
    console.log(chalk.gray("取消重設設定。"));
  }
}
