import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faJsSquare } from "@fortawesome/free-brands-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { closeSettingsFrame } from "./iframe";
import { loadScripts } from "./scriptLoader";
import { getScriptNames } from "./scripts";
import { getConfig, setConfigItem } from "./config";
library.add(faJsSquare, faTimes);
let jsSquare = icon(faJsSquare);
let closeIcon = icon(faTimes);
let server;
if (process.env.NODE_ENV === "development") {
  server = "https://localhost";
} else {
  server = "https://keineahnung.eu/resi-script-manager";
}

function createPageLink() {
  if (document.querySelector("#darkMode")) {
    let parent = document.querySelector("#darkMode");
    let li = document.createElement("li");
    li.id = "scriptManager";
    li.innerHTML = `Skripte ${jsSquare.html}`;
    parent.insertAdjacentHTML("afterend", li.outerHTML);
    document.querySelector("#scriptManager").addEventListener("click", () => {
      openFrame("", "1/1/4/5");
      let frame = document.querySelector("#iframe");
      if (
        (frame.src === "" ||
          frame.src === "https://rettungssimulator.online/") &&
        !frame.contentWindow.document.querySelector("#scriptManagerSettings")
      ) {
        frame.addEventListener("load", function () {
          let head = frame.contentWindow.document.querySelector("head");
          if (head.querySelectorAll("script").length > 0) {
            let scripts = head.querySelectorAll("script");
            scripts.forEach((script) => {
              script.remove();
            });
          }
          if (head.querySelectorAll("link").length > 0) {
            let links = head.querySelectorAll("link");
            links.forEach((link) => {
              link.remove();
            });
          }
          frame.contentWindow.document.body.innerHTML = "";
          let closeDivIcon = document.createElement("div");
          closeDivIcon.id = "closeDivIcon";
          closeDivIcon.style.width = "100%";
          closeDivIcon.style.display = "flex";
          closeDivIcon.style.justifyContent = "end";
          let closeSpanIcon = document.createElement("span");
          closeSpanIcon.id = "closeSpanIcon";
          closeSpanIcon.style.height = "25px";
          closeSpanIcon.insertAdjacentHTML("beforeend", closeIcon.html);
          closeSpanIcon.style.cursor = "pointer";
          closeSpanIcon.style.display = "block";
          closeSpanIcon.style.width = "25px";
          closeSpanIcon.style.marginRight = "5px";
          closeDivIcon.insertAdjacentHTML("beforeend", closeSpanIcon.outerHTML);
          frame.contentWindow.document.body.insertAdjacentHTML(
            "afterbegin",
            closeDivIcon.outerHTML
          );
          frame.contentWindow.document.querySelector(
            "svg.svg-inline--fa.fa-xmark"
          ).style.height = "25px";
          frame.contentWindow.document
            .querySelector("#closeSpanIcon")
            .addEventListener("click", closeSettingsFrame);
          let script = document.createElement("script");
          script.src = `${server}/js/svelte/settings.js`;
          head.appendChild(script);
          let link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = `${server}/theme/smui-dark.css`;
          head.appendChild(link);
          let link2 = document.createElement("link");
          link2.href = `${server}/js/svelte/css/settings.css`;
          link2.rel = "stylesheet";
          head.appendChild(link2);
          let buttonInterval = setInterval(addReloadAction, 100);
          function addReloadAction() {
            if (
              document
                .querySelector("#iframe")
                .contentDocument.querySelector("#saveButtonReload")
            ) {
              document
                .querySelector("#iframe")
                .contentDocument.querySelector("#saveButtonReload")
                .addEventListener("click", function () {
                  window.location.reload();
                });
              clearInterval(buttonInterval);
            }
          }
        });
      }
    });
  }
}

async function checkConfig() {
  let scriptNames = await getScriptNames();
  let config = await getConfig();

  scriptNames.forEach((element) => {
    if (config[element] === undefined) {
      setConfigItem(element, { active: false });
    }
  });
}

window.addEventListener("load", () => {
  createPageLink();
  loadScripts();
  checkConfig();
});

document.querySelector("#iframe").addEventListener("load", () => {
  loadScripts();
});

new MutationObserver(function onSrcChange() {
  let srcURL = document.querySelector("#iframe").src;
  closeSettingsFrame();
  document.querySelector("#iframe").src = srcURL;
  document.querySelector("#iframe").style.display = "grid";
}).observe(document.querySelector("#iframe"), {
  attributes: true,
  attributeFilter: ["src"],
});
