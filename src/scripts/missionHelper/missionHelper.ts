import { Mission } from '../../types/api/Mission';
import { apiGet } from '../../ts/helper/api';

const missionHelper = async function (): Promise<void> {
  //  * Copyright (c) 2022 by Ron31
  //  * missionHelper
  //  * Script for the browser-side of the rettungssimulator.online
  //  * Script Version: 1.4.0
  //  * Last Update: 2022-07-16

  const aVehicleCategories = (await apiGet(
    'vehicleCategories',
    localStorage
  )) as any;

  const sortBy = {
    tlf_ab_tank: 0,
    lgf: 1,
    lf: 2,
    hlf: 3,
    rw_lf: 4,
    rw_lf_ab_rüst: 5,
    rw_hlf: 6,
    rw_hlf_ab_rüst: 6,
    'h*lf_kef': 7,
    hlf_rw_kef_ab_rüst: 8,
    'h*lf_rw_kef_gw_öl_ab_rüst_ab_öl': 9,
    'h*lf_kef_mtw_gw_tier': 10,
    'h*lf_rw_ab_rüst_kef': 11,
    hlf_rw_kef_ab_rüst_mtw: 12,
    'h*lf_mtw': 14,
    kdow: 15,
    kdow_mzf: 16,
    elw1_kdow_mzf: 17,
    elw1_kdow: 18,
    elw1: 19,
    führungsdienst: 20,
    elw_elw2: 21,
    dlk: 22,
    dlk_tmf: 23,
    tmf: 24,
    elw2_ab_el: 27,
    sw_ab_schlauch: 29,
    sw_tlf_ab_tank_ab_schlauch: 30,
    rw_ab_rüst: 34,
    'rw_rw-k_ab_rüst': 35,
    gw_tier: 36,
    gw_tier_mtw: 37,
    gw_tier_lf: 38,
    'h*lf_kef_gw_tier': 39,
    gw_öl_gw_g_ab_öl_ab_g: 41,
    gw_g_ab_g: 50,
    gw_mess: 51,
    gw_a_ab_a: 52,
    gw_dekon_ab_dekon: 53,
    gw_h: 54,
    kef: 57,
    gw_öl_ab_öl: 70,
    kran: 74,
    'rw-k': 75,
    fwk: 76,
    pol: 80,
    pol_all: 81,
    pol_dhufuekw: 83,
    fustw: 90,
    lpol: 100,
    lpol_dhufuekw: 101,
    bpol: 200,
    bpol_dhufuekw: 201,
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
  const missionID =
    document.querySelector('.detail-title')?.getAttribute('missionid') ?? '0';
  const missions = (await apiGet(
    'missions',
    localStorage
  )) as unknown as Mission[];
  showPanel(missions[parseInt(missionID)]);

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
    if (r.maxCredits != null && r.maxCredits !== r.credits) {
      const number2 = document.createElement('td');
      number2.innerText =
        new Intl.NumberFormat('de-DE').format(r.maxCredits) +
        ' Münzen (80%: ' +
        new Intl.NumberFormat('de-DE').format(r.maxCredits * 0.8) +
        ')';
      const vehicle2 = document.createElement('td');
      vehicle2.innerText = 'Max. mögliche Variantenvergütung:';
      tr.appendChild(vehicle2);
      tr.appendChild(number2);
    }
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
