import { Buildings } from '../../types/api/Buildings';

const customBuildingIcons = async function (): Promise<any> {
  type Config = Record<string, string>;
  let config: Config = {};

  if (sessionStorage.getItem('buildingIconsBuildingData') === null) {
    // eslint-disable-next-line no-undef
    await $.getJSON('/api/buildings').done((data: Buildings[]): void => {
      sessionStorage.setItem(
        'buildingIconsBuildingData',
        JSON.stringify({ value: data })
      );

      data.forEach((elem): void => {
        config[elem.buildingName] = 'null';
      });
    });
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

  const customBuildingIconsFunc = function (): void {
    const images = document.getElementsByTagName('img');
    const buildingData: Buildings[] = JSON.parse(
      sessionStorage.getItem('buildingIconsBuildingData') ?? '{}'
    );

    for (const i in images) {
      const actualImage = images[i];
      const src = actualImage.src;

      for (const elem in buildingData) {
        if (
          src ===
            `https://rettungssimulator.online/images/marker/departments/${buildingData[elem].markerName}.png` &&
          config[buildingData[elem].buildingName] !== 'null'
        ) {
          actualImage.src = config[buildingData[elem].buildingName];
          actualImage.style.width = 'auto';
          actualImage.style.height = 'auto';
        }
      }
    }
  };

  const configCheck = getConfig(config);

  if (configCheck !== null) {
    config = configCheck;
    customBuildingIconsFunc();
  }
};

export { customBuildingIcons };
