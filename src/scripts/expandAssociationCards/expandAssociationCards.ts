import { variableIsNull } from '../../ts/errors/console';

const expandAssociationCards = async function (): Promise<any> {
  const addArrows = function (): void {
    const headlines: NodeListOf<HTMLDivElement> =
      document.querySelectorAll('div.card-headline');
    const arrow =
      '<i class="fas fa-angle-up card-collapse-toggle pointer right"></i>';

    headlines.forEach((elem): void => {
      if (elem.parentElement === null) {
        variableIsNull(Object.keys(elem)[0], 'expandAssociationCards');

        return;
      }
      if (!elem.parentElement.classList.contains('card-collapse')) {
        elem.parentElement.classList.add('card-collapse');
        // eslint-disable-next-line no-param-reassign
        elem.innerHTML += arrow;
      }
    });
  };

  addArrows();
};

export { expandAssociationCards };
