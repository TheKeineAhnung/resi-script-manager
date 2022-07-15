interface UserBuildings {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  userBuildingID: number;
  buildingType: number;
  userBuildingName: string;
  level: number;
  isHiring: boolean;
  personalCount: number;
  maxNeededPersonalCount: number;
  location: {
    lat: number;
    lng: number;
  };
  adress: string;
}

export type { UserBuildings };
