import inquirer from "inquirer";
import { runHelp } from "../actions/help";

export async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "請選擇一個操作：",
      choices: [
        { name: "🧾 查看說明", value: "help" },
        { name: "❌ 離開", value: "exit" },
      ],
    },
  ]);

  switch (action) {
    case "help":
      runHelp();
      break;
    case "exit":
      console.log("再見！");
      process.exit(0);
  }

  await mainMenu(); // 再次顯示
}
