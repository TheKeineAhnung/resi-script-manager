import { variableIsNull, variableIsUndefined } from '../../ts/errors/console';

const countPatients = async function (): Promise<any> {
  const getPatientSlots = function (): number {
    const elements: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      'div.card-body div.vehicle.hospital-capacity div.vehicle-name'
    );

    let patientSlots = 0;

    elements.forEach((e): void => {
      let text = e.textContent?.split('/')[1];

      if (text === undefined) {
        variableIsUndefined(Object.keys({ text })[0], 'countPatients');

        return;
      }

      text = text.replace(/['a-zA-Z ']/g, '');
      patientSlots += parseInt(text);
    });

    return patientSlots;
  };

  const getCurrentPatients = function (): number {
    return parseInt(localStorage.currentPatients);
  };

  const getPatientWord = function (): 'Patient' | 'Patienten' {
    return getCurrentPatients() === 1 ? 'Patient' : 'Patienten';
  };

  const showPanel = async function (): Promise<void> {
    const parent: HTMLDivElement | null =
      document.querySelector('div.muenzen_marken');

    if (parent === null) {
      variableIsNull(Object.keys({ parent })[0], 'countPatients');

      return;
    }

    parent.innerHTML += ' | ';

    const currentPatientContainer: HTMLSpanElement =
      document.createElement('span');
    currentPatientContainer.id = 'currentPatients';

    const patientWordContainer: HTMLSpanElement =
      document.createElement('span');
    patientWordContainer.id = 'patientWord';

    const totalPatientContainer: HTMLSpanElement =
      document.createElement('span');
    totalPatientContainer.id = 'totalPatients';

    parent.appendChild(currentPatientContainer);
    parent.insertAdjacentText('beforeend', ' ');
    parent.appendChild(patientWordContainer);
    parent.insertAdjacentText('beforeend', ' bei ');
    parent.appendChild(totalPatientContainer);
    parent.insertAdjacentText('beforeend', ' Betten');
    await updatePanel();
  };

  const updatePanel = async function () {
    const currentPatientContainer: HTMLSpanElement | null =
      document.querySelector('#currentPatients');
    if (currentPatientContainer === null) {
      variableIsNull(
        Object.keys({ currentPatientContainer })[0],
        'countPatients'
      );

      return;
    }

    const patientWordContainer: HTMLSpanElement | null =
      document.querySelector('#patientWord');
    if (patientWordContainer === null) {
      variableIsNull(Object.keys({ patientWordContainer })[0], 'countPatients');

      return;
    }

    const totalPatientContainer: HTMLSpanElement | null =
      document.querySelector('#totalPatients');
    if (totalPatientContainer === null) {
      variableIsNull(
        Object.keys({ totalPatientContainer })[0],
        'countPatients'
      );

      return;
    }

    if (isNaN(getCurrentPatients()) || getCurrentPatients() < 0) {
      await countPatients();
    }

    currentPatientContainer.innerText = getCurrentPatients().toString();
    patientWordContainer.innerText = getPatientWord();
    totalPatientContainer.innerText = getPatientSlots().toString();
  };

  const countPatients = async function (): Promise<void> {
    const allPatientSlots: NodeListOf<HTMLSpanElement> | null =
      document.querySelectorAll('.currentpatients');

    if (allPatientSlots === null) {
      variableIsNull(Object.keys({ allPatientSlots })[0], 'countPatients');

      return;
    }

    let newCountedPatients = 0;

    allPatientSlots.forEach((patientSlot): void => {
      newCountedPatients += parseInt(patientSlot.innerText);
    });

    localStorage.currentPatients = newCountedPatients.toString();
  };

  async function init() {
    await countPatients();
    await showPanel();
  }

  socket.on('patientStatus', async () => {
    await countPatients();
    await updatePanel();
  });

  await init();
};

export { countPatients };
