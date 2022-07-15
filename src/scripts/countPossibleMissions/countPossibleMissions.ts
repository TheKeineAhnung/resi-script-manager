import { variableIsNull } from '../../ts/errors/console';

const countPossibleMissions = async function (): Promise<any> {
  const countAvailableMissions = function (): number {
    return document.querySelectorAll('td span.status.s2').length;
  };

  const countAllMissions = function (): number {
    return document.querySelectorAll('td span.status').length;
  };

  const count = function (): void {
    const newContainer: HTMLDivElement = document.createElement('div');
    const parentContainer: HTMLDivElement | null = document.querySelector(
      'div.detail-header div.detail-subtitle'
    );

    if (parentContainer === null) {
      variableIsNull(
        Object.keys({ parentContainer })[0],
        'countPossibleMissions'
      );

      return;
    }

    parentContainer.style.display = 'flex';
    parentContainer.style.justifyContent = 'space-between';
    parentContainer.style.alignItems = 'end';
    newContainer.style.fontWeight = '500';
    newContainer.innerHTML = `<b>${countAvailableMissions()}</b> von <b>${countAllMissions()}</b>  Einsätzen verfügbar`;
    newContainer.classList.add('status', 's1');
    parentContainer.appendChild(newContainer);
  };

  count();
};

export { countPossibleMissions };
