import * as j from "jquery";

async function getCredits() {
  let scriptInfo;
  await j.getJSON(
    "https://keineahnung.eu/resi-script-manager/json/credits.json",
    (data) => {
      scriptInfo = data;
    }
  );
  return scriptInfo;
}

export { getCredits };
