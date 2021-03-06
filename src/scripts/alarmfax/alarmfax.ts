import { UserBuildings } from '../../types/api/UserBuildings';
import { VehicleFms } from '../../types/socket/VehicleFms';
import { variableIsNull, variableIsUndefined } from '../../ts/errors/console';

const alarmfax = async function (): Promise<any> {
  if (!localStorage.getItem('alarmfaxInfo')) {
    localStorage.setItem('alarmfaxInfo', JSON.stringify({}));
  }

  if (!localStorage.getItem('alarmfaxInfoMissionStatus')) {
    localStorage.setItem('alarmfaxInfoMissionStatus', JSON.stringify({}));
  }

  type UserBuildingData = Record<number, string>;

  type AlarmfaxInfo = Record<
    number,
    Record<
      number,
      {
        userMissionId: number;
        vehicleName: string;
        alarmTime: string;
        userBuildingName: string;
      }
    >
  >;

  if (!sessionStorage.getItem('alarmfaxInfoBuildingData')) {
    // eslint-disable-next-line no-undef
    await $.ajax({
      url: `/api/userBuildings`,
      dataType: 'json',
      type: 'GET',
      success(res: UserBuildings[]): void {
        const data: UserBuildingData = {};

        for (let i = 0; i < res.length; i++) {
          data[res[i].userBuildingID] = res[i].userBuildingName;
        }
        sessionStorage.setItem(
          'alarmfaxInfoBuildingData',
          JSON.stringify(data)
        );
      }
    });
  }

  const card = function (): void {
    if (document.querySelector('#alarmfax-card') === null) {
      const alarmfaxCard: HTMLDivElement = document.createElement('div');

      alarmfaxCard.classList.add('card', 'alarmfax');
      alarmfaxCard.id = 'alarmfax-card';
      const alarmfaxCardHeader: HTMLDivElement = document.createElement('div');

      alarmfaxCardHeader.classList.add('card-headline', 'card-headline-info');
      alarmfaxCardHeader.innerText = 'Alarmfax';
      alarmfaxCard.appendChild(alarmfaxCardHeader);
      const alarmfaxCardBody: HTMLDivElement = document.createElement('div');

      alarmfaxCardBody.classList.add('card-body');
      const alarmfaxCardBodyTable: HTMLTableElement =
        document.createElement('table');
      const alarmfaxCardBodyTableBody: HTMLTableSectionElement =
        document.createElement('tbody');

      alarmfaxCardBodyTable.appendChild(alarmfaxCardBodyTableBody);
      alarmfaxCardBody.appendChild(alarmfaxCardBodyTable);
      alarmfaxCard.appendChild(alarmfaxCardBody);
      const insertArea: HTMLDivElement | null = document.querySelector(
        'div.alarmed-vehicles'
      );

      if (insertArea === null) {
        variableIsNull(Object.keys({ insertArea })[0], 'alarmfax');

        return;
      }

      insertArea.insertBefore(alarmfaxCard, insertArea.firstChild);
    }
    const alarmfaxCardBody: HTMLTableSectionElement | null =
      document.querySelector('#alarmfax-card .card-body table tbody');

    if (alarmfaxCardBody === null) {
      variableIsNull(Object.keys({ alarmfaxCardBody })[0], 'alarmfax');

      return;
    }

    let innerHtmlContent = `<tr><th>Funkrufname</th><th>Wache</th><th>Alarmzeit</th></tr>`;
    const elements = JSON.parse(localStorage.getItem('alarmfaxInfo') ?? '{}');

    const userMissionIdParse: string[] = window.location.href.split('/');

    const userMissionId: string | undefined = userMissionIdParse.at(-1);

    if (userMissionId === undefined) {
      variableIsUndefined(Object.keys({ userMissionId })[0], 'alarmfax');

      return;
    }

    for (const elem in elements[userMissionId]) {
      innerHtmlContent += `<tr><td>${elements[userMissionId][elem].vehicleName}</td><td>${elements[userMissionId][elem].userBuildingName}</td><td>${elements[userMissionId][elem].alarmTime}</td></tr>`;
    }
    if (window.location.href.includes('/mission')) {
      alarmfaxCardBody.innerHTML = innerHtmlContent;
    }
  };

  const storeData = async function (
    vehicleFmsObject: VehicleFms
  ): Promise<void> {
    // Store important information
    const userMissionId = vehicleFmsObject.userMissionID;
    const vehicleId = vehicleFmsObject.userVehicleID;
    const vehicleName = vehicleFmsObject.userVehicleName;
    const userBuildingId = vehicleFmsObject.userDepartmentID;

    const userBuildingName = JSON.parse(
      sessionStorage.getItem('alarmfaxInfoBuildingData') ?? '{}'
    )[userBuildingId];
    const date = new Date();
    const alarmTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const localStorageObject: AlarmfaxInfo = JSON.parse(
      localStorage.getItem('alarmfaxInfo') ?? '{}'
    );

    if (!Object.keys(localStorageObject).includes(userMissionId.toString())) {
      localStorageObject[userMissionId] = {};
      localStorageObject[userMissionId][vehicleId] = {
        userMissionId,
        vehicleName,
        alarmTime,
        userBuildingName
      };
      localStorage.setItem('alarmfaxInfo', JSON.stringify(localStorageObject));
    } else if (
      Object.keys(localStorageObject[userMissionId]).includes(
        vehicleId.toString()
      )
    ) {
      localStorageObject[userMissionId][vehicleId] = {
        userMissionId,
        vehicleName,
        alarmTime,
        userBuildingName
      };
      localStorage.setItem('alarmfaxInfo', JSON.stringify(localStorageObject));
    }
    card();
  };

  const removeData = function (vehicleFmsObject: VehicleFms): void {
    // Remove important information
    const userMissionId = vehicleFmsObject.userMissionID;
    const userVehicleId = vehicleFmsObject.userVehicleID;
    const alarmFaxInfo: AlarmfaxInfo = JSON.parse(
      localStorage.getItem('alarmfaxInfo') ?? '{}'
    );

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete alarmFaxInfo[userMissionId][userVehicleId];
    localStorage.setItem('alarmfaxInfo', JSON.stringify(alarmFaxInfo));
    card();
  };

  socket.on(
    'vehicleFMS',
    async (vehicleFmsObject: VehicleFms): Promise<void> => {
      if (vehicleFmsObject.userVehicleFMS === 3) {
        await storeData(vehicleFmsObject);
      } else if (vehicleFmsObject.userVehicleFMS === 1) {
        removeData(vehicleFmsObject);
      }
    }
  );

  card();
};

export { alarmfax };
