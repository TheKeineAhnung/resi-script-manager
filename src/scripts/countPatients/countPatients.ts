import { UserBuildings } from '../../types/api/UserBuildings';
import { variableIsNull } from '../../ts/errors/console';

const countPatients = async function (): Promise<any> {
  let allPatients: number;

  if (localStorage.allPatients !== null && localStorage.allPatients >= 0) {
    allPatients = Number.parseInt(
      localStorage.getItem('allPatients') ?? '0',
      10
    );
  } else {
    allPatients = 0;
    localStorage.setItem('allPatients', allPatients.toString());
  }

  const showPanel = function (): void {
    const position = document.querySelector('.muenzen_marken');

    if (position === null) {
      variableIsNull(Object.keys({ position })[0], 'countPatients');

      return;
    }

    const span: HTMLSpanElement = document.createElement('span');
    span.id = 'patientInformation';

    const spanActual: HTMLSpanElement = document.createElement('span');

    spanActual.id = 'patients-actual';
    spanActual.innerText = localStorage.getItem('allPatients') ?? '0';

    const spanTotal: HTMLSpanElement = document.createElement('span');

    spanTotal.id = 'patients-total';
    spanTotal.innerText = localStorage.getItem('totalPatientSlots') ?? '0';

    span.innerHTML = ` | `;
    span.appendChild(spanActual);
    span.innerHTML += ' Patient(en) bei ';
    span.appendChild(spanTotal);
    span.innerHTML += ' Betten';

    position.appendChild(span);
  };

  const updatePanel = function (): void {
    const areaActual = document.getElementById('patients-actual');

    if (areaActual === null) {
      variableIsNull(Object.keys({ areaActual })[0], 'countPatients');

      return;
    }

    let currentPatients = localStorage.getItem('allPatients') ?? '0';

    if (parseInt(currentPatients) < 0) {
      currentPatients = '0';
    }

    areaActual.innerText = currentPatients;
    const areaTotal = document.getElementById('patients-total');

    if (areaTotal === null) {
      variableIsNull(Object.keys({ areaTotal })[0], 'countPatients');

      return;
    }

    areaTotal.innerText = localStorage.getItem('totalPatientSlots') ?? '0';
  };

  const count = async function (): Promise<void> {
    // eslint-disable-next-line no-undef
    if (
      !localStorage.aUserBuildings ||
      JSON.parse(localStorage.aUserBuildings).lastUpdate <
        new Date().getTime() - 5 * 1000 * 60
    ) {
      await $.getJSON('/api/userBuildings').done(data => {
        localStorage.setItem(
          'aUserBuildings',
          JSON.stringify({ lastUpdate: new Date().getTime(), value: data })
        );
      });
    }

    const userBuildings: UserBuildings[] = JSON.parse(
      localStorage.aUserBuildings
    ).value;

    if (localStorage.getItem('totalPatientSlots') === null) {
      for (const actualBuilding in userBuildings) {
        if (userBuildings[actualBuilding].buildingType === 4) {
          const totalPatientSlots =
            userBuildings[actualBuilding].level +
            9 +
            Number.parseInt(
              localStorage.getItem('totalPatientSlots') ?? '0',
              10
            );

          localStorage.setItem(
            'totalPatientSlots',
            totalPatientSlots.toString()
          );
        }
      }
    }
    const allPatientsOnLoad: NodeListOf<HTMLSpanElement> =
      document.querySelectorAll('.currentpatients');

    localStorage.removeItem('allPatients');

    for (let i = 0; i < allPatientsOnLoad.length; i++) {
      const actualPatients =
        Number.parseInt(localStorage.getItem('allPatients') ?? '0', 10) +
        Number.parseInt(allPatientsOnLoad[i].innerText, 10);

      localStorage.setItem('allPatients', actualPatients.toString());
    }

    if (document.querySelector('#patientInformation') === null) {
      showPanel();
    }
    updatePanel();
  };

  await count();

  document.querySelectorAll('.currentpatients').forEach((elem): void => {
    elem.addEventListener('DOMSubtreeModified', async (): Promise<void> => {
      await count();
    });
  });
};

export { countPatients };
