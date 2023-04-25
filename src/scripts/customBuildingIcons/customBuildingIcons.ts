import { Buildings } from '../../types/api/Buildings';
import { apiGet } from '../../ts/helper/api';

const customBuildingIcons = async function (): Promise<any> {
  type Config = Record<string, string>;
  let config: Config = {};

  const buildings = (await apiGet(
    'buildings',
    sessionStorage
  )) as unknown as Buildings[];

  if (!localStorage.getItem('customBuildingIconsConfig')) {
    buildings.forEach(e => {
      config[e.buildingName] = 'null';
    });
    localStorage.setItem('customBuildingIconsConfig', JSON.stringify(config));
  }

  const getConfig = function (configParam: Config): Config | null {
    if (localStorage.getItem('customBuildingIconsConfig')) {
      if (
        JSON.parse(
          localStorage.getItem('customBuildingIconsConfig') ?? '{}'
        ) !== configParam
      ) {
        for (const elem in configParam) {
          if (configParam[elem] !== 'null') {
            localStorage.setItem(
              'customBuildingIconsConfig',
              JSON.stringify(configParam)
            );

            return configParam;
          }
        }

        return JSON.parse(
          localStorage.getItem('customBuildingIconsConfig') ?? '{}'
        );
      }
    } else {
      localStorage.setItem(
        'customBuildingIconsConfig',
        JSON.stringify(configParam)
      );

      return configParam;
    }

    return null;
  };

  const customBuildingIconsFunc = async function (): Promise<void> {
    const images: NodeListOf<HTMLImageElement> =
      document.querySelectorAll('img');
    const buildingData = (await apiGet(
      'buildings',
      sessionStorage
    )) as unknown as Buildings[];

    for (const i in images) {
      const currentImage = images[i];
      const src = currentImage.src;

      for (let i = 0; i < buildingData.length; i++) {
        if (
          src ===
            `https://rettungssimulator.online/images/marker/departments/${buildingData[i].markerName}.png` &&
          config[buildingData[i].buildingName] !== undefined
        ) {
          currentImage.src = config[buildingData[i].buildingName];
          currentImage.style.width = 'auto';
          currentImage.style.height = 'auto';
        }
      }
    }
  };

  const configCheck = getConfig(config);

  if (configCheck !== null) {
    config = configCheck;
    await customBuildingIconsFunc();
  }
};

export { customBuildingIcons };
