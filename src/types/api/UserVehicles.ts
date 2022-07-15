interface UserVehicles {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  userVehicleID: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  userBuildingID: number;
  userVehicleName: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  userMissionID: number | null;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  vehicleID: number;
  fms: number;
  fakeFms: number;
  minPersonal: number;
  maxPersonal: number;
}

export type { UserVehicles };
