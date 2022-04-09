export function closeSettingsFrame() {
  let iframe = document.querySelector("#iframe");
  iframe.remove();
  let frame = document.createElement("iframe");
  frame.id = "iframe";
  frame.classList.add("panel");
  frame.setAttribute("data-hj-allow-iframe", "");
  let mainarea = document.querySelector("#mainarea");
  mainarea.style.overflow = "unset";
  mainarea.appendChild(frame);
  // frameVisible is a variable of rettungssimulator.online
  // You can find it in the controlCenter.js file
  for (const i in frameVisible) {
    frameVisible[i] = true;
  }
  // hidePanels is a function of rettungssimulator.online
  // You can find it in the controlCenter.js file
  hidePanels();
}

export function isSettingsFrame() {
  return (
    document.querySelector("#iframe").getAttribute("data-source") ===
    "scriptManager"
  );
}
