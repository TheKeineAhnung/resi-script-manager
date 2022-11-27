import {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  variableIsNull,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  variableIsUndefined
} from '../../ts/errors/console';
import type { UserVehicles } from '../../types/api/UserVehicles';
import type { VehicleBuy } from '../../types/socket/VehicleBuy';
import type { VehicleFms } from '../../types/socket/VehicleFms';

const countVehicleStatus = async function (): Promise<any> {
  let vehicleStatus: Record<
    number,
    { count: number; userVehicleIDs: number[] }
  > = {
    1: { count: 0, userVehicleIDs: [] },
    2: { count: 0, userVehicleIDs: [] },
    3: { count: 0, userVehicleIDs: [] },
    4: { count: 0, userVehicleIDs: [] },
    5: { count: 0, userVehicleIDs: [] },
    6: { count: 0, userVehicleIDs: [] },
    7: { count: 0, userVehicleIDs: [] },
    8: { count: 0, userVehicleIDs: [] }
  };

  const initCounting = async function () {
    const aVehicles: UserVehicles[] = await $.getJSON('/api/userVehicles');

    aVehicles.forEach(vehicle => {
      vehicleStatus[vehicle.fms].count++;
      vehicleStatus[vehicle.fms].userVehicleIDs.push(vehicle.userVehicleID);
    });
  };

  const createInfobar = function () {
    const parent: HTMLDivElement | null = document.querySelector(
      'div#radio div.panel-headline'
    );

    if (parent === null) {
      variableIsNull(Object.keys({ parent })[0], 'countVehicleStatus.ts');

      return;
    }

    parent.style.display = 'flex';

    const infoContainer: HTMLDivElement = document.createElement('div');
    infoContainer.id = 'vehicleStatusCountContainer';
    infoContainer.classList.add('vehicle');
    infoContainer.style.display = 'flex';
    infoContainer.style.justifyContent = 'space-evenly';
    infoContainer.style.alignItems = 'center';
    infoContainer.style.width = '100%';
    infoContainer.style.fontSize = '1rem';
    infoContainer.style.margin = '0';

    for (const key of Object.keys(vehicleStatus)) {
      const statusContainer = document.createElement('div');
      statusContainer.classList.add(
        'vehicle-status',
        `s${[5].includes(parseInt(key)) ? '1' : key}`
      );
      statusContainer.id = `vehicleStatusCountStatus${key}`;
      statusContainer.setAttribute('data-tooltip', `Status: ${key}`);
      infoContainer.insertAdjacentElement('beforeend', statusContainer);
    }

    parent.insertAdjacentElement('beforeend', infoContainer);
  };

  const updateInfobar = function () {
    let parent: HTMLDivElement | null = document.querySelector(
      '#vehicleStatusCountContainer'
    );
    if (parent === null) {
      createInfobar();
      parent = document.querySelector('#vehicleStatusCountContainer');
      if (parent === null) return;
    }

    for (const key of Object.keys(vehicleStatus)) {
      const statusContainer: HTMLDivElement | null = document.querySelector(
        `#vehicleStatusCountStatus${key}`
      );

      if (statusContainer === null) {
        variableIsNull(
          Object.keys({ statusContainer })[0],
          'countVehicleStatus.ts'
        );

        return;
      }

      statusContainer.textContent =
        vehicleStatus[parseInt(key)].count.toString();
    }
  };

  await initCounting();
  createInfobar();
  updateInfobar();

  socket.on('vehicleFMS', (vehicleFMSObject: VehicleFms) => {
    for (let key = 1; key <= 8; key++) {
      if (
        vehicleStatus[key].userVehicleIDs.includes(
          vehicleFMSObject.userVehicleID
        )
      ) {
        const index = vehicleStatus[key].userVehicleIDs.indexOf(
          vehicleFMSObject.userVehicleID
        );
        vehicleStatus[key].userVehicleIDs.splice(index, 1);
        vehicleStatus[key].count--;
        break;
      }
    }
    vehicleStatus[vehicleFMSObject.userVehicleFMS].userVehicleIDs.push(
      vehicleFMSObject.userVehicleID
    );
    vehicleStatus[vehicleFMSObject.userVehicleFMS].count++;
    updateInfobar();
  });

  socket.on('vehicleBuy', (vehicleBuyObject: VehicleBuy) => {
    vehicleStatus[2].count++;
    vehicleStatus[2].userVehicleIDs.push(vehicleBuyObject.userVehicleID);
    updateInfobar();
  });

  socket.on('vehicleDelete', () => {
    vehicleStatus = {
      1: { count: 0, userVehicleIDs: [] },
      2: { count: 0, userVehicleIDs: [] },
      3: { count: 0, userVehicleIDs: [] },
      4: { count: 0, userVehicleIDs: [] },
      5: { count: 0, userVehicleIDs: [] },
      6: { count: 0, userVehicleIDs: [] },
      7: { count: 0, userVehicleIDs: [] },
      8: { count: 0, userVehicleIDs: [] }
    };
    initCounting();
    updateInfobar();
  });
};

export { countVehicleStatus };
