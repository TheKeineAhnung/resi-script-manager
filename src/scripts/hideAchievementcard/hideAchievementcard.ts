import { variableIsNull } from '../../ts/errors/console';

const hideAchievementcard = async function (): Promise<any> {
  const hideCard = function (): void {
    const card: HTMLDivElement | null =
      document.querySelector('.card-collapse');

    if (card === null) {
      variableIsNull(Object.keys({ variableIsNull })[0], 'hideAchievementcard');

      return;
    }

    card.style.display = 'none';
  };

  hideCard();
};

export { hideAchievementcard };
