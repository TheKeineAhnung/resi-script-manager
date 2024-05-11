import { UserVehicles } from '../../types/api/UserVehicles';
import { variableIsNull } from '../../ts/errors/console';
import { VehicleCategories } from '../../types/api/VehicleCategories';
import { apiGet } from '../../ts/helper/api';
import type { UserBuildings } from '../../types/api/UserBuildings';

// eslint-disable-next-line no-unused-vars
const userVehiclesCC = async function (): Promise<any> {
  interface CountVehicles {
    count: number;
    ids: number[];
    readableShortName: string;
  }

  const vehicleCategories: Record<string, VehicleCategories> = (await apiGet(
    'vehicleCategories',
    localStorage
  )) as unknown as Record<string, VehicleCategories>;

  const vehicleStats = async function (): Promise<void> {
    const assignVehicleCategories = async function (
      currentVehicle: UserVehicles
    ): Promise<void> {
      const id = currentVehicle.vehicleID;
      const vehicles = vehicleCategories;

      if (localStorage.getItem(`userVehiclesCC-${String(id)}`)) {
        return;
      }

      for (const i in vehicles.value) {
        if (vehicles[i].ids.includes(id)) {
          localStorage.setItem(
            `userVehiclesCC-${String(id)}`,
            vehicles[i].readableShortName
          );
        }
      }
    };

    const showCard = async function (): Promise<void> {
      const categories: string | null = sessionStorage.getItem('vehiclesCC');

      if (categories === null) {
        variableIsNull(Object.keys({ categories })[0], 'userVehiclesCC');

        return;
      }

      const vehicles: CountVehicles[] = JSON.parse(categories);

      const style: HTMLStyleElement = document.createElement('style');

      style.innerHTML =
        '.card-headline.card-headline-danger{background-color:#DB1111;color:#fff}.card';
      document.head.appendChild(style);
      let parentDiv = document.querySelector('#tab_controlCenter_stats');
      if (parentDiv == null) {
        parentDiv = document.createElement('div');
        parentDiv.id = 'tab_controlCenter_stats';
        parentDiv.classList.add('tab-content');
        document
          .querySelector('.tab-container')
          ?.insertAdjacentElement('beforeend', parentDiv);
        parentDiv.insertAdjacentHTML(
          'beforeend',
          '<div class="tab-headline">Stastistiken</div><div class="label"></div>'
        );
      }
      const parentDiv0 = parentDiv?.querySelector('.label');

      if (parentDiv0 === null) {
        variableIsNull(Object.keys({ parentDiv0 })[0], 'userVehiclesCC');

        return;
      }

      const showVehicleDiv: HTMLDivElement = document.createElement('div');

      showVehicleDiv.classList.add('card', 'card-collapse', 'collapsed');
      showVehicleDiv.innerHTML =
        '<div class="card-headline card-headline-danger">Fahrzeuge <i class="fas fa-angle-up card-collapse-toggle pointer right"></i></div><div class="card-body"><div class="element-container"><table class="striped table-divider" id="theadVehicles"><thead><tr><th style="text-align: center;">Typ</th><th style="text-align: center;">Anzahl</th></tr></thead></table></div></div>';
      parentDiv0?.insertAdjacentElement('afterend', showVehicleDiv);
      parentDiv0?.remove();

      const thead: HTMLTableSectionElement | null =
        document.querySelector('#theadVehicles');

      if (thead === null) {
        variableIsNull(Object.keys({ thead })[0], 'userVehicles');

        return;
      }

      const tbody: HTMLTableSectionElement = document.createElement('tbody');

      tbody.style.width = '100%';

      for (const showVehicle in vehicles) {
        if (vehicles[showVehicle].count === 0) continue;
        const tr: HTMLTableRowElement = document.createElement('tr');
        const type: HTMLTableCellElement = document.createElement('td');
        const count: HTMLTableCellElement = document.createElement('td');

        type.style.textAlign = 'center';
        type.style.width = '50%';

        count.style.textAlign = 'center';
        count.style.width = '50%';
        type.innerText = vehicles[showVehicle].readableShortName;
        count.innerText = vehicles[showVehicle].count.toString();
        tr.appendChild(type);
        tr.appendChild(count);
        tbody.appendChild(tr);
      }
      thead.appendChild(tbody);
    };

    const saveVehicleCategories = async function (
      vehicleCategories: Record<string, VehicleCategories>
    ): Promise<void> {
      if (sessionStorage.getItem('vehiclesUpdateCC') === null) {
        const lastUpdateVehicle = Date.now();

        sessionStorage.setItem(
          'vehiclesUpdateCC',
          lastUpdateVehicle.toString()
        );
      }

      const storageUpdateTime: number = Number.parseInt(
        sessionStorage.getItem('vehiclesUpdateCC') ?? String(Date.now()),
        10
      );

      if (
        sessionStorage.getItem('1') === null ||
        storageUpdateTime < storageUpdateTime - 86_400_000
      ) {
        const lastUpdateVehicle = Date.now();

        sessionStorage.setItem(
          'vehiclesUpdateCC',
          lastUpdateVehicle.toString()
        );
        const vehiclesInternal: Record<string, CountVehicles> = {};

        for (const elem in vehicleCategories) {
          const ids = vehicleCategories[elem].ids;

          if (
            !(ids.length <= 0) &&
            ids[0] < 10_000 &&
            (vehicleCategories[elem].roles.length === 0 ||
              vehicleCategories[elem].shortName === 'lgf')
          ) {
            vehiclesInternal[vehicleCategories[elem].shortName] = {
              readableShortName: vehicleCategories[elem].readableShortName,
              ids: vehicleCategories[elem].ids,
              count: 0
            };
          }
        }

        for (const key in vehicleCategories[1]) {
          vehiclesInternal[key].readableShortName =
            vehicleCategories[key].readableShortName;
          vehiclesInternal[key].ids = vehicleCategories[key].ids;
        }
        sessionStorage.setItem('vehiclesCC', JSON.stringify(vehiclesInternal));
      }
    };

    const countVehicles = async function (
      userVehiclesParam: UserVehicles[]
    ): Promise<void> {
      const stats: Record<string, CountVehicles> = JSON.parse(
        sessionStorage.getItem('vehiclesCC') ?? '{}'
      );

      for (const elem of userVehiclesParam) {
        for (const key in vehicleCategories) {
          //console.log('key', key);
          if (
            vehicleCategories[key].ids.includes(elem.vehicleID) &&
            (vehicleCategories[key].roles.length === 0 ||
              vehicleCategories[key].shortName === 'lgf')
          ) {
            //console.log(stats);
            stats[vehicleCategories[key].shortName].count += 1;
          }
        }
      }

      sessionStorage.setItem('vehiclesCC', JSON.stringify(stats));
    };

    await saveVehicleCategories(vehicleCategories);

    // Get user buildings of this controlCenter
    const userBuildings: UserBuildings[] = (await apiGet(
      'userBuildings',
      localStorage,
      false
    )) as unknown as UserBuildings[];

    const userDepartmentId = parseInt(
      document
        .querySelector('[userdepartmentid]')
        ?.getAttribute('userdepartmentid') ?? '0'
    );

    const departmentType = userBuildings.find(
      e => e.userBuildingID === userDepartmentId
    )?.buildingType;

    if (departmentType !== 8) {
      return;
    }

    const userVehicles: UserVehicles[] = (await apiGet(
      'userVehicles',
      sessionStorage,
      false
    )) as unknown as UserVehicles[];

    const controlCenterBuildings = userBuildings.filter(
      e => e.assignedControlCenterID === userDepartmentId
    );

    const useableBuildingIds = controlCenterBuildings.map(
      e => e.userBuildingID
    );
    const useableVehicles = userVehicles.filter(e => {
      return useableBuildingIds.includes(e.userBuildingID) && e.fms !== 6;
    });

    for (const currentVehicle of useableVehicles) {
      await assignVehicleCategories(currentVehicle);
    }
    await countVehicles(useableVehicles);
    await showCard();
  };

  await vehicleStats();
};

export { userVehiclesCC };
