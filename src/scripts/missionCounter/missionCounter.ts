import { UserBuildings } from '../../types/api/UserBuildings';

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
    // @ts-ignore
    document.getElementById('missionCount').innerText =
      ownMissions.length.toString();
    // @ts-ignore
    document.getElementById('missionCountSharedAttended').innerText =
      attendedMissions.length.toString();
    // @ts-ignore
    document.getElementById('missionCountShared').innerText =
      sharedMissions.length.toString();
  }

  if (
    !localStorage.aBuildings ||
    JSON.parse(localStorage.aBuildings).lastUpdate <
      new Date().getTime() - 5 * 1000 * 60
  )
    await $.getJSON('/api/userBuildings').done(data =>
      localStorage.setItem(
        'aBuildings',
        JSON.stringify({ lastUpdate: new Date().getTime(), value: data })
      )
    );
  const aBuildings: Array<UserBuildings> = JSON.parse(
    localStorage.aBuildings
  ).value;
  const f = (x: number) => Math.ceil(4 * Math.log2(x + 2) + 0.05 * x) - 4;
  let dep = aBuildings.filter(x =>
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
    await $.getJSON('/api/userBuildings').done(data =>
      localStorage.setItem(
        'aBuildings',
        JSON.stringify({ lastUpdate: new Date().getTime(), value: data })
      )
    );
    const aBuildings = JSON.parse(localStorage.aBuildings)
      .value as Array<UserBuildings>;
    dep = aBuildings.filter(x =>
      GENERATING_BUILDING_IDS.includes(x.buildingType)
    );
    // @ts-ignore
    document.querySelector('missionCountPossible').innerText = f(dep.length);
  });
};

export { missionCounter };
