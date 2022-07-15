interface User {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  userID: number;
  userName: string;
  muenzen: number;
  muenzenTotal: number;
  usesDarkMode: boolean;
  isOnline: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  associationID: number;
  toplistRank: number;
}

export type { User };
