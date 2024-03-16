import { Buildings } from '../../types/api/Buildings';
import { apiGet } from '../../ts/helper/api';

const autoCollapseBuildings = async function (): Promise<any> {
  let collapseBuildingTypes: number[];

  if (localStorage.getItem('autoCollapseBuildingsBuildingTypes')) {
    collapseBuildingTypes = JSON.parse(
      localStorage.getItem('autoCollapseBuildingsBuildingTypes') ?? '[]'
    );
  } else {
    const apiData = (await apiGet(
      'buildings',
      localStorage
    )) as unknown as Buildings[];
    collapseBuildingTypes = apiData.map(building => building.buildingID);
    localStorage.setItem(
      'autoCollapseBuildingsBuildingTypes',
      JSON.stringify(collapseBuildingTypes)
    );
  }

  for (const collapseBuildingType of collapseBuildingTypes) {
    const cards: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      `#departments .card[buildingtype='${collapseBuildingType}']`
    );
    cards.forEach(card => {
      card.classList.add('collapsed');
    });
  }
};

export { autoCollapseBuildings };
