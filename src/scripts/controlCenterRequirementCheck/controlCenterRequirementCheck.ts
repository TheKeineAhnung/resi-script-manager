import { apiGet } from '../../ts/helper/api';
import type { Mission } from '../../types/api/Mission';
import type { UserBuildings } from '../../types/api/UserBuildings';
import type { UserVehicles } from '../../types/api/UserVehicles';
import type { VehicleCategories } from '../../types/api/VehicleCategories';

const controlCenterRequirementCheck = async function (): Promise<any> {
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
  const vehicleCategories: Record<string, VehicleCategories> = (await apiGet(
    'vehicleCategories',
    localStorage
  )) as unknown as Record<string, VehicleCategories>;
  const missions: Record<string, Mission> = (await apiGet(
    'missions',
    localStorage
  )) as unknown as Record<string, Mission>;

  const controlCenterBuildings = userBuildings.filter(
    e => e.assignedControlCenterID === userDepartmentId
  );

  const useableBuildingIds = controlCenterBuildings.map(e => e.userBuildingID);
  const useableVehicles = userVehicles.filter(e => {
    return useableBuildingIds.includes(e.userBuildingID) && e.fms !== 6;
  });

  const topRoles: Record<string, number> = {};
  Object.values(vehicleCategories)
    .filter(e => e.ids.length > 0)
    .forEach(e => {
      topRoles[e.shortName] = 0;
    });
  for (let i = 0; i < useableVehicles.length; i++) {
    const userVehicle = useableVehicles[i];
    const vehicleID = userVehicle.vehicleID;
    const topRole = Object.values(vehicleCategories).find(e => {
      return e.ids.includes(vehicleID);
    });
    topRoles[topRole?.shortName ?? ''] = topRoles[topRole?.shortName ?? '']
      ? topRoles[topRole?.shortName ?? ''] + 1
      : 1;
  }

  const generationRelevantRolesCount: Record<string, number> = {};
  for (const [key, value] of Object.entries(topRoles)) {
    const affectedRoles = Object.values(vehicleCategories).filter(e => {
      return e.roles.includes(key.toLowerCase());
    });

    for (let i = 0; i < affectedRoles.length; i++) {
      generationRelevantRolesCount[affectedRoles[i]?.shortName ?? ''] =
        generationRelevantRolesCount[affectedRoles[i]?.shortName ?? '']
          ? generationRelevantRolesCount[affectedRoles[i]?.shortName ?? ''] +
            value
          : value;
    }
  }

  for (const [key, value] of Object.entries(vehicleCategories)) {
    for (const role of value.roles) {
      if (topRoles[role] === undefined) {
        generationRelevantRolesCount[key] = generationRelevantRolesCount[key]
          ? generationRelevantRolesCount[key] +
              generationRelevantRolesCount[role] ?? 0
          : generationRelevantRolesCount[role];
      }
    }
  }

  for (const [key, value] of Object.entries(topRoles)) {
    generationRelevantRolesCount[key] = value;
  }

  const notGeneratableMissions: Mission[] = [];
  const missionsArray = Object.values(missions);
  for (let i = 0; i < missionsArray.length; i++) {
    const mission = missionsArray[i];

    if (mission.patients !== undefined) {
      let pushed = false;
      if (
        mission.patients.max > generationRelevantRolesCount['rtw'] ||
        ((mission.patients.naChance ?? 0) > 24 &&
          generationRelevantRolesCount['nef'] === 0)
      ) {
        notGeneratableMissions.push(mission);
        pushed = true;
      }
      if (pushed) {
        continue;
      }
    }

    for (const [key, value] of Object.entries(mission.neededVehicles)) {
      if (
        generationRelevantRolesCount[key] < value ||
        generationRelevantRolesCount[key] === undefined
      ) {
        notGeneratableMissions.push(mission);
        break;
      }
    }
  }

  const generatableMissions = Object.values(missions).filter(e => {
    return !notGeneratableMissions.map(e2 => e2.name).includes(e.name);
  });

  const renderObject: Record<number, { generatable: boolean; id: number }> = {};

  generatableMissions.forEach(e => {
    renderObject[e.id] = {
      generatable: true,
      id: e.id
    };
  });
  notGeneratableMissions.forEach(e => {
    renderObject[e.id] = {
      generatable: false,
      id: e.id
    };
  });

  const tabs = document.querySelector('div.tabs');
  const insertTab = document.createElement('div');
  insertTab.classList.add('tab');
  insertTab.setAttribute('for', 'generatableMissions');
  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-list', 'tab-icon');
  insertTab.insertAdjacentElement('afterbegin', icon);
  insertTab.innerHTML += 'Einsatzliste';
  tabs?.insertAdjacentElement('beforeend', insertTab);

  const tabContainer = document.querySelector('div.tab-container');

  const eventIdAssign: Record<number, string> = {
    1: 'Halloween',
    2: 'Weihnachten (fiktiv)',
    3: 'Winter',
    4: 'Silvester',
    5: 'Noch nicht verfügbar',
    6: 'Sommer',
    7: 'Ostern',
    8: 'Weihnachten (real)'
  };

  const tabContent = `<div id ="tab_generatableMissions" class="tab-content">
    <div class="tab-headline">Einsatzliste</div>
    <table class="stripped table-divider">
      <thead>
        <tr>
          <th></th>
          <th>Einsatzname</th>
          <th>Vergütung in Münzen</th>
          <th></th>
          <th>Event</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${(() => {
          let contentString = '';
          for (const e of Object.values(renderObject)) {
            const mission = missions[e.id];
            contentString += `
            <tr>
              <td name="icon"><img src="images/marker/missions/${
                mission.icon
              }_0.svg" class="mission-icon-transform" height="39"></td>
              <td name="name"><a href="missionOverview/${
                mission.id
              }" target="_blank">${mission.name}</a></td>
              <td name="name"><a href="missionOverview/${
                mission.id
              }" target="_blank">${mission.credits}</a></td>
              <td><span class="status ${
                e.generatable ? 's2' : 's4'
              }">Voraussetzungen ${
              !e.generatable ? 'nicht' : ''
            } erfüllt</span></td>
            <td name="event">${
              mission.event ? eventIdAssign[mission.event] : '-'
            }</td>
            <td name="name"><a href="missionOverview/${
              mission.id
            }" target="_blank">Mehr anzeigen</a></td>
            </tr>`;
          }
          return contentString;
        })()}
      </tbody>
    </table>
  </div>`;

  tabContainer?.insertAdjacentHTML('afterbegin', tabContent);
};

export { controlCenterRequirementCheck };
