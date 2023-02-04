import { Mission } from '../../types/api/Mission';

const missionHelper = async function (): Promise<void> {
  //  * Copyright (c) 2022 by Ron31
  //  * missionHelper
  //  * Script for the browser-side of the rettungssimulator.online
  //  * Script Version: 1.4.0
  //  * Last Update: 2022-07-16

  if (
    !sessionStorage.aVehicleCategories ||
    JSON.parse(sessionStorage.aVehicleCategories).lastUpdate <
      new Date().getTime() - 60 * 1000 * 60
  ) {
    await $.getJSON('/api/vehicleCategories').done(data =>
      sessionStorage.setItem(
        'aVehicleCategories',
        JSON.stringify({ lastUpdate: new Date().getTime(), value: data })
      )
    );
  }
  const aVehicleCategories = JSON.parse(
    sessionStorage.aVehicleCategories
  ).value;

  const sortBy = {
    tlf_ab_tank: 0,
    lgf: 1,
    lf: 2,
    hlf: 3,
    rw_lf: 4,
    rw_lf_ab_rüst: 5,
    rw_hlf: 6,
    rw_hlf_ab_rüst: 6,
    'h*lf_rw_kef': 9,
    'h*lf_kef': 10,
    'h*lf_kef_mtw_gw_tier': 11,
    'h*lf_mtw': 12,
    kdow: 13,
    kdow_mzf: 14,
    elw1_kdow_mzf: 15,
    elw1_kdow: 16,
    elw1: 17,
    führungsdienst: 18,
    elw_elw2: 19,
    dlk: 20,
    dlk_tmf: 21,
    tmf: 22,
    elw2_ab_el: 25,
    sw_ab_schlauch: 29,
    sw_tlf_ab_tank_ab_schlauch: 30,
    rw_ab_rüst: 34,
    'rw_rw-k_ab_rüst': 35,
    gw_tier: 36,
    gw_tier_mtw: 37,
    gw_tier_lf: 38,
    gw_öl_gw_g_ab_öl_ab_g: 41,
    gw_g_ab_g: 50,
    gw_mess: 51,
    gw_a_ab_a: 52,
    gw_dekon_ab_dekon: 53,
    gw_h: 54,
    kef: 57,
    gw_öl_ab_öl: 70,
    'h*lf_rw_kef_gw_öl_ab_rüst_ab_öl': 71,
    kran: 74,
    'rw-k': 75,
    fwk: 76,
    pol: 80,
    fustw: 81,
    lpol: 82,
    bpol: 83,
    mtw: 2000,
    mzf: 2001,
    mtw_mzf: 2002,
    sonstiges: 2003,
    rtw: 2004,
    nef: 2005,
    na: 2006,
    rd: 2007,
    na_standort: 2008,
    gws: 2009,
    sonstigesSub: 2010
  };

  const style = document.createElement('style');
  style.innerText =
    '.card-headline.card-headline-info{background-color:#2196f3;color:#fff}.card';
  document.head.appendChild(style);
  const missionID = document
    .querySelector('.detail-title')
    ?.getAttribute('missionid');
  await $.ajax({
    url: '/api/missions',
    dataType: 'json',
    type: 'GET',
    data: {
      id: missionID
    },
    success: function (result: Mission) {
      showPanel(result);
    }
  });

  function compare(a: string, b: string): number {
    const aVal = sortBy[a as never];
    const bVal = sortBy[b as never];
    if (aVal < bVal) {
      return -1;
    }
    if (aVal > bVal) {
      return 1;
    }
    return 0;
  }

  function showPanel(r: Mission) {
    const hideHintUsers: string[] = ['KeineAhnung', 'Ron31'];

    const helper = document.createElement('div');
    helper.classList.add('card', 'missionHelper');
    helper.innerHTML = `<div class="card-headline card-headline-info">Mindestens benötigte Mittel</div>
      <div class="card-body">
          ${
            !hideHintUsers.includes(ReSi.userName)
              ? `<div class="alert alert-info">
                  <div class="alert-content"><b>Anforderungen können sich durch Variationen ändern.</b></div>
                </div>`
              : ''
          }
        <table id="missionHelper-${missionID}"></table>
        <div class="alert alert-info"><div class="alert-content"><b>Generelle Informationen:</b></div></div>
        <table id="informationHelper-${missionID}"></table>
      </div>
    `;

    const a = document.querySelector('.alarmed-vehicles');
    a?.insertAdjacentElement('afterbegin', helper);
    const table = document.querySelector('table#missionHelper-' + missionID);
    const tbody = document.createElement('tbody');
    tbody.style.display = 'table-row';
    const needed = Object.keys(r.neededVehicles)
      .sort(compare)
      .reduce((obj, key: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        obj[key] = r.neededVehicles[key];
        return obj;
      }, {});
    let key, value;
    for ([key, value] of Object.entries(needed)) {
      const tr = document.createElement('tr');
      const number = document.createElement('td');
      number.innerText = String(value as number);
      number.style.padding = '2px 10px 2px 0';
      const vehicle = document.createElement('td');
      vehicle.innerText = aVehicleCategories[key].name;
      vehicle.style.padding = '2px 0';
      tr.appendChild(number);
      tr.appendChild(vehicle);
      tbody.appendChild(tr);
    }
    table?.appendChild(tbody);

    const table2 = document.querySelector(
      'table#informationHelper-' + missionID
    );
    const tbody2 = document.createElement('tbody');
    const tr = document.createElement('tr');
    const number = document.createElement('td');
    number.innerText =
      new Intl.NumberFormat('de-DE').format(r.credits) +
      ' Münzen (80%: ' +
      new Intl.NumberFormat('de-DE').format(r.credits * 0.8) +
      ')';
    const vehicle = document.createElement('td');
    vehicle.innerText = 'Vergütung:';
    tr.appendChild(vehicle);
    tr.appendChild(number);
    tbody2.appendChild(tr);
    if (r.patients) {
      const tr2 = document.createElement('tr');
      const number2 = document.createElement('td');
      number2.innerText =
        r.patients.min === r.patients.max
          ? String(r.patients.max)
          : r.patients.min + '-' + r.patients.max;
      const vehicle2 = document.createElement('td');
      vehicle2.innerText = 'Patienten:';
      tr2.appendChild(vehicle2);
      tr2.appendChild(number2);
      tbody2.appendChild(tr2);
      if (r.patients.naChance !== 0) {
        const tr3 = document.createElement('tr');
        const number3 = document.createElement('td');
        number3.innerText = r.patients.naChance + '%';
        const vehicle3 = document.createElement('td');
        vehicle3.innerText = 'Notarzt Chance:';
        tr3.appendChild(vehicle3);
        tr3.appendChild(number3);
        tbody2.appendChild(tr3);
      }
    }
    table2?.appendChild(tbody2);
  }
};

export { missionHelper };
