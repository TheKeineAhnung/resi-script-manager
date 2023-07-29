import { variableIsNull } from '../../ts/errors/console';
import {
  isMissionStatusOnWork,
  MissionStatus,
  MissionStatusOnWork
} from '../../types/socket/MissionStatus';

const missionTime = async function (): Promise<any> {
  type IntervalStorage = Record<
    number,
    {
      remainingTime?: number | null;
      interval?: NodeJS.Timer;
      paused: boolean;
    }
  >;

  const initTimerTime = function (
    missionObject: MissionStatus | MissionStatusOnWork
  ): void | string {
    if (!isMissionStatusOnWork(missionObject)) {
      return;
    }

    let displayTime = '00:00';

    let remainingTime: Date;
    if (missionObject.icon === '') {
      remainingTime = new Date(missionObject.userMissionFinishTime);
    } else {
      const utcFinishTime = new Date(
        missionObject.userMissionFinishTime
      ).getTime();
      const currentDate = new Date();
      const currentTime = currentDate.getTime();
      remainingTime = new Date(utcFinishTime - currentTime);
    }

    if (remainingTime.getTime() < 0 || remainingTime.getTime() === undefined) {
      return displayTime;
    }

    const newIntervals = getStorageIntervals();
    if (newIntervals !== null) {
      intervals = newIntervals;
    }
    if (intervals[missionObject.userMissionID] === undefined) {
      intervals[missionObject.userMissionID] = {
        paused: false
      };
    }
    intervals[missionObject.userMissionID].remainingTime =
      remainingTime.getTime();
    setStorageIntervals(intervals);

    let remainingTimeCalc = remainingTime.getTime();

    if (remainingTime.getHours() > 0) {
      remainingTimeCalc -= 60 * 60 * 1000;
    }

    const formatOptions: Intl.DateTimeFormatOptions = {};

    if (new Date(remainingTimeCalc).getHours() > 0) {
      formatOptions.hour = '2-digit';
      formatOptions.minute = '2-digit';
      formatOptions.second = '2-digit';
    } else {
      formatOptions.minute = '2-digit';
      formatOptions.second = '2-digit';
    }

    displayTime = new Date(remainingTimeCalc).toLocaleTimeString(
      'de-de',
      formatOptions
    );
    return displayTime;
  };

  const displayTimer = function (
    missionObject: MissionStatus | MissionStatusOnWork
  ): void {
    const container: HTMLDivElement | null = document.querySelector(
      `div.mission-list-mission[usermissionid="${missionObject.userMissionID.toString()}"]`
    );

    if (container === null) {
      variableIsNull(Object.keys({ container })[0], 'missionTime.ts');

      return;
    }

    const timerParent: HTMLDivElement | null = container.querySelector(
      'a div.mission-list-content div.mission-list-text'
    );

    if (timerParent === null) {
      variableIsNull(Object.keys({ timerParent })[0], 'missionTime.ts');

      return;
    }

    if (
      !document.querySelector(
        `#timer-${missionObject.userMissionID.toString()}`
      )
    ) {
      const timerContainer: HTMLDivElement = document.createElement('div');
      timerContainer.id = `timer-${missionObject.userMissionID.toString()}`;
      timerContainer.classList.add('timer', 'mission-timer');
      timerContainer.style.width = 'fit-content';
      timerContainer.style.position = 'absolute';
      timerContainer.style.right = '27px';
      timerContainer.style.top = '7px';
      timerParent.insertAdjacentElement('beforeend', timerContainer);
    }
    updateTimer(missionObject);
  };

  const updateTimer = function (
    missionObject?: MissionStatus | MissionStatusOnWork
  ): void {
    const missionContainer: NodeListOf<HTMLDivElement> =
      document.querySelectorAll(`div.mission-list-content`);
    if (missionObject !== undefined) {
      const newTime = initTimerTime(missionObject);
      if (typeof newTime === 'string') {
        const container: HTMLDivElement | null = document.querySelector(
          `div#timer-${missionObject.userMissionID}`
        );
        if (container === null) {
          return;
        }
        container.innerText = newTime;
      }
      return;
    }
    const newIntervals = getStorageIntervals();
    if (newIntervals !== null) {
      intervals = newIntervals;
    }
    missionContainer.forEach((container: HTMLDivElement): void => {
      const timerContainer: HTMLDivElement | null = container.querySelector(
        'div.timer.mission-timer'
      );
      if (container.innerText !== '') {
        if (timerContainer?.innerText === '00:00') {
          const frameUrlAttribute = container.getAttribute('frame-url');
          if (frameUrlAttribute !== null) {
            const missionId = parseInt(
              frameUrlAttribute.replace('mission/', '')
            );
            intervals[missionId].remainingTime = 0;
            intervals[missionId].paused = true;
            setStorageIntervals(intervals);
          }
          return;
        }
        const missionIconContainer: HTMLDivElement | null =
          container.querySelector(
            'div.mission-list-icon-container div.mission-list-icon'
          );
        if (missionIconContainer === null || timerContainer === null) {
          return;
        }
        let missionStatus = 0;
        if (missionIconContainer.classList.contains('mission-list-icon-1')) {
          missionStatus = 1;
        } else if (
          missionIconContainer.classList.contains('mission-list-icon-2')
        ) {
          missionStatus = 2;
        } else if (
          missionIconContainer.classList.contains('mission-list-icon-3')
        ) {
          missionStatus = 3;
        }
        if (missionStatus !== 3) {
          return;
        }
        const newTime = updateTimerTime(
          timerContainer.innerText,
          parseInt(timerContainer.id.replace('timer-', ''))
        );
        if (typeof newTime === 'string') {
          timerContainer.innerText = newTime;
        }
      }
    });
  };

  const updateTimerTime = function name(
    currentRemainingTime: string,
    missionId: number
  ): string {
    let remainingTime = '00:00';
    if (
      currentRemainingTime === '00:00' ||
      currentRemainingTime === '00:00:00'
    ) {
      return remainingTime;
    }

    if (currentRemainingTime.length === 5) {
      currentRemainingTime = '00:' + currentRemainingTime;
    }
    const splittedTime = currentRemainingTime.split(':');
    const hours = parseInt(splittedTime[0]);
    const minutes = parseInt(splittedTime[1]);
    const seconds = parseInt(splittedTime[2]);

    const currentDate = new Date(
      `${new Date().getFullYear()} ${hours}:${minutes}:${seconds}`
    );

    const remainingTimeCalc = currentDate.getTime() - 1000;

    const newIntervals = getStorageIntervals();
    if (newIntervals !== null) {
      intervals = newIntervals;
    }
    intervals[missionId].remainingTime = remainingTimeCalc;
    setStorageIntervals(intervals);

    const formatOptions: Intl.DateTimeFormatOptions = {};

    if (new Date(remainingTimeCalc).getHours() > 0) {
      formatOptions.hour = '2-digit';
      formatOptions.minute = '2-digit';
      formatOptions.second = '2-digit';
    } else {
      formatOptions.minute = '2-digit';
      formatOptions.second = '2-digit';
    }

    remainingTime = new Date(remainingTimeCalc).toLocaleTimeString(
      'de-de',
      formatOptions
    );

    return remainingTime;
  };

  const init = function (missionObject: MissionStatus | MissionStatusOnWork) {
    const missionTextContainer: NodeListOf<HTMLDivElement> =
      document.querySelectorAll('div.mission-list-text');
    const missionNameContainer: NodeListOf<HTMLDivElement> =
      document.querySelectorAll('div.mission-list-name');

    missionTextContainer.forEach((e: HTMLDivElement): void => {
      e.style.width = '100%';
    });

    missionNameContainer.forEach((e: HTMLDivElement): void => {
      e.style.width = 'calc(100% - 55px)';
    });
    displayTimer(missionObject);
  };

  let intervals: IntervalStorage = {};

  const getStorageIntervals = function (): IntervalStorage | null {
    const data = sessionStorage.getItem('missionTimeIntervals');
    if (data === null) {
      return data;
    }
    return JSON.parse(data);
  };

  const setStorageIntervals = function (data: IntervalStorage): void {
    sessionStorage.setItem('missionTimeIntervals', JSON.stringify(data));
  };

  if (typeof socket !== 'undefined') {
    socket.on(
      'missionStatus',
      (missionObject: MissionStatus | MissionStatusOnWork): void => {
        if (isMissionStatusOnWork(missionObject)) {
          init(missionObject);
          intervals[missionObject.userMissionID] = {
            remainingTime: new Date(
              missionObject.userMissionFinishTime.toString()
            ).getTime(),
            paused: false
          };
        } else {
          if (missionObject.userMissionStatus !== 3) {
            if (intervals[missionObject.userMissionID] !== undefined) {
              clearInterval(intervals[missionObject.userMissionID].interval);
              intervals[missionObject.userMissionID] = {
                paused: true,
                remainingTime:
                  intervals[missionObject.userMissionID].remainingTime
              };
            }
          }
        }
        setStorageIntervals(intervals);
      }
    );

    socket.on('finishMission', (userMissionID: number): void => {
      const newIntervals = getStorageIntervals();
      if (newIntervals !== null) {
        intervals = newIntervals;
      }
      if (intervals[userMissionID] !== undefined) {
        clearInterval(intervals[userMissionID].interval);
        delete intervals[userMissionID];
        setStorageIntervals(intervals);
      }
    });
  }

  const storageIntervals = getStorageIntervals();
  if (storageIntervals === null) {
    setStorageIntervals({});
  } else {
    intervals = storageIntervals;
  }

  for (const [key, value] of Object.entries(intervals)) {
    const fakeMissionObject: MissionStatusOnWork = {
      icon: '',
      missingVehicles: { test: 3 },
      userMissionFinishTime:
        value.remainingTime !== undefined && value.remainingTime !== null
          ? value.remainingTime
          : 0,
      userMissionID: parseInt(key),
      userMissionProgress: 1.0,
      userMissionStatus: 3,
      userName: 'User'
    };
    init(fakeMissionObject);
    if (value.paused) {
      intervals[parseInt(key)] = {
        paused: true,
        remainingTime: value.remainingTime
      };
    }
  }
  setStorageIntervals(intervals);
  setInterval(() => {
    updateTimer();
  }, 1000);
};

export { missionTime };
