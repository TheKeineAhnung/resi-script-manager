import { info } from '../data/info';
import type { ScriptInfo, ScriptInfoConfig } from '../types/Scripts';

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
