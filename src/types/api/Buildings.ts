interface Buildings {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  buildingID: number;
  buildingName: string;
  buildingCategory: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
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
