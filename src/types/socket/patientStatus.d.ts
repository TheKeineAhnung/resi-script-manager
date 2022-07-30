declare const userPatientStatus: {
  1: 'At Mission';
  2: 'Getting treated at mission';
  3: 'In Vehicle';
  4: 'In Building';
  5: 'Released';
};

interface patientStatus {
  userPatientID: number;
  userPatientProgress: number;
  userPatientStatus: 1 | 2 | 3 | 4 | 5;
  userVehicleID?: number;
  userBuildingID?: number | null;
  userPatientFinishTime?: Date;
}

export type { patientStatus };
