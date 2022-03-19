import * as j from "jquery";

async function getCredits() {
  let scriptInfo;
  let url;
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "development") {
    url = "https://localhost/json/credits.json";
  } else {
    url = "https://keineahnung.eu/resi-script-manager/json/credits.json";
  }
  await j.getJSON(url, (data) => {
    scriptInfo = data;
  });
  return scriptInfo;
}

export { getCredits };
