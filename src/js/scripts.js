import * as j from "jquery";

async function getScriptInfo() {
  let scriptInfo;
  await j.getJSON("https://keineahnung.eu/json/info.json", (data) => {
    scriptInfo = data;
  });
  return scriptInfo;
}

async function getScriptNames() {
  let scriptNames = new Array();
  await j.getJSON("https://keineahnung.eu/json/info.json", (data) => {
    for (let i in data) {
      scriptNames.push(data[i].name);
    }
  });
  return scriptNames;
}

export { getScriptInfo as getScripts, getScriptNames };
