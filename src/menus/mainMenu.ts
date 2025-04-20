import inquirer from "inquirer";
import { serviceMenu } from "./serviceMenu";
import { Env, MainAction } from "../types/enums";
import { configMenu } from "./configMenu";
import { envMenu } from "./envMenu";

export async function mainMenu(): Promise<"exit" | void> {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "主選單：請選擇操作",
      choices: [
        { name: "設定環境", value: MainAction.ENV },
        { name: "設定中心", value: MainAction.CONFIG },
        { name: "進入服務選單", value: MainAction.SERVICE },
        { name: "離開 CLI", value: MainAction.EXIT },
      ],
    },
  ]);

  switch (action) {
    case MainAction.ENV:
      await envMenu();
      break;

    case MainAction.CONFIG:
      await configMenu();
      break;

    case MainAction.SERVICE:
      await serviceMenu();
      break;
  }

  return action === MainAction.EXIT ? "exit" : undefined;
}
