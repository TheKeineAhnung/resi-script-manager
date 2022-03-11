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
  config = JSON.parse(localStorage.getItem("resiScriptManagerConfig"));
  if (config == null) {
    config = await setConfig();
  }
  return config;
}

export function updateConfig(config) {
  localStorage.setItem("resiScriptManagerConfig", JSON.stringify(config));
}
