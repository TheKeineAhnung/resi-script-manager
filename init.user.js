// ==UserScript==
// @name         Resi-script-manager
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Script manager for rettungssimulator.online
// @author       KeineAhnung
// @match        https://rettungssimulator.online/*
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @updateURL    https://github.com/TheKeineAhnung/resi-script-manager/raw/main/init.user.js
// @downloadURL  https://github.com/TheKeineAhnung/resi-script-manager/raw/main/init.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

let script = document.createElement("script");
script.src = "https://keineahnung.eu/resi-script-manager/js/bundle-min.js";
document.head.appendChild(script);
