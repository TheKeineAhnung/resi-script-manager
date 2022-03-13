import * as j from "jquery";
import { getConfig } from "./config";
import { getScripts } from "./scripts";
let removeComments = require("remove-comments");

function getEventlistenerContent(script, eventlistener) {
  let searchStringStart = `.addEventListener\\("${eventlistener}`;
  let searchStringEnd = `\\}\\)\\;`;
  script = script.trim();
  let startPos = script.search(searchStringStart);
  let startSubStr = script.substring(startPos);
  let endPos = startSubStr.search(searchStringEnd) + startPos;
  let subStr = script.substring(startPos, endPos);
  subStr = subStr.replace('.addEventListener("load", () => {', "").trim();
  return subStr;
}

export async function loadScripts() {
  let url = "https://keineahnung.eu/scripts/";
  let scriptInfo = await getScripts();
  let iframe = document.querySelector("#iframe");
  let config = getConfig().then((element) => {
    for (let key in element) {
      if (
        iframe.contentWindow.document.querySelector(`#${key}`) === null &&
        document.querySelector(`#${key}`) === null
      )
        if (element[key].active) {
          j.ajax({
            url: `${url}${key}.user.js`,
            success: function (data) {
              for (const e of scriptInfo) {
                if (e["name"] === key) {
                  for (let i = 0; i < e["match"].length; i++) {
                    let elem = e["match"][i];
                    let iframe = document.querySelector("#iframe");
                    if (
                      window.location.href.match(elem) ||
                      iframe.src.match(elem)
                    ) {
                      let script = removeComments(data);
                      if (
                        script.includes('.addEventListener("load", () => {')
                      ) {
                        let eventlistenerCode = getEventlistenerContent(
                          script,
                          "load"
                        );
                        script += eventlistenerCode;
                      }
                      let scriptElem = document.createElement("script");
                      scriptElem.innerHTML = script;
                      scriptElem.id = key;
                      if (window.location.href.match(elem)) {
                        let head = document.head;
                        head.appendChild(scriptElem);
                      } else if (iframe.src.match(elem)) {
                        let head = iframe.contentDocument.head;
                        head.appendChild(scriptElem);
                      }
                    }
                  }
                }
              }
            },
          });
        }
    }
  });
}
