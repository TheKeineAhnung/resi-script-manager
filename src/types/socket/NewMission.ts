interface NewMission {
  userName: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  userMissionID: number;
  userMissionName: string;
  icon: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
}

export type { NewMission };
