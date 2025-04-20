import inquirer from "inquirer";
import {
  DefaultAction,
  defaultActionMsg,
  Env,
  EnvAction,
} from "../types/enums";
import { handleSwitchEnv, handleSetDomain } from "../handlers/envHandlers";

export async function envMenu() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "環境設定：請選擇操作",
      choices: [
        { name: "🔁 切換當前環境", value: EnvAction.SWITCH },
        { name: "[⚙️] 設定 DEV domain", value: Env.DEV },
        { name: "[⚙️] 設定 CIT domain", value: Env.CIT },
        { name: "[⚙️] 設定 STG domain", value: Env.STG },
        { name: "[⚙️] 設定 PROD domain", value: Env.PROD },
      ],
    },
  ]);

  switch (action) {
    case EnvAction.SWITCH:
      await handleSwitchEnv();
      break;
    case Env.DEV:
      await handleSetDomain(Env.DEV);
      break;
    case Env.CIT:
      await handleSetDomain(Env.CIT);
      break;
    case Env.STG:
      await handleSetDomain(Env.STG);
      break;
    case Env.PROD:
      await handleSetDomain(Env.PROD);
      break;
  }
}
