export function closeSettingsFrame() {
  if (document.querySelector("#iframe")) {
    document.querySelector("#iframe").contentWindow.document.body.innerHTML =
      "";
    document.querySelector("#iframe").contentWindow.document.head.innerHTML =
      "";
  }
  closeFrame();
}
