// ==UserScript==
// @name         Resi-script-manager test
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Resi-script-manager test
// @author       KeineAhnung
// @match        https://rettungssimulator.online/*
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @grant        none
// @run-at       document-end
// ==/UserScript==

const script = document.createElement('script');

script.src = 'http://localhost:8080/js/bundle.js';
document.head.appendChild(script);
