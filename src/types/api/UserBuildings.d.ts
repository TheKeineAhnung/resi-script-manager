interface UserBuildings {
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
  assignedControlCenterID: number | null;
}

export type { UserBuildings };
