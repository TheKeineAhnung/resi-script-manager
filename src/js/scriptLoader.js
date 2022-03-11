import * as j from "jquery";
import { getConfig } from "./config";

export function loadScripts() {
  let url = "https://keineahnung.eu/scripts/";
  let config = getConfig().then((element) => {
    for (let key in element) {
      if (element[key].active) {
        j.ajax({
          url: url + key + ".user.js",
          dataType: "text",
          success: function (data) {
            console.log(data.responseText);
          },
        });
        //console.log(j.getScript(url + key + ".user.js"));
        /*let script = document.createElement("script");
        script.src = url + key + ".user.js";
        let head = document.querySelector("head");
        head.appendChild(script);*/
      }
    }
  });
}
