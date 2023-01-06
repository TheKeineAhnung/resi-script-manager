const selectedVehicles = async function (): Promise<void> {
  /*
   * Copyright (c) 2022 by Ron31
   * Scripts for the browser-side of the ReSi-Scripts
   * Script Version: 1.0
   * Last Update: 2022-09-11
   */

  const targetNode = document.querySelector(
    '#mission-vehicle-group-by-vehicle .mission-vehicles-list'
  );

  if (targetNode === null) return;

  const belowAAO: string | null = localStorage.getItem('showBelowAAO');

  const belowAAOSetting = belowAAO === 'true';

  const showDistance: string | null = localStorage.getItem('showDistance');

  const showDistanceSetting = showDistance === 'true';

  const config = { attributes: true, subtree: true };

  const callback = (mutationList: any) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'attributes') {
        if (mutation.attributeName === 'class') {
          if (
            mutation.target.classList.contains('mission-vehicle-selected') &&
            !mutation.target.classList.contains(
              'mission-vehicle-involved-enroute'
            )
          ) {
            const tr = document.createElement('tr');
            tr.classList.add(
              'vehicle' + mutation.target.getAttribute('uservehicleid')
            );
            tr.innerHTML = `<td>${
              mutation.target.querySelector('.vehicle-name').innerText
            }</td><td>${
              mutation.target.querySelector('.vehicle-status').innerText
            }</td><td>${
              mutation.target.querySelector('.vehicle-department').innerText
            }</td>${
              showDistanceSetting
                ? '<td>' +
                  mutation.target.querySelector('.vehicle-distance').innerText +
                  '</td>'
                : ''
            }`;
            const table = document.querySelector(
              'table#selectedVehiclePanel tbody'
            );
            table?.appendChild(tr);
          } else {
            document
              .querySelector(
                'tr.vehicle' + mutation.target.getAttribute('uservehicleid')
              )
              ?.remove();
          }
        }
      }
    }
  };

  const observer = new MutationObserver(callback);

  function showPanel() {
    const helper = document.createElement('div');
    helper.classList.add('card', 'selectedVehiclePanel');
    helper.innerHTML =
      '<div class="card-headline card-headline-info">Ausgewählte Fahrzeuge</div><div class="card-body"><table id="selectedVehiclePanel' +
      `"><tr><th>Funkrufname</th><th>Status</th><th>Wache</th>${
        showDistanceSetting ? '<th>Distanz</th>' : ''
      }</tr></table></div>`;
    if (!belowAAOSetting) {
      const a = document.querySelector('.alarmed-vehicles');
      a?.insertAdjacentElement('beforeend', helper);
    } else {
      const a = document.querySelector('.mission-aao-container');
      a?.insertAdjacentElement('afterend', helper);
    }
    const table = document.querySelector('table#selectedVehiclePanel tbody');
    const vehicles = document.querySelectorAll(
      '.mission-vehicles-list .mission-vehicle-selected'
    );
    vehicles.forEach(vehicle => {
      const tr = document.createElement('tr');
      tr.classList.add('vehicle' + vehicle.getAttribute('uservehicleid'));
      tr.innerHTML = `<td>${
        (vehicle.querySelector('.vehicle-name') as HTMLElement)?.innerText
      }</td><td>${
        (vehicle.querySelector('.vehicle-status') as HTMLElement)?.innerText
      }
      }</td><td>${
        (vehicle.querySelector('.vehicle-department') as HTMLElement)?.innerText
      }</td>${
        showDistanceSetting
          ? '<td>' +
            (vehicle.querySelector('.vehicle-distance') as HTMLElement)
              ?.innerText +
            '</td>'
          : ''
      }`;
      table?.appendChild(tr);
    });
  }

  showPanel();
  observer.observe(targetNode, config);
};

export { selectedVehicles };
