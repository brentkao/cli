import inquirer from "inquirer";
import { FeatureAction } from "../types/enums";

export async function serviceFeatureMenu(service: string) {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: `在 ${service} 中選擇操作：`,
        choices: [
          { name: "📥 取得資料", value: FeatureAction.FETCH },
          { name: "🛠️ 更新資料", value: FeatureAction.UPDATE },
          { name: "❌ 刪除資料", value: FeatureAction.DELETE },
          { name: "⬅ 返回服務選單", value: FeatureAction.BACK },
        ],
      },
    ]);

    if (action === FeatureAction.BACK) break;

    console.log(`✅ 在 ${service} 中執行了 ${action} 功能`);
    // 這裡你可以接 API 或呼叫 handler
  }
}
