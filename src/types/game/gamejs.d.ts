interface ReSiControlCenter {
    resi: ReSiMain;
    missions: any;
    doNotPing: boolean;
    mapFullscreen: boolean;

    onReady: () => void;
    setMissionSpeed: (missionSpeed: number) => void;
    generateNewMission: () => void;
    initMission: (initMission: any) => void;
    initMissions: (initMission: Array<any>) => void;
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
    }
    resiVersion: string;

    // Functions
    ping: () => void;
    notification: (options: any) => void;
}


declare let soundSettings: {
    enableSounds: false,
    volume: number,
    disabledSounds: Array<string>,
}
declare const TUTORIAL_STEP: number;
declare const SOCKET_PORT: number;

declare const ReSi: ReSiMain;

// Next Scripttag
declare const ControlCenter: ReSiControlCenter;
declare let controlCenterArray: {
    notificationCounter: {
        associationApplication: number,
        news: number,
    },
    setNotificationCounter: (type: string, value: number) => void,
}

declare const SITE_TUTORIAL_STEPS: Array<number>;
declare const SITE_TUTORIAL_REPEAT_STEPS: {
    [key: number]: number,
}

declare var departmentMarkers: Object;
declare var missionMarkers: Object;

declare const socket: socket;