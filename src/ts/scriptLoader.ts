import { getConfig } from './config';
import { getScriptInfo } from './scripts';
import type { ScriptInfo, ScriptInfoConfig } from '../types/Scripts';
import * as scripts from '../scripts/scripts';

type ActiveScripts = Record<
  string,
  {
    runned: boolean;
  }
>;

const loadScripts = async function (): Promise<void> {
  const scriptInfo: (ScriptInfo | ScriptInfoConfig)[] = await getScriptInfo();

  if (document.body.innerHTML !== '') {
    const config = await getConfig();

    for (const key in config) {
      if (config[key].active) {
        for (const elem of scriptInfo) {
          if (elem.name === key) {
            const scriptName = elem.name;
            const script = scripts[scriptName];

            for (let i = 0; i < elem.match.length; i++) {
              const matchElem = elem.match[i];

              const url = window.location.href;

              const urlTest = url.match(matchElem)?.length;

              const activeScripts: ActiveScripts = JSON.parse(
                sessionStorage.getItem('scriptManagerActiveScripts') ?? '{}'
              );

              if (!Object.keys(activeScripts).includes(elem.name)) {
                activeScripts[elem.name] = {
                  runned: false
                };
                sessionStorage.setItem(
                  'scriptManagerActiveScripts',
                  JSON.stringify(activeScripts)
                );
              }

              if (
                urlTest !== undefined &&
                urlTest > 0 &&
                !activeScripts[elem.name].runned
              ) {
                await script();

                if (elem.oneTime) {
                  activeScripts[elem.name].runned = true;
                  sessionStorage.setItem(
                    'scriptManagerActiveScripts',
                    JSON.stringify(activeScripts)
                  );
                }
              }
            }
          }
        }
      }
    }
  }
};

export { loadScripts };
