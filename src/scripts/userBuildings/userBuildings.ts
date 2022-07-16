import { Buildings } from '../../types/api/Buildings';
import { UserBuildings } from '../../types/api/UserBuildings';
import { variableIsNull } from '../../ts/errors/console';

const userBuildings = async function (): Promise<any> {
  interface BuildingCountBuildings {
    userBuildings: UserBuildings[];
    update: number;
  }

  type CountBuildings = Record<
    number,
    {
      buildingName: string;
      organisation: string;
      buildingCategory: string;
      count: number;
    }
  >;

  const storeBuildingTypes = async function (): Promise<void> {
    const builingTypes = await (await fetch('/api/buildings')).json();

    localStorage.setItem(
      'buildingCountBuildingCategories',
      JSON.stringify(builingTypes)
    );
  };

  const buildingCount = async function (): Promise<void> {
    const buildings = await (await fetch('/api/userBuildings')).json();
    const object: BuildingCountBuildings = {
      userBuildings: buildings,
      update: Date.now()
    };

    localStorage.setItem('buildingCountBuildings', JSON.stringify(object));
  };

  const buildingStats = async function (): Promise<void> {
    const buildings: BuildingCountBuildings = JSON.parse(
      localStorage.getItem('buildingCountBuildings') ??
        `{userBuildings: ${await (
          await fetch('/api/userBuildings')
        ).json()}, update: ${Date.now()}`
    );
    const buildingCategories: Buildings[] = JSON.parse(
      localStorage.getItem('buildingCountBuildingCategories') ??
        `${await await (await fetch('/api/userBuildings')).json()}`
    );

    const countedBuildings: CountBuildings = {};

    for (const elem of buildingCategories) {
      countedBuildings[elem.buildingID] = {
        buildingName: elem.buildingName,
        organisation: elem.organisationName,
        buildingCategory: elem.buildingCategory,
        count: 0
      };
    }

    for (let i = 0; i < buildings.userBuildings.length; i++) {
      countedBuildings[buildings.userBuildings[i].buildingType].count++;
    }

    const parentDiv: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      'body div.iframe-content div.card-collapse'
    );

    const parentDiv0 = parentDiv[0].parentNode;

    if (parentDiv0 === null) {
      variableIsNull(Object.keys({ parentDiv0 })[0], 'userBuildings');

      return;
    }

    const parentDiv1 = parentDiv[1];
    const showBuildingDiv: HTMLDivElement = document.createElement('div');

    showBuildingDiv.classList.add('card', 'card-collapse', 'collapsed');
    showBuildingDiv.innerHTML =
      '<div class="card-headline card-headline-danger">Gebäude <i class="fas fa-angle-up card-collapse-toggle pointer right"></i></div><div class="card-body"><div class="element-container"><table class="striped table-divider" id="theadBuildings"><thead><tr><th style="text-align: center;">Typ</th><th style="text-align: center;">Anzahl</th></tr></thead></table></div></div>';
    parentDiv0.insertBefore(showBuildingDiv, parentDiv1);
    const thead: HTMLTableSectionElement | null =
      document.querySelector('#theadBuildings');

    if (thead === null) {
      variableIsNull(Object.keys({ thead })[0], 'userBuildings');

      return;
    }

    const tbody: HTMLTableSectionElement = document.createElement('tbody');

    tbody.style.width = '100%';

    for (const elem in countedBuildings) {
      const tr: HTMLTableRowElement = document.createElement('tr');
      const type: HTMLTableCellElement = document.createElement('td');

      type.style.textAlign = 'center';
      type.style.width = '50%';

      const count: HTMLTableCellElement = document.createElement('td');

      if (countedBuildings[elem].buildingName.endsWith('e')) {
        type.innerText = `${countedBuildings[elem].buildingName}n`;
      } else if (countedBuildings[elem].buildingName.endsWith('haus')) {
        type.innerText = countedBuildings[elem].buildingName.replace(
          'haus',
          'häuser'
        );
      } else if (countedBuildings[elem].buildingName.endsWith('ort')) {
        type.innerText = countedBuildings[elem].buildingName.replace(
          'ort',
          'orte'
        );
      } else {
        type.innerText = countedBuildings[elem].buildingName;
      }

      count.style.textAlign = 'center';
      count.style.width = '50%';

      count.innerText = countedBuildings[elem].count.toString();

      tr.appendChild(type);
      tr.appendChild(count);
      tbody.appendChild(tr);
    }
    thead.appendChild(tbody);
  };

  await buildingStats();

  const linkElem: HTMLLinkElement | null = document.querySelector('link[rel]');

  if (linkElem === null) {
    variableIsNull(Object.keys({ linkElem })[0], 'userBuildings');

    return;
  }

  const storageGameVersion: string | null = localStorage.getItem(
    'buildingCountGameversion'
  );

  let gameVersion: string | null = new URLSearchParams(
    `?${linkElem.href.split('?')[1]}`
  ).get('v');

  if (gameVersion === null) {
    gameVersion = '0.0.0';
  }

  if (storageGameVersion === null || storageGameVersion < gameVersion) {
    localStorage.setItem('buildingCountGameversion', gameVersion);
    await storeBuildingTypes();
  }

  const buildingCountBuildingsStorage: BuildingCountBuildings = JSON.parse(
    localStorage.getItem('buildingCountBuildings') ??
      `{userBuildings: ${await (
        await fetch('/api/userBuildings')
      ).json()}, update: ${Date.now()}}`
  );
  const lastUpdateTime = Number(buildingCountBuildingsStorage.update);

  if (
    localStorage.getItem('buildingCountBuildings') === null ||
    lastUpdateTime < Date.now() - 86_400
  ) {
    await buildingCount();
  }
};

export { userBuildings };
