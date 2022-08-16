import { info } from '../data/scriptInfo';
import type { ScriptInfo, ScriptInfoConfig } from '../types/ScriptInfo';
import { isScriptCategory } from '../types/ScriptCategory';

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

const filterScripts = async function (
  filterCategories: string[],
  filterString: string
): Promise<(ScriptInfo | ScriptInfoConfig)[]> {
  const allScripts: (ScriptInfo | ScriptInfoConfig)[] = await getScriptInfo();

  const containingFilterCategories: string[] = filterCategories.filter(elem => {
    return (
      isScriptCategory(elem) ||
      isScriptCategory(elem.toUpperCase()) ||
      isScriptCategory(
        elem.charAt(0).toUpperCase() + elem.slice(1).toLowerCase()
      )
    );
  });

  if (
    (filterCategories.length <= 0 && filterString.trim().length <= 0) ||
    (containingFilterCategories.length <= 0 && filterString.trim().length <= 0)
  ) {
    return allScripts;
  }

  let filteredScripts: (ScriptInfo | ScriptInfoConfig)[] = [];

  filterCategories = filterCategories.map(elem => {
    return elem.toLowerCase();
  });

  if (filterCategories.length > 0) {
    filteredScripts = allScripts.filter(script => {
      return filterCategories.includes(script.category.toLowerCase());
    });
  }

  if (filterString.trim().length > 0) {
    if (filteredScripts.length > 0) {
      filteredScripts = filteredScripts.filter(script => {
        return script.displayName
          .toLowerCase()
          .includes(filterString.toLowerCase());
      });
    } else {
      filteredScripts = allScripts.filter(script => {
        return script.displayName
          .toLowerCase()
          .includes(filterString.toLowerCase());
      });
    }
  }

  return filteredScripts;
};

export { getScriptInfo, getScriptNames, filterScripts };
