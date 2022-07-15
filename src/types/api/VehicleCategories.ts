interface VehicleCategories {
  name: string;
  shortName: string;
  readableShortName: string;
  ids: number[];
  roles: string[];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  organisationID: number;
  shopSubFrom?: string;
  shopSubName?: string;
  missionRequirement: boolean;
}

export type { VehicleCategories };
