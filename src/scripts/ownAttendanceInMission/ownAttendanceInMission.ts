const ownAttendanceInMission = async function (): Promise<void> {
  //  * Copyright (c) 2024 by Ron31
  //  * missionHelper
  //  * Script Version: 1.0.0
  //  * Last Update: 2024-06-08

  if (
    (document.querySelector('#shared-mission-indicator') as HTMLSpanElement)
      .style.display === 'none'
  )
    return;

  let own_attendance_state = 'NOT_ATTENDING' as
    | 'ATTENDING'
    | 'EN_ROUTE'
    | 'NOT_ATTENDING';

  const noVehicleEnrouteTotal: HTMLDivElement | null = document.querySelector(
    '#no-vehicle-enroute-total'
  );
  const noVehicleEnroute: HTMLDivElement | null = document.querySelector(
    '#no-vehicle-enroute-own'
  );
  if (
    noVehicleEnrouteTotal !== null &&
    noVehicleEnrouteTotal.style.display === 'none' &&
    noVehicleEnroute !== null &&
    noVehicleEnroute.style.display === 'none'
  ) {
    own_attendance_state = 'EN_ROUTE';
  }

  const noVehicleAttendingTotal: HTMLDivElement | null = document.querySelector(
    '#no-vehicle-onscene-total'
  );
  const noVehicleAttending: HTMLDivElement | null = document.querySelector(
    '#no-vehicle-onscene-own'
  );
  if (
    noVehicleAttendingTotal !== null &&
    noVehicleAttendingTotal.style.display === 'none' &&
    noVehicleAttending !== null &&
    noVehicleAttending.style.display === 'none'
  ) {
    own_attendance_state = 'ATTENDING';
  }

  if (own_attendance_state === 'NOT_ATTENDING' && ReSi.userName === 'Ron31') {
    return;
  }

  const svgElement = document.querySelector(
    '.detail-header .detail-title > svg'
  );
  if (svgElement === null) {
    return;
  }

  const attendanceIcon = document.createElement('i');
  attendanceIcon.classList.add('fas');
  attendanceIcon.classList.add('fa-sitemap');
  if (own_attendance_state === 'EN_ROUTE') {
    attendanceIcon.classList.add('text-warning');
  } else if (own_attendance_state === 'ATTENDING') {
    attendanceIcon.classList.add('text-success');
  }
  svgElement.insertAdjacentElement('beforebegin', attendanceIcon);
};

export { ownAttendanceInMission };
