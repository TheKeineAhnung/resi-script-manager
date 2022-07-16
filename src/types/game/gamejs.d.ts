// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */
interface ReSiControlCenter {
  resi: ReSiMain;
  missions: any;
  doNotPing: boolean;
  mapFullscreen: boolean;

  onReady: () => void;
  setMissionSpeed: (missionSpeed: number) => void;
  generateNewMission: () => void;
  initMission: (initMission: any) => void;
  initMissions: (initMission: any[]) => void;
  updateNoMissionBanner: () => void;
}

interface ReSiMain {
  userName: string;
  settings: {
    missionGenerationSpeed: number;
    chatSound: number;
    chatSoundOnlyBackground: boolean;
    desktopNotification: number;
    desktopNotificationOnlyBackground: boolean;
    defaultMissionNameAutocomplete: boolean;
    streamerMode: boolean;
    set: (setting: string, value: any) => void;
  };
  resiVersion: string;

  // Functions
  ping: () => void;
  notification: (options: any) => void;
}

declare let soundSettings: {
  enableSounds: false;
  volume: number;
  disabledSounds: string[];
};
declare const TUTORIAL_STEP: number;
declare const SOCKET_PORT: number;

declare const ReSi: ReSiMain;

// Next Scripttag
declare const ControlCenter: ReSiControlCenter;
declare let controlCenterArray: {
  notificationCounter: {
    associationApplication: number;
    news: number;
  };
  setNotificationCounter: (type: string, value: number) => void;
};

declare const SITE_TUTORIAL_STEPS: number[];
declare const SITE_TUTORIAL_REPEAT_STEPS: Record<number, number>;

// eslint-disable-next-line vars-on-top, no-var
declare var departmentMarkers: Record<any, any>;
// eslint-disable-next-line vars-on-top, no-var
declare var missionMarkers: Record<any, any>;

// eslint-disable-next-line no-undef
declare const socket: socket;
