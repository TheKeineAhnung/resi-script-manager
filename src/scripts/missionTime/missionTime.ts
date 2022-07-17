import { FinishMission } from '../../types/socket/FinishMission';
import { variableIsNull } from '../../ts/errors/console';
import {
  isMissionStatusOnWork,
  MissionStatus,
  MissionStatusOnWork
} from '../../types/socket/MissionStatus';

const missionTime = async function (): Promise<any> {
  const ids: number[] = [];

  const setIds = function (
    missionStatusObject: MissionStatus | MissionStatusOnWork | FinishMission,
    socketType: 'missionStatus' | 'finishMission'
  ): any {
    const missionListContent: NodeListOf<HTMLDivElement> =
      document.querySelectorAll('div.mission-list-content');

    const isMissionStatus = function (
      object: object
    ): object is MissionStatus | MissionStatusOnWork {
      return 'icon' in object;
    };

    missionListContent.forEach((elem: HTMLDivElement): void => {
      if (
        isMissionStatus(missionStatusObject) &&
        isMissionStatusOnWork(missionStatusObject) &&
        elem.getAttribute('frame-url') ===
          `mission/${missionStatusObject.userMissionID}` &&
        missionStatusObject.userMissionStatus === 3
      ) {
        if (!ids.includes(missionStatusObject.userMissionID)) {
          ids.push(missionStatusObject.userMissionID);
        }
        const container: HTMLDivElement | null = elem.querySelector(
          'div.mission-list-text div.mission-list-name'
        );

        if (container === null) {
          variableIsNull(Object.keys({ container })[0], 'missionTime');

          return;
        }

        container.style.display = 'flex';
        const date: Date = new Date();
        const finishTime = new Date(missionStatusObject.userMissionFinishTime);
        let remainingTime: string[] = String(finishTime).split(' ');

        remainingTime = remainingTime[4].split(':');
        let remainingTimeUnix =
          Number(remainingTime[0]) * 3_600 +
          Number(remainingTime[1]) * 60 +
          Number(remainingTime[2]);
        const hoursUnix = date.getHours() * 3_600;
        const minutesUnix = date.getMinutes() * 60;
        const secondsUnix = date.getSeconds();
        const completeNowUnix = hoursUnix + minutesUnix + secondsUnix;

        remainingTimeUnix -= completeNowUnix;
        const finishSeconds: number | string = remainingTimeUnix % 60;

        let beautifulFinishSeconds: string | null = null;

        if (finishSeconds <= 9) {
          beautifulFinishSeconds = `0${String(finishSeconds)}`;
        }
        const remainingTimeDisplay = `${String(
          (remainingTimeUnix - finishSeconds) / 60
        )} 
            :${
              beautifulFinishSeconds !== null
                ? beautifulFinishSeconds
                : String(finishSeconds)
            }`;

        if (container.querySelector('.mission-time') === null) {
          container.innerHTML += `<div class='mission-time id-${missionStatusObject.userMissionID}' style="margin-left: 5px"></div>`;
        }

        const missionTimeContainer: HTMLDivElement | null =
          container.querySelector('.mission-time');

        if (missionTimeContainer === null) {
          variableIsNull(
            Object.keys({ missionTimeContainer })[0],
            'missionTime'
          );

          return;
        }

        missionTimeContainer.innerHTML = `${remainingTimeDisplay}`;
      }
      if (
        ids.includes(missionStatusObject.userMissionID) &&
        socketType === 'finishMission'
      ) {
        const index = ids.indexOf(missionStatusObject.userMissionID);

        if (index > -1) {
          ids.splice(index, 1);
        }
      }

      const idContainer: null | HTMLDivElement = document.querySelector(
        `.id-${missionStatusObject.userMissionID}`
      );

      if (idContainer === null) {
        variableIsNull(Object.keys({ idContainer })[0], 'missionTime');

        return;
      }

      if (
        idContainer.classList.contains('mission-time') &&
        isMissionStatus(missionStatusObject) &&
        (missionStatusObject.userMissionStatus === 2 ||
          missionStatusObject.userMissionStatus === 1)
      ) {
        const timeContainer = document.querySelector(
          `.${missionStatusObject.userMissionID}`
        );

        if (timeContainer === null) {
          variableIsNull(Object.keys({ timeContainer })[0], 'missionTime');

          return;
        }

        timeContainer.classList.replace('mission-time', 'mission-time-paused');
      }
      if (
        idContainer.classList.contains('mission-time-paused') &&
        isMissionStatus(missionStatusObject) &&
        missionStatusObject.userMissionStatus === 3
      ) {
        const timeContainer = document.querySelector(
          `.${missionStatusObject.userMissionID}`
        );

        if (timeContainer === null) {
          variableIsNull(Object.keys({ timeContainer })[0], 'missionTime');

          return;
        }

        timeContainer.classList.replace('mission-time-paused', 'mission-time');
      }
    });
  };

  const refreshIds = function (): void {
    const elements: NodeListOf<HTMLDivElement> =
      document.querySelectorAll('div.mission-time');

    elements.forEach((elem): void => {
      const time: string = elem.innerText;
      const minutes: string = time.split(':')[0];
      const seconds: string = time.split(':')[1];

      if (minutes === 'NaN' || seconds === 'NaN') {
        // eslint-disable-next-line no-param-reassign
        elem.innerHTML = '0:00';
      } else if (elem.innerText !== '0:00') {
        const minutesInSeconds: number = Math.floor(Number(minutes) * 60);
        const targetTimeSeconds: number = minutesInSeconds + Number(seconds);
        let targetSeconds: number = targetTimeSeconds % 60;

        if (targetSeconds === 0) {
          targetSeconds = 59;
        } else {
          targetSeconds--;
        }
        const targetMinutes: number = Math.round(
          targetTimeSeconds - targetSeconds
        );

        const targetTime = `${String(Math.floor(targetMinutes / 60))}:${String(
          targetSeconds <= 9 ? `0${targetSeconds}` : targetSeconds
        )}`;

        // eslint-disable-next-line no-param-reassign
        elem.innerHTML = targetTime;
      }
    });
  };

  setInterval(refreshIds, 1_000);

  socket.on(
    'missionStatus',
    (missionStatusObject: MissionStatus | MissionStatusOnWork): void => {
      setIds(missionStatusObject, 'missionStatus');
    }
  );

  socket.on('finishMission', (userMissionId: FinishMission): void => {
    setIds(userMissionId, 'finishMission');
  });
};

export { missionTime };
