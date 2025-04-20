export enum MainAction {
  ENV = "env",
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
  STG = "STG",
  PROD = "PROD",
}
