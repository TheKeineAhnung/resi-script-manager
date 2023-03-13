import { UserBuildings } from '../../types/api/UserBuildings';
import { apiGet } from '../../ts/helper/api';

const missionCounter = async function (): Promise<any> {
  /*
   * Copyright (c) 2022 by Ron31
   * missionCounter
   * Script for the browser-side of the rettungssimulator.online
   * Script Version: 0.9
   * Last Update: 2022-07-16
   */
  function updateCount() {
    const ownMissions = document.querySelectorAll(
      'div#missions-container-own div.mission-list-mission'
    );
    const sharedMissions = document.querySelectorAll(
      'div#missions-container-shared div.mission-list-mission'
    );
    const attendedMissions = document.querySelectorAll(
      'div#missions-container-shared div.mission-list-mission svg.mission-participation[class*="text"]'
    );
    // set Counts in text
    (document.getElementById('missionCount') as HTMLElement).innerText =
      ownMissions.length.toString();
    (
      document.getElementById('missionCountSharedAttended') as HTMLElement
    ).innerText = attendedMissions.length.toString();
    (document.getElementById('missionCountShared') as HTMLElement).innerText =
      sharedMissions.length.toString();
  }

  const aUserBuildings = (await apiGet(
    'userBuildings',
    localStorage
  )) as unknown as UserBuildings[];

  const f = (x: number) => Math.ceil(4 * Math.log2(x + 2) + 0.25 * x) - 4;
  let dep = aUserBuildings.filter(x =>
    GENERATING_BUILDING_IDS.includes(x.buildingType)
  );
  //document.querySelector('div[tab-id="ownMissions"]').style.width = null;
  //document.querySelector('div[tab-id="ownMissions"]').style.marginRight = '15px';
  //document.querySelector('span[tab-id="sharedMissions"]').parentElement.style.width = null;

  const span = document.querySelector('div[tab="ownMissions"]');
  const span2 = document.querySelector('div[tab="sharedMissions"]');
  const ownMissions = document.querySelectorAll(
    'div#missions-container-own div.mission-list-mission'
  );
  const sharedMissions = document.querySelectorAll(
    'div#missions-container-shared div.mission-list-mission'
  );
  const attendedMissions = document.querySelectorAll(
    'div#missions-container-shared div.mission-list-mission svg.mission-participation[class*="text"]'
  );
  span?.insertAdjacentHTML(
    'afterbegin',
    '<span class="badge-container"><span class="badge ncOpenMissions" style="color: #fff !important; background-color: red !important;"><span id="missionCount">' +
      ownMissions.length +
      '</span>/<span id="missionCountPossible">' +
      f(dep.length) +
      '</span></span></span>'
  );
  span2?.insertAdjacentHTML(
    'afterbegin',
    '<span class="badge-container"><span class="badge ncOpenMissions" style="color: #fff !important; background-color: red !important;"><span id="missionCountSharedAttended">' +
      attendedMissions.length +
      '</span>/<span id="missionCountShared">' +
      sharedMissions.length +
      '</span></span></span>'
  );

  socket.on('newMission', () => {
    updateCount();
  });

  socket.on('missionStatus', () => {
    setTimeout(updateCount, 1000);
  });

  socket.on('finishMission', () => {
    updateCount();
  });

  socket.on('departmentBuy', async () => {
    const aUserBuildings = (await apiGet(
      'userBuildings',
      localStorage,
      false
    )) as unknown as UserBuildings[];
    dep = aUserBuildings.filter(x =>
      GENERATING_BUILDING_IDS.includes(x.buildingType)
    );
    (document.querySelector('missionCountPossible') as HTMLElement).innerText =
      String(f(dep.length));
  });
};

export { missionCounter };
