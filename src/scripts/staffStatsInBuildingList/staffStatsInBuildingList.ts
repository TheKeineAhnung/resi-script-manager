import { apiGet } from '../../ts/helper/api';
import { UserBuildings } from '../../types/api/UserBuildings';
import { Buildings } from '../../types/api/Buildings';

const staffStatsInBuildingList = async function (): Promise<any> {
  const stats = async function () {
    const userBuildings = (await apiGet(
      'userBuildings',
      localStorage
    )) as unknown as UserBuildings[];
    const buildings = (await apiGet(
      'buildings',
      sessionStorage
    )) as unknown as Buildings[];

    const buildingsInList: NodeListOf<HTMLDivElement> =
      document.querySelectorAll(
        'div#departments div.panel-body div[buildingtype]'
      );
    buildingsInList.forEach(building => {
      const apiBuildingData = userBuildings.find(
        e =>
          e.userBuildingID ===
          parseInt(building.getAttribute('userdepartmentid') ?? '0')
      );
      if (
        !buildings.find(
          building => building.buildingID === apiBuildingData?.buildingType
        )?.canGenerate
      ) {
        return;
      }
      (<HTMLLinkElement>(
        building.querySelector(
          `a[href="department/${apiBuildingData?.userBuildingID}"]`
        )
      )).innerHTML += `&nbsp(${apiBuildingData?.personalCount}/${
        apiBuildingData?.maxNeededPersonalCount
      }) ${
        apiBuildingData?.isHiring
          ? '<i class="fa-solid fa-user-plus"></i>'
          : '<i class="fa-solid fa-user-xmark"></i>'
      }`;
    });
  };

  stats();
};

export { staffStatsInBuildingList };
