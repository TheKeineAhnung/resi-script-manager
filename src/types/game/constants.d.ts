declare const COURSE_NEW_STATUS: 'Warten auf Start';
declare const COURSE_MAX_SEATS: 10;

declare const HOSPITAL_START_CAPACITY: 10;

declare const FMS_TEXT: {
  1: 'Frei über Funk';
  2: 'Frei auf Wache';
  3: 'Auf Anfahrt';
  4: 'Am Einsatzort';
  5: 'Sprechwunsch';
  6: 'Nicht Einsatzbereit';
  7: 'Zum Zielort';
  8: 'Am Zielort';
};

declare const USER_PATIENTS_STATUS: {
  AT_MISSION: 1;
  TREATMENT: 2;
  WAITING: 3;
  IN_VEHICLE: 4;
  IN_BUILDING: 5;
  RELEASED: 6;
};

declare const buildingTypes: Record<number, object>;

declare const GENERATING_BUILDING_IDS: number[];
