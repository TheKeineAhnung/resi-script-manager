import { getScriptNames } from "./scripts";

export async function setConfig(scriptNames) {
  let config = new Object();
  scriptNames.forEach((scriptName) => {
    config[scriptName] = {
      active: false,
    };
  });
  localStorage.setItem("resiScriptManagerConfig", JSON.stringify(config));
  return config;
}

export async function getConfig() {
  let config;
  if (localStorage.getItem("resiScriptManagerConfig")) {
    config = JSON.parse(localStorage.getItem("resiScriptManagerConfig"));
  } else {
    let scriptNames = await getScriptNames();
    config = await setConfig(scriptNames);
  }
  return config;
}

export function updateConfig(config) {
  localStorage.setItem("resiScriptManagerConfig", JSON.stringify(config));
}
