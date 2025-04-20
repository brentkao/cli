import inquirer from "inquirer";
import { ConfigAction, DefaultAction, defaultActionMsg } from "../types/enums";
import { resetConfig } from "../core/configService";
import {
  exportConfig,
  importConfig,
  updateUid,
  viewConfig,
} from "../handlers/configHandlers";

export async function configMenu() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "設定中心：請選擇操作",
        choices: [
          { name: "🔍 檢視目前設定", value: ConfigAction.VIEW },
          { name: "✏️ 修改使用者 UID", value: ConfigAction.EIDT_UID },
          { name: "🔁 重設所有設定", value: ConfigAction.RESET },
          { name: "📤 匯出設定檔（JSON）", value: ConfigAction.EXPORT },
          { name: "📥 匯入設定檔（JSON）", value: ConfigAction.IMPORT },
          {
            name: defaultActionMsg[DefaultAction.BACK],
            value: DefaultAction.BACK,
          },
        ],
      },
    ]);
    if (action === DefaultAction.BACK) break;

    switch (action) {
      case ConfigAction.VIEW:
        viewConfig();
        break;
      case ConfigAction.EIDT_UID:
        await updateUid();
        break;
      case ConfigAction.RESET:
        await resetConfig();
        break;
      case ConfigAction.EXPORT:
        exportConfig();
        break;
      case ConfigAction.IMPORT:
        await importConfig();
        break;
    }
  }
}
