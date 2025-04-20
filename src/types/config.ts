import { Env } from "./enums";

export interface CliConfig {
  env: Env;
  domains: {
    [Env.DEV]: "";
    [Env.CIT]: "";
    [Env.STG]: "";
    [Env.PROD]: "";
  };
  service: string;
  feature: string;
  user: {
    id: string;
    token: string;
  };
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepPartialCliConfig = DeepPartial<CliConfig>;
