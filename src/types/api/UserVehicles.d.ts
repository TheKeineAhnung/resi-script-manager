interface UserVehicles {
  userVehicleID: number;
  userBuildingID: number;
  userVehicleName: string;
  userMissionID: number | null;
  vehicleID: number;
  fms: number;
  fakeFms: number;
  minPersonal: number;
  maxPersonal: number;
}

export type { UserVehicles };
