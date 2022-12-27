interface Buildings {
  buildingID: number;
  buildingName: string;
  buildingCategory: string;
  organisationID: number;
  organisationName: 'Feuerwehr' | 'Rettungsdienst' | 'Polizei' | 'Leitstelle';
  defaultPersonal: number;
  defaultMuenzen: number;
  defaultMarken: number;
  maxLevel: number;
  markerName: string;
  canGenerate: boolean;
}

export type { Buildings };
