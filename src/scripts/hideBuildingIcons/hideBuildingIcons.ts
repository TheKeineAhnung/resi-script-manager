const hideBuildingIcons = async function (): Promise<any> {
  const hideIcons = function (): void {
    let iconsToRemove;
    const storageItems: string | null = localStorage.getItem(
      'hideBuildingIconsConfig'
    );

    if (storageItems !== null) {
      iconsToRemove = JSON.parse(storageItems);
    } else {
      iconsToRemove = [];
    }
    const images: NodeListOf<HTMLImageElement> = document.querySelectorAll(
      'img.leaflet-marker-icon'
    );

    for (const i of images) {
      for (const currentIcon in iconsToRemove) {
        if (i.src === iconsToRemove[currentIcon]) {
          i.style.display = 'none';
          break;
        }
      }
    }
  };

  hideIcons();
};

export { hideBuildingIcons };
