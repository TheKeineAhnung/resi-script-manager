// TODO: @TheKeineAhnung add displaying vehicles of type lf
import { UserVehicles } from '../../types/api/UserVehicles';
import { variableIsNull } from '../../ts/errors/console';
import { VehicleCategories } from '../../types/api/VehicleCategories';

const userVehicles = async function (): Promise<any> {
  interface VehicleCountVehicles {
    value: Record<string, VehicleCategories>;
    lastUpdate: number;
  }

  interface CountVehicles {
    count: number;
    ids: number[];
    readableShortName: string;
  }

  const vehicleStats = async function (): Promise<void> {
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

    const assignVehicleCategories = async function (
      currentVehicle: UserVehicles
    ): Promise<void> {
      const id = currentVehicle.vehicleID;

      const categories: string | null =
        sessionStorage.getItem('aVehicleCategories');

      if (categories === null) {
        variableIsNull(Object.keys({ categories })[0], 'userVehicles');

        return;
      }

      const vehicles: VehicleCountVehicles = JSON.parse(categories);

      if (localStorage.getItem(`userVehicles-${String(id)}`)) {
        return;
      }

      for (const i in vehicles.value) {
        if (vehicles.value[i].ids.includes(id)) {
          localStorage.setItem(
            `userVehicles-${String(id)}`,
            vehicles.value[i].readableShortName
          );
        }
      }
    };

    const showCard = async function (): Promise<void> {
      const categories: string | null = sessionStorage.getItem('vehicles');

      if (categories === null) {
        variableIsNull(Object.keys({ categories })[0], 'userVehicles');

        return;
      }

      const vehicles: CountVehicles[] = JSON.parse(categories);

      const style: HTMLStyleElement = document.createElement('style');

      style.innerHTML =
        '.card-headline.card-headline-danger{background-color:#DB1111;color:#fff}.card';
      document.head.appendChild(style);
      const parentDiv: NodeListOf<HTMLDivElement> =
        document.querySelectorAll('.card-collapse');
      const parentDiv0 = parentDiv[0].parentNode;

      if (parentDiv0 === null) {
        variableIsNull(Object.keys({ parentDiv0 })[0], 'userVehicles');

        return;
      }

      const parentDiv1 = parentDiv[1];
      const showVehicleDiv: HTMLDivElement = document.createElement('div');

      showVehicleDiv.classList.add('card', 'card-collapse', 'collapsed');
      showVehicleDiv.innerHTML =
        '<div class="card-headline card-headline-danger">Fahrzeuge <i class="fas fa-angle-up card-collapse-toggle pointer right"></i></div><div class="card-body"><div class="element-container"><table class="striped table-divider" id="theadVehicles"><thead><tr><th style="text-align: center;">Typ</th><th style="text-align: center;">Anzahl</th></tr></thead></table></div></div>';
      parentDiv0.insertBefore(showVehicleDiv, parentDiv1);

      const thead: HTMLTableSectionElement | null =
        document.querySelector('#theadVehicles');

      if (thead === null) {
        variableIsNull(Object.keys({ thead })[0], 'userVehicles');

        return;
      }

      const tbody: HTMLTableSectionElement = document.createElement('tbody');

      tbody.style.width = '100%';

      for (const showVehicle in vehicles) {
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
      vehicleCategories: VehicleCountVehicles
    ): Promise<void> {
      if (sessionStorage.getItem('vehiclesUpdate') === null) {
        const lastUpdateVehicle = Date.now();

        sessionStorage.setItem('vehiclesUpdate', lastUpdateVehicle.toString());
      }

      const storageUpdateTime: number = Number.parseInt(
        sessionStorage.getItem('vehiclesUpdate') ?? String(Date.now()),
        10
      );

      if (
        sessionStorage.getItem('1') === null ||
        storageUpdateTime < storageUpdateTime - 86_400_000
      ) {
        const lastUpdateVehicle = Date.now();

        sessionStorage.setItem('vehiclesUpdate', lastUpdateVehicle.toString());
        const vehiclesInternal: Record<string, CountVehicles> = {};

        for (const elem in vehicleCategories.value) {
          const ids = vehicleCategories.value[elem].ids;

          if (
            !(ids.length <= 0) &&
            ids[0] < 10_000 &&
            (vehicleCategories.value[elem].roles.length === 0 ||
              vehicleCategories.value[elem].shortName === 'lgf')
          ) {
            vehiclesInternal[vehicleCategories.value[elem].shortName] = {
              readableShortName:
                vehicleCategories.value[elem].readableShortName,
              ids: vehicleCategories.value[elem].ids,
              count: 0
            };
          }
        }

        for (const key in vehicleCategories.value[1]) {
          vehiclesInternal[key].readableShortName =
            vehicleCategories.value[key].readableShortName;
          vehiclesInternal[key].ids = vehicleCategories.value[key].ids;
        }
        sessionStorage.setItem('vehicles', JSON.stringify(vehiclesInternal));
      }
    };

    const countVehicles = async function (
      userVehiclesParam: UserVehicles[]
    ): Promise<void> {
      const vehicleCategories: VehicleCountVehicles = JSON.parse(
        sessionStorage.getItem('aVehicleCategories') ?? '{}'
      );
      const stats: Record<string, CountVehicles> = JSON.parse(
        sessionStorage.getItem('vehicles') ?? '{}'
      );

      for (const elem of userVehiclesParam) {
        for (const key in vehicleCategories.value) {
          if (
            vehicleCategories.value[key].ids.includes(elem.vehicleID) &&
            (vehicleCategories.value[key].roles.length === 0 ||
              vehicleCategories.value[key].shortName === 'lgf')
          ) {
            stats[vehicleCategories.value[key].shortName].count += 1;
          }
        }
      }

      sessionStorage.setItem('vehicles', JSON.stringify(stats));
    };

    const vehicleCategories: VehicleCountVehicles = JSON.parse(
      sessionStorage.vehicleCategories
    );

    await saveVehicleCategories(vehicleCategories);

    // Get user vehicles
    // eslint-disable-next-line no-undef
    await $.ajax({
      url: '/api/userVehicles',
      dataType: 'json',
      type: 'GET',
      async success(data: UserVehicles[]): Promise<void> {
        for (const currentVehicle of data) {
          await assignVehicleCategories(currentVehicle);
        }
        await countVehicles(data);
        await showCard();
      }
    });
  };

  await vehicleStats();
};

export { userVehicles };
