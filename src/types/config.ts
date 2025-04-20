import { Env } from "./enums";
// src/types/config.ts
export interface CliConfig {
  env: Env;
  service: string;
  feature: string;
}
