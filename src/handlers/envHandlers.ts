import inquirer from "inquirer";
import { Env } from "../types/enums";
import { updateConfig, loadConfig } from "../core/configService";
import chalk from "chalk";

export async function handleSwitchEnv() {
  const { env } = await inquirer.prompt([
    {
      type: "list",
      name: "env",
      message: "選擇當前環境",
      choices: [
        { name: `本地開發環境 (${Env.DEV})`, value: Env.DEV },
        { name: `整合測試環境 (${Env.CIT})`, value: Env.CIT },
        { name: `測試驗收環境 (${Env.STG})`, value: Env.STG },
        { name: `正式環境 (${Env.PROD})`, value: Env.PROD },
      ],
    },
  ]);

  updateConfig({ env });
  console.log(`✅ 環境已切換為 ${chalk.green(env)}`);
}

export async function handleSetDomain(envKey: Env) {
  const { domain } = await inquirer.prompt([
    {
      type: "input",
      name: "domain",
      message: `請輸入 ${envKey} 的 Domain：`,
      validate: (input: string) => {
        return isValidDomain(input)
          ? true
          : "❌ 請輸入有效的 domain，例如 localhost, 192.168.x.x 或正式網址";
      },
    },
  ]);

  updateConfig({
    domains: {
      [envKey]: domain,
    },
  });

  console.log(
    `✅ ${chalk.yellow(envKey)} domain 已設定為 ${chalk.cyan(domain)}`
  );
}

function isValidDomain(input: string): boolean {
  try {
    const url = new URL(input.startsWith("http") ? input : `http://${input}`);
    return /^localhost|^127|^192|^[a-zA-Z0-9.-]+\.[a-z]{2,}$/.test(
      url.hostname
    );
  } catch {
    return false;
  }
}
