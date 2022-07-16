interface VehicleCategories {
  name: string;
  shortName: string;
  readableShortName: string;
  ids: number[];
  roles: string[];
  organisationID: number;
  shopSubFrom?: string;
  shopSubName?: string;
  missionRequirement: boolean;
}

export type { VehicleCategories };
