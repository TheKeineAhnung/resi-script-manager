interface ConfigItems {
  active: boolean;
}

type Config = Record<string, ConfigItems>;

export type { Config, ConfigItems };
