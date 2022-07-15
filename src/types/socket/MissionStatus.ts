interface MissionStatus {
  userName: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  userMissionID: number;
  userMissionProgress: number;
  userMissionStatus: number;
  icon: string;
  missingVehicles: Record<string, number>;
}

interface MissionStatusOnWork extends MissionStatus {
  userMissionFinishTime: number;
}

const isMissionStatusOnWork = function (
  object: object
): object is MissionStatusOnWork {
  return 'userMissionFinishTime' in object;
};

export type { MissionStatus, MissionStatusOnWork };
export { isMissionStatusOnWork };
