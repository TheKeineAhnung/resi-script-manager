import { ScriptCategory } from './ScriptCategory';
import { ScriptName } from './ScriptName';
import { SettingTypes } from './SettingTypes';

interface ScriptInfo {
  name: ScriptName;
  displayName: string;
  description: string;
  author: string;
  version: string;
  category: ScriptCategory;
  outdated: boolean;
  usable: boolean;
  match: string[];
  oneTime: boolean;
  requiresConfig: false;
}

interface ScriptInfoConfig extends Omit<ScriptInfo, 'requiresConfig'> {
  requiresConfig: true;
  config: Record<
    string,
    {
      type: SettingTypes;
      default: any;
      description: string;
    }
  >;
}

export type { ScriptInfo, ScriptInfoConfig };
