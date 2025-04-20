import inquirer from "inquirer";
import { serviceFeatureMenu } from "./featureMenu";
import { updateConfig } from "../core/configService";
import { ServiceAction } from "../types/enums";

export async function serviceMenu() {
  while (true) {
    const { service } = await inquirer.prompt([
      {
        type: "list",
        name: "service",
        message: "選擇服務：",
        choices: [
          { name: "玩家服務 (player-service)", value: ServiceAction.PLAYER },
          { name: "金流服務 (money-service)", value: ServiceAction.MONEY },
          { name: "遊戲服務 (game-service)", value: ServiceAction.GAME },
          { name: "⬅ 返回主選單", value: ServiceAction.BACK },
        ],
      },
    ]);

    if (service === ServiceAction.BACK) break;

    updateConfig({ service });
    await serviceFeatureMenu(service);
  }
}
