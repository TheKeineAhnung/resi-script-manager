import { variableIsNull } from '../../ts/errors/console';

const alertOnMissionShare = async function (): Promise<any> {
  const missionsContainer = document.querySelector(
    'div#missions-container-shared'
  );

  if (missionsContainer === null) {
    variableIsNull(Object.keys({ missionsContainer })[0], 'alertMissionShare');
    return;
  }

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (
        (mutation.target as HTMLDivElement).id ===
          'missions-container-shared' &&
        mutation.type === 'childList'
      ) {
        mutation.addedNodes.forEach(addedNode => {
          const missionId = (
            addedNode as HTMLDivElement
          )?.nextElementSibling?.getAttribute('usermissionid');
          if (missionId === null || missionId === undefined) {
            variableIsNull(Object.keys({ missionId })[0], 'alertMissionShare');
            return;
          }
          setTimeout(() => {
            const missionInfo = ControlCenter.missions[missionId];
            GrowlNotification.notify({
              title: `<div class="frame-opener" frame="1/1/4/5" frame-url="/mission/${missionId}">Neuer Einsatz freigegeben</div>`,
              description: `<div class="frame-opener" frame="1/1/4/5" frame-url="/mission/${missionId}">Einsatz ${missionInfo.missionName} wurde von ${missionInfo.userName} freigegeben.</div>`,
              type: 'info',
              position: 'top-left',
              closeTimeout: 10000,
              showProgress: true
            });
          }, 1000);
        });
      }
    });
  });

  const observerOptions = {
    childList: true
  };
  observer.observe(missionsContainer, observerOptions);
};

export { alertOnMissionShare };
