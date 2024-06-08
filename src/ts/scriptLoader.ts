import { getConfig } from './config';
import { getScriptInfo } from './scripts';
import { ScriptInfo, ScriptInfoConfig } from '../types/ScriptInfo';
import * as scripts from '../scripts/scripts';
import { compare_node } from 'svelte/types/compiler/compile/utils/compare_node';

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
              let matchElem = elem.match[i];

              if (process.env.MODE === 'beta') {
                matchElem = matchElem
                  .toString()
                  .replace(
                    'rettungssimulator.online',
                    'beta.rettungssimulator.online'
                  );
              }

              const url = window.location.href;
              console.log('Skript: ' + scriptName);
              console.log(' URL : ', url);
              console.log(' matchElem : ', matchElem);

              const urlTest = RegExp(matchElem).test(url);

              console.log(' urlTest : ', urlTest);

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
                urlTest &&
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
