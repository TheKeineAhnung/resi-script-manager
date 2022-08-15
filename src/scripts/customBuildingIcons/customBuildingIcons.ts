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
    const images: NodeListOf<HTMLImageElement> =
      document.querySelectorAll('img');
    const buildingData: { value: Buildings[] } = JSON.parse(
      sessionStorage.getItem('buildingIconsBuildingData') ?? '{}'
    );

    for (const i in images) {
      const currentImage = images[i];
      const src = currentImage.src;

      for (let i = 0; i < buildingData.value.length; i++) {
        if (
          src ===
            `https://rettungssimulator.online/images/marker/departments/${buildingData.value[i].markerName}.png` &&
          config[buildingData.value[i].buildingName] !== undefined
        ) {
          currentImage.src = config[buildingData.value[i].buildingName];
          currentImage.style.width = 'auto';
          currentImage.style.height = 'auto';
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
