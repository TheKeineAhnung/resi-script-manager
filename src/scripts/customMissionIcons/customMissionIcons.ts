import { NewMission } from '../../types/socket/NewMission';
import {
  MissionStatus,
  MissionStatusOnWork
} from '../../types/socket/MissionStatus';

const customMissionIcons = async function (): Promise<any> {
  interface Config {
    name: string;
    1: string;
    2: string;
    3: string;
  }

  let config: Config[] = [];

  const getConfig = function (configParam: Config[]): Config[] {
    if (localStorage.getItem('customMissionIconsConfig')) {
      const configStorage: Config[] = JSON.parse(
        localStorage.getItem('customMissionIconsConfig') ?? '[]'
      );

      if (configStorage !== configParam) {
        for (const item of configParam) {
          for (const value of Object.values(item)) {
            if (value !== '') {
              localStorage.setItem(
                'customMissionIconsConfig',
                JSON.stringify(configParam)
              );

              return configParam;
            }
          }
        }
      }

      return configStorage;
    }
    localStorage.setItem(
      'customMissionIconsConfig',
      JSON.stringify(configParam)
    );

    return configParam;
  };

  const replaceIcons = function (icon = 'fire'): any {
    for (const i in config) {
      const oneMap: NodeListOf<HTMLImageElement> = document.querySelectorAll(
        `img[src='images/marker/missions/${config[i].name}_1.svg']`
      );
      const twoMap: NodeListOf<HTMLImageElement> = document.querySelectorAll(
        `img[src='images/marker/missions/${config[i].name}_2.svg']`
      );
      const threeMap: NodeListOf<HTMLImageElement> = document.querySelectorAll(
        `img[src='images/marker/missions/${config[i].name}_3.svg']`
      );

      for (const elem in oneMap) {
        if (
          oneMap[elem].src ===
          `https://rettungssimulator.online/images/marker/missions/${icon}_1.svg`
        ) {
          oneMap[elem].src = `${config[i]['1']}`;
        }
      }
      for (const elem in twoMap) {
        if (
          twoMap[elem].src ===
          `https://rettungssimulator.online/images/marker/missions/${icon}_2.svg`
        ) {
          twoMap[elem].src = `${config[i]['2']}`;
        }
      }
      for (const elem in threeMap) {
        if (
          threeMap[elem].src ===
          `https://rettungssimulator.online/images/marker/missions/${icon}_3.svg`
        ) {
          threeMap[elem].src = `${config[i]['3']}`;
        }
      }
    }
  };

  if (typeof socket !== 'undefined') {
    socket.on(
      'missionStatus',
      (missionStatusObject: MissionStatus | MissionStatusOnWork): void => {
        replaceIcons(missionStatusObject.icon);
      }
    );

    socket.on('newMission', (missionObject: NewMission): void => {
      replaceIcons(missionObject.icon);
    });
  }

  config = getConfig(config);

  for (const configItem of config) {
    replaceIcons(configItem.name);
  }
};

export { customMissionIcons };
