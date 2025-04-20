export enum MainAction {
  ENV = "env",
  CONFIG = "config",
  SERVICE = "service",
  EXIT = "exit",
}

export enum ServiceAction {
  PLAYER = "player-service",
  MONEY = "money-service",
  GAME = "game-service",
  BACK = "back",
}

export enum FeatureAction {
  FETCH = "fetch",
  UPDATE = "update",
  DELETE = "delete",
  BACK = "back",
}

export enum Env {
  DEV = "DEV",
  CIT = "CIT",
  STG = "STG",
  PROD = "PROD",
}

export enum EnvAction {
  SWITCH = "switch",
}

export enum ConfigAction {
  VIEW = "view",
  EIDT_UID = "edit-uid",
  RESET = "reset",
  EXPORT = "export-config",
  IMPORT = "import-config",
}

export enum DefaultAction {
  BACK = "back",
}

export const defaultActionMsg = {
  [DefaultAction.BACK]: "⬅ 回到上一頁",
};
