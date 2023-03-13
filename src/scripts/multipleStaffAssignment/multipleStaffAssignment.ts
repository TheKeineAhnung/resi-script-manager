import { variableIsNull, variableIsUndefined } from '../../ts/errors/console';

const multipleStaffAssignment = async function (): Promise<any> {
  const staffTableRows: NodeListOf<HTMLTableRowElement> =
    document.querySelectorAll('table tbody tr[userpersonalid]');

  let assignmentStaff: number[] = [];

  staffTableRows.forEach((e): void => {
    e.addEventListener('click', j => {
      if (
        ['td', 'span'].includes(
          document
            .elementFromPoint(j.clientX, j.clientY)
            ?.nodeName.toLowerCase() ?? ''
        )
      ) {
        const userPersonalId = parseInt(
          e.getAttribute('userpersonalid') ?? '0'
        );
        if (!assignmentStaff.includes(userPersonalId)) {
          assignmentStaff.push(userPersonalId);
          e.setAttribute('multipleAssign', 'true');

          const planElement: HTMLSpanElement | null = e.querySelector(
            '.editPlannedCourses'
          );

          if (planElement === null) {
            variableIsNull(
              Object.keys({ planElement })[0],
              'multipleStaffAssignment.ts'
            );

            return;
          }

          const assignElement: HTMLSpanElement | null = e.querySelector(
            '.editAssignedVehicle'
          );

          if (assignElement === null) {
            variableIsNull(
              Object.keys({ assignElement })[0],
              'multipleStaffAssignment.ts'
            );

            return;
          }

          planElement.classList.replace(
            'editPlannedCourses',
            'editPlannedCoursesScript'
          );

          assignElement.classList.replace(
            'editAssignedVehicle',
            'editAssignedVehicleScript'
          );

          planElement.addEventListener('click', () => {
            multiplePlanAssignCall(planElement);
          });

          assignElement.addEventListener('click', () => {
            multipleVehicleAssignCall(assignElement);
          });

          e.style.backgroundColor = '#f37022';
        } else {
          assignmentStaff = assignmentStaff.filter(i => {
            return i !== userPersonalId;
          });
          e.removeAttribute('multipleAssign');

          const planElement: HTMLSpanElement | null = e.querySelector(
            '.editPlannedCoursesScript'
          );

          if (planElement === null) {
            variableIsNull(
              Object.keys({ planElement })[0],
              'multipleStaffAssignment.ts'
            );

            return;
          }

          const assignElement: HTMLSpanElement | null = e.querySelector(
            '.editAssignedVehicleScript'
          );

          if (assignElement === null) {
            variableIsNull(
              Object.keys({ assignElement })[0],
              'multipleStaffAssignment.ts'
            );

            return;
          }

          planElement.classList.replace(
            'editPlannedCoursesScript',
            'editPlannedCourses'
          );

          assignElement.classList.replace(
            'editAssignedVehicleScript',
            'editAssignedVehicle'
          );

          e.style.removeProperty('background-color');
        }
      }
    });
  });

  const resetMultipleAssignment = function (): void {
    assignmentStaff.forEach(id => {
      const e: HTMLTableRowElement | null = document.querySelector(
        `tr[userpersonalid="${id}"]`
      );

      if (e === null) {
        variableIsNull(Object.keys({ e })[0], 'multipleStaffAssignment.ts');

        return;
      }

      e.removeAttribute('multipleAssign');

      const planElement: HTMLSpanElement | null = e.querySelector(
        '.editPlannedCoursesScript'
      );

      if (planElement === null) {
        variableIsNull(
          Object.keys({ planElement })[0],
          'multipleStaffAssignment.ts'
        );

        return;
      }

      const assignElement: HTMLSpanElement | null = e.querySelector(
        '.editAssignedVehicleScript'
      );

      if (assignElement === null) {
        variableIsNull(
          Object.keys({ assignElement })[0],
          'multipleStaffAssignment.ts'
        );

        return;
      }

      planElement.classList.replace(
        'editPlannedCoursesScript',
        'editPlannedCourses'
      );

      assignElement.classList.replace(
        'editAssignedVehicleScript',
        'editAssignedVehicle'
      );

      e.style.removeProperty('background-color');
    });
    assignmentStaff = [];
  };

  const multiplePlanAssignCall = function (e: HTMLElement): void {
    if (e.classList.contains('editPlannedCoursesScript')) {
      const buildCustomCourseModal = function () {
        let html = '';
        for (const course of COURSES) {
          const div = document.createElement('div');
          div.classList.add('modalPlannedCourses');
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.setAttribute('courseid', course.id.toString());
          checkbox.id = `course${course.id}`;
          const label = document.createElement('label');
          label.setAttribute('for', `course${course.id.toString()}`);
          label.innerText = course.name;
          div.insertAdjacentElement('beforeend', checkbox);
          div.insertAdjacentElement('beforeend', label);
          html += div.outerHTML;
        }
        if (html === '') {
          return 'keine Lehrgänge verfügbar';
        }
        return html;
      };

      modal(
        'Lehrgänge planen',
        buildCustomCourseModal(),
        'Speichern',
        'Abbrechen',
        () => {
          let plannedCourses: NodeListOf<HTMLElement>;

          if (top === self) {
            plannedCourses = document.querySelectorAll(
              '.modalPlannedCourses :checked'
            );
          } else {
            plannedCourses = window.parent.document.querySelectorAll(
              '.modalPlannedCourses :checked'
            );
          }

          const plannedCourseIds: string[] = [];
          const plannedCourseNames: string[] = [];

          plannedCourses.forEach(e => {
            const courseid = e.getAttribute('courseid');
            plannedCourseIds.push(courseid ?? '0');
            let courseLabels: NodeListOf<HTMLElement>;
            if (top === self) {
              courseLabels = document.querySelectorAll(
                `[for=course${courseid}]`
              );
            } else {
              courseLabels = window.parent.document.querySelectorAll(
                `[for=course${courseid}]`
              );
            }
            plannedCourseNames.push(courseLabels[0].textContent ?? 'undefined');
          });

          assignmentStaff.forEach((userPersonalID): void => {
            callApi(
              'api/userPersonal',
              {
                action: 'planCourse',
                userPersonalID: userPersonalID,
                courseIDs: JSON.stringify(plannedCourseIds)
              },
              () => {
                const cell = document.querySelectorAll(
                  `[userpersonalid='${userPersonalID}'] td`
                )[4];

                if (cell === null) {
                  variableIsNull(
                    Object.keys({ cell })[0],
                    'multipleStaffAssignment.ts'
                  );

                  return;
                }
                cell.querySelectorAll('span.status').forEach(e => {
                  e.remove();
                });
                cell.innerHTML = cell.innerHTML.trim();
                plannedCourseNames.forEach((plannedCourseName): void => {
                  const infoHTML = document.createElement('span');
                  infoHTML.classList.add('status', 's1', 'text-small');
                  infoHTML.textContent = `${plannedCourseName}`;
                  cell.insertAdjacentElement('beforeend', infoHTML);
                  cell.innerHTML += '&nbsp';
                });
              }
            );
          });
          resetMultipleAssignment();
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
        true
      );
    }
  };
  const multipleVehicleAssignCall = function (e: HTMLElement): void {
    if (e.classList.contains('editAssignedVehicleScript')) {
      const buildVehicleAssignModal = function () {
        if (USER_DEPARTMENT_VEHICLES.length === 0) {
          return 'keine Fahrzeuge verfügbar';
        }
        const outerDiv = document.createElement('div');
        const noneInput = document.createElement('input');
        noneInput.type = 'radio';
        noneInput.name = 'assignuservehicle';
        noneInput.setAttribute('uservehicleid', 'null');
        noneInput.id = 'vehiclenull';
        const noneLabel = document.createElement('label');
        noneLabel.setAttribute('for', 'vehiclenull');
        noneLabel.textContent = 'Kein Fahrzeug';
        outerDiv.insertAdjacentElement('beforeend', noneInput);
        outerDiv.insertAdjacentElement('beforeend', noneLabel);
        let outerDivHtml = outerDiv.outerHTML;
        for (const userDepartmentVehicle of USER_DEPARTMENT_VEHICLES) {
          const div = document.createElement('div');
          div.classList.add('modalAssignCourses');
          const radio = document.createElement('input');
          radio.type = 'radio';
          radio.setAttribute('name', 'assignuservehicle');
          radio.setAttribute(
            'uservehicleid',
            userDepartmentVehicle.userVehicleID.toString()
          );
          radio.id = `vehicle${userDepartmentVehicle.userVehicleID.toString()}`;
          const label = document.createElement('label');
          label.setAttribute(
            'for',
            `vehicle${userDepartmentVehicle.userVehicleID.toString()}`
          );
          label.innerText = `${
            userDepartmentVehicle.name
          } (${userDepartmentVehicle.assignedPersonal.length.toString()}/${userDepartmentVehicle.maxPersonal.toString()})`;
          div.insertAdjacentElement('beforeend', radio);
          div.insertAdjacentElement('beforeend', label);
          outerDivHtml += div.outerHTML;
        }
        return outerDivHtml;
      };

      modal(
        'Fahrzeug zuweisen',
        buildVehicleAssignModal(),
        'Speichern',
        'Abbrechen',
        () => {
          let assignUserVehicleIDSelector: HTMLElement | null;

          if (top === self) {
            assignUserVehicleIDSelector = document.querySelector(
              '[name="assignuservehicle"]:checked'
            );
          } else {
            assignUserVehicleIDSelector = window.parent.document.querySelector(
              '[name="assignuservehicle"]:checked'
            );
          }

          if (assignUserVehicleIDSelector === null) {
            variableIsNull(
              Object.keys({ assignUserVehicleIDSelector })[0],
              'multipleStaffAssignment.ts'
            );

            return;
          }

          const assignUserVehicleID: string | null =
            assignUserVehicleIDSelector.getAttribute('uservehicleid');

          if (assignUserVehicleID === null) {
            variableIsNull(
              Object.keys({ assignUserVehicleID })[0],
              'multipleStaffAssignment.ts'
            );

            return;
          }

          assignmentStaff.forEach((userPersonalID): void => {
            callApi(
              'api/userPersonal',
              {
                action: 'assignVehicle',
                userPersonalID: userPersonalID,
                userVehicleID: assignUserVehicleID
              },
              () => {
                const cell = document.querySelectorAll(
                  `[userpersonalid='${userPersonalID}'] td`
                )[3];

                if (cell === null) {
                  variableIsNull(
                    Object.keys({ cell })[0],
                    'multipleStaffAssignment.ts'
                  );

                  return;
                }
                cell.querySelectorAll('span.status').forEach(e => {
                  e.remove();
                });
                cell.innerHTML = cell.innerHTML.trim();
                const currentAssignedVehicle = USER_DEPARTMENT_VEHICLES.find(
                  x => x.assignedPersonal.includes(userPersonalID)
                );
                if (currentAssignedVehicle !== undefined) {
                  const index =
                    currentAssignedVehicle.assignedPersonal.findIndex(
                      x => x === userPersonalID
                    );
                  if (index > -1)
                    currentAssignedVehicle.assignedPersonal.splice(index, 1);
                }
                if (assignUserVehicleID) {
                  const userVehicle = USER_DEPARTMENT_VEHICLES.find(
                    x => x.userVehicleID === parseInt(assignUserVehicleID)
                  );

                  if (userVehicle === undefined) {
                    variableIsUndefined(
                      Object.keys({ userVehicle })[0],
                      'multipleStaffAssignment.ts'
                    );

                    return;
                  }

                  const infoHTML = document.createElement('span');
                  infoHTML.classList.add('status', 's1', 'text-small');
                  const infoBold = document.createElement('b');
                  const infoLink = document.createElement('a');
                  infoLink.href = `vehicle/${assignUserVehicleID.toString()}`;
                  infoLink.textContent = userVehicle.name;
                  infoBold.insertAdjacentElement('beforeend', infoLink);
                  infoHTML.insertAdjacentElement('beforeend', infoBold);
                  cell.insertAdjacentElement('beforeend', infoHTML);
                  userVehicle.assignedPersonal.push(userPersonalID);
                }
              }
            );
          });
          resetMultipleAssignment();
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
        true
      );
    }
  };
};

export { multipleStaffAssignment };
