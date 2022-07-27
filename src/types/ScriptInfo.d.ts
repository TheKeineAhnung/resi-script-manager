import { ScriptCategory } from './ScriptCategory';
import { ScriptName } from './ScriptName';
import { SettingTypes } from './SettingTypes';

interface ScriptInfo {
  name: ScriptName;
  displayName: string;
  description: string;
  author: string;
  category: ScriptCategory;
  usable: boolean;
  match: (string | RegExp)[];
  oneTime: boolean;
  requiresConfig: false;
}

interface ScriptInfoConfig extends Omit<ScriptInfo, 'requiresConfig'> {
  requiresConfig: true;
  config: Record<
    string,
    {
      type: SettingTypes;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      default: any;
      description: string;
    }
  >;
}

export type { ScriptInfo, ScriptInfoConfig };
