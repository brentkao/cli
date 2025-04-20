import fs from "fs";
import os from "os";
import path from "path";
import { CliConfig } from "../types/config";
import { Env } from "../types/enums";

const DIR_PATH = path.join(os.homedir(), ".parazeni-cli"); // ⬅ 改這裡
const CONFIG_PATH = path.join(DIR_PATH, "config.json"); // ⬅ config.json 路徑

export function ensureConfigFileExists() {
  if (!fs.existsSync(DIR_PATH)) {
    fs.mkdirSync(DIR_PATH);
  }
  if (!fs.existsSync(CONFIG_PATH)) {
    const defaultConfig: Partial<CliConfig> = {
      env: Env.DEV,
      service: "",
      feature: "",
    };
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(defaultConfig, null, 2));
  }
}

export function loadConfig(): Partial<CliConfig> {
  ensureConfigFileExists();
  const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
  return JSON.parse(raw);
}

export function saveConfig(config: Partial<CliConfig>) {
  ensureConfigFileExists();
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

export function updateConfig(partial: Partial<CliConfig>) {
  const current = loadConfig();
  const updated = { ...current, ...partial };
  saveConfig(updated);
}
