import * as j from "jquery";

async function getScriptInfo() {
  let scriptInfo;
  let url;
  if (process.env.NODE_ENV === "development") {
    url = "https://localhost/json/info.json";
  } else {
    url = "https://keineahnung.eu/resi-script-manager/json/info.json";
  }
  await j.getJSON(url, (data) => {
    scriptInfo = data;
  });
  return scriptInfo;
}

async function getScriptNames() {
  let scriptNames = new Array();
  let url;
  if (process.env.NODE_ENV === "development") {
    url = "https://localhost/json/info.json";
  } else {
    url = "https://keineahnung.eu/resi-script-manager/json/info.json";
  }
  await j.getJSON(url, (data) => {
    for (let i in data) {
      scriptNames.push(data[i].name);
    }
  });
  return scriptNames;
}

export { getScriptInfo as getScripts, getScriptNames };
