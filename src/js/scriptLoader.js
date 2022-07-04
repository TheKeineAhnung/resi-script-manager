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
  let scriptInfo = await getScripts();
  let iframe = document.querySelector("#iframe");
  if (iframe === null || iframe.contentDocument.body.innerHTML !== "") {
    let config = getConfig().then((element) => {
      for (let key in element) {
        if (
          iframe?.contentWindow.document.querySelector(`#${key}`) === null ||
          document.querySelector(`#${key}`) === null
        )
          if (element[key].active) {
            for (const e of scriptInfo) {
              if (e["name"] === key) {
                let storageKey = key + "Script";
                if (localStorage.getItem(storageKey)) {
                  let info = JSON.parse(localStorage.getItem(storageKey));
                  if (e["version"] !== info["version"]) {
                    j.ajax({
                      url: `${e["src"]}`,
                      success: function (data) {
                        addScriptToHead(e, data);
                        let infoForStorage = {
                          version: e["version"],
                          script: data,
                        };
                        localStorage.setItem(
                          storageKey,
                          JSON.stringify(infoForStorage)
                        );
                      },
                    });
                  } else {
                    addScriptToHead(e, info["script"]);
                  }
                } else {
                  j.ajax({
                    url: `${e["src"]}`,
                    success: function (data) {
                      addScriptToHead(e, data);
                      let infoForStorage = {
                        version: e["version"],
                        script: data,
                      };
                      localStorage.setItem(
                        storageKey,
                        JSON.stringify(infoForStorage)
                      );
                    },
                  });
                }
              }
            }
          }
      }
    });
  }
}

function addScriptToHead(e, data) {
  for (let i = 0; i < e["match"].length; i++) {
    let key = e["name"];
    let elem = e["match"][i];
    let iframe = document.querySelector("#iframe");
    if (new RegExp(elem).test(window.location.href) || new RegExp(elem).test(iframe?.src)) {
      let script = removeComments(data);
      if (script.includes('.addEventListener("load", () => {')) {
        let eventlistenerCode = getEventlistenerContent(script, "load");
        script += eventlistenerCode;
      }
      let scriptElem = document.createElement("script");
      scriptElem.innerHTML = script;
      scriptElem.id = key;
      if (
        new RegExp(elem).test(window.location.href) &&
        document.querySelector(`#${key}`) === null
      ) {
        let head = document.head;
        head.appendChild(scriptElem);
      }
      if (
        new RegExp(elem).test(iframe?.src) &&
        iframe?.contentWindow.document.querySelector(`#${key}`) === null
      ) {
        let head = iframe.contentDocument.head;
        head.appendChild(scriptElem);
      }
    }
  }
}
