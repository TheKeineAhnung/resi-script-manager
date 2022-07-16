interface Buildings {
  buildingID: number;
  buildingName: string;
  buildingCategory: string;
  organisationID: number;
  organisationName: string;
  defaultPersonal: number;
  defaultMuenzen: number;
  defaultMarken: number;
  maxLevel: number;
  markerName: string;
  canGenerate: boolean;
}

export type { Buildings };
