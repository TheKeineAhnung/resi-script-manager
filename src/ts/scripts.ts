import { info } from '../data/scriptInfo';
import type { ScriptInfo, ScriptInfoConfig } from '../types/Script';

const getScriptInfo = async function (): Promise<
  (ScriptInfo | ScriptInfoConfig)[]
> {
  return info;
};

const getScriptNames = async function (): Promise<string[]> {
  const scriptNames: string[] = [];

  for (const i in info) {
    scriptNames.push(info[i].name);
  }

  return scriptNames;
};

export { getScriptInfo, getScriptNames };
