interface NewMission {
  userName: string;
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
