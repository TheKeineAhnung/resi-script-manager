const autoCollapseBuildings = async function (): Promise<any> {
  let collapseBuildingTypes: number[];

  if (localStorage.getItem('autoCollapseBuildingsBuildingTypes')) {
    collapseBuildingTypes = JSON.parse(
      localStorage.getItem('autoCollapseBuildingsBuildingTypes') ?? '[]'
    );
  } else {
    collapseBuildingTypes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    localStorage.setItem(
      'autoCollapseBuildingsBuildingTypes',
      JSON.stringify(collapseBuildingTypes)
    );
  }
  const cards: NodeListOf<HTMLDivElement> =
    document.querySelectorAll('#departments .card');

  for (const actualFilter of collapseBuildingTypes) {
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].getAttribute('buildingtype') === actualFilter.toString()) {
        cards[i].classList.add('collapsed');
      }
    }
  }
};

export { autoCollapseBuildings };
