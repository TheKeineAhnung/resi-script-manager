// ==UserScript==
// @name         Resi-script-manager test
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Resi-script-manager test
// @author       KeineAhnung
// @match        https://rettungssimulator.online/*
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @grant        none
// @run-at       document-end
// ==/UserScript==

let script = document.createElement("script");
script.src = "https://localhost/js/bundle-min.js";
document.head.appendChild(script);
