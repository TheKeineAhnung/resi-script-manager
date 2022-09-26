interface VehicleFms {
  canOvertakePatient: boolean;
  countPersonal: number;
  fms5Type: 'radio' | 'patient' | 'carrier' | null;
  userVehicleID: number;
  userVehicleName: string;
  userVehicleFMS: number;
  userVehicleFakeFMS: number;
  userMissionID: number;
  userDepartmentID: number;
  userName: string;
  countPersonal: number;
  vehicleShortName: string;
  vehicleID: number;
}

export type { VehicleFms };
