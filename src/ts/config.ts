import { getScriptNames } from './scripts';
import { Config, ConfigItems } from '../types/Config';

const setConfig = async function (scriptNames: string[]): Promise<Config> {
  const config: Config = {};

  scriptNames.forEach((scriptName: string): void => {
    config[scriptName] = {
      active: false
    };
  });
  localStorage.setItem('resiScriptManagerConfig', JSON.stringify(config));

  return config;
};

const getConfig = async function (): Promise<Config> {
  let config: Config;

  const scriptConfig: string | null = localStorage.getItem(
    'resiScriptManagerConfig'
  );

  if (scriptConfig !== null) {
    config = JSON.parse(scriptConfig) as Config;
  } else {
    const scriptNames: string[] = await getScriptNames();

    config = await setConfig(scriptNames);
  }

  return config;
};

const updateConfig = function (config: Config): void {
  localStorage.setItem('resiScriptManagerConfig', JSON.stringify(config));
};

const setConfigItem = async function (
  scriptName: string,
  value: ConfigItems
): Promise<void> {
  const config: Config = await getConfig();

  config[scriptName] = value;

  updateConfig(config);
};

const checkConfig = async function (): Promise<void> {
  const scriptNames: string[] = await getScriptNames();
  const config: Config = await getConfig();

  scriptNames.forEach(async (element): Promise<void> => {
    if (!Object.keys(config).includes(element)) {
      await setConfigItem(element, { active: false });
    }
  });

  // Sort config object by key
  const sortedConfig: Config = {};

  Object.keys(config)
    // eslint-disable-next-line id-length
    .sort((a, b): number => a.localeCompare(b))
    .forEach((key): void => {
      sortedConfig[key] = config[key];
    });
  updateConfig(sortedConfig);
};

export { getConfig, setConfig, setConfigItem, updateConfig, checkConfig };
