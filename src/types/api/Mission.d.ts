interface Mission {
  id: number;
  name: string;
  icon: string;
  maxCalls: number;
  duration: number;
  credits: number;
  maxCredits?: number;
  neededVehicles: {
    [key: string]: number;
  };
  patients?: {
    min: number;
    max: number;
    naChance?: number;
  };
  calls: number[];
  event?: number;
  achievements?: string[];
}

export { Mission };
