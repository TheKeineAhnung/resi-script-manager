import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  variableIsNull,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  variableIsUndefined
} from '../../ts/errors/console';

const missionHelper = async function (): Promise<any> {
  /*
   * Copyright (c) 2022 by Ron31
   * missionHelper
   * Script for the browser-side of the rettungssimulator.online
   * Script Version: 1.4.0
   * Last Update: 2022-07-16
   */
  if (!sessionStorage.aVehicleCategories || JSON.parse(sessionStorage.aVehicleCategories).lastUpdate < (new Date().getTime() - 60 * 1000 * 60)) {
    await $.getJSON('/api/vehicleCategories').done(data => sessionStorage.setItem('aVehicleCategories', JSON.stringify({ lastUpdate: new Date().getTime(), value: data})));
  }
  const aVehicleCategories = JSON.parse(sessionStorage.aVehicleCategories).value;

  let style = document.createElement('style');
  style.innerText = '.card-headline.card-headline-info{background-color:#2196f3;color:#fff}.card';
  document.head.appendChild(style);
  let missionID = document.querySelector('.detail-title')?.getAttribute('missionid');
  await $.ajax({
    url: "/api/missions",
    dataType: "json",
    type : "GET",
    data: {
      "id": missionID
    },
    success : function(r) {
      showPanel(r);
    }
  });

  function showPanel(r: any) {
    let helper = document.createElement('div');
    helper.classList.add('card', 'missionHelper');
    helper.innerHTML = '<div class="card-headline card-headline-info">Mindestens benötigte Mittel</div><div class="card-body"><div class="alert alert-info"><div class="alert-content"><b>Anforderungen können sich durch Variationen ändern.</b></div></div><table id="missionHelper-' + missionID + '"></table><div class="alert alert-info"><div class="alert-content"><b>Generelle Informationen:</b></div></div><table id="informationHelper-' + missionID + '"></table></div>';
    let a = document.querySelector('.alarmed-vehicles');
    a?.insertAdjacentElement('afterbegin', helper);
    let table = document.querySelector('table#missionHelper-' + missionID);
    let tbody = document.createElement('tbody');
    let key, value;
    for ([key, value] of Object.entries(r.neededVehicles)) {
      let tr = document.createElement('tr');
      let number = document.createElement('td');
      number.innerText = String(value as number);
      let vehicle = document.createElement('td');
      vehicle.innerText = aVehicleCategories[key].name;
      tr.appendChild(number);
      tr.appendChild(vehicle)
      tbody.appendChild(tr);
    }
    table?.appendChild(tbody);

    let table2 = document.querySelector('table#informationHelper-' + missionID);
    let tbody2 = document.createElement('tbody');
    let tr = document.createElement('tr');
    let number = document.createElement('td');
    number.innerText = new Intl.NumberFormat('de-DE').format(r.credits) + " Münzen";
    let vehicle = document.createElement('td');
    vehicle.innerText = "Vergütung:";
    tr.appendChild(vehicle);
    tr.appendChild(number);
    tbody2.appendChild(tr);
    if(r.patients) {
      let tr2 = document.createElement('tr');
      let number2 = document.createElement('td');
      number2.innerText = r.patients.min === r.patients.max ? r.patients.max : r.patients.min + '-' + r.patients.max;
      let vehicle2 = document.createElement('td');
      vehicle2.innerText = "Patienten:";
      tr2.appendChild(vehicle2);
      tr2.appendChild(number2);
      tbody2.appendChild(tr2);
      if (r.patients.naChance !== 0) {
        let tr3 = document.createElement('tr');
        let number3 = document.createElement('td');
        number3.innerText = r.patients.naChance + '%';
        let vehicle3 = document.createElement('td');
        vehicle3.innerText = "Notarzt Chance:";
        tr3.appendChild(vehicle3);
        tr3.appendChild(number3);
        tbody2.appendChild(tr3);
      }
    }
    table2?.appendChild(tbody2);
  }
};

export { missionHelper };
