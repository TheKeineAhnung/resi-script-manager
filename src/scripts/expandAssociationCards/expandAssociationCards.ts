import { variableIsNull } from '../../ts/errors/console';

const expandAssociationCards = async function (): Promise<any> {
  const addArrows = function (): void {
    const headlines: NodeListOf<HTMLDivElement> =
      document.querySelectorAll('div.card-headline');
    const arrow = document.createElement('i');
    arrow.classList.add(
      'fas',
      'fa-angle-up',
      'card-collapse-toggle',
      'pointer',
      'right'
    );

    headlines.forEach((elem): void => {
      if (elem.parentElement === null) {
        variableIsNull(Object.keys(elem)[0], 'expandAssociationCards');

        return;
      }
      if (!elem.parentElement.classList.contains('card-collapse')) {
        elem.parentElement.classList.add('card-collapse');
        if (elem.querySelector('div.scriptBox') === null) {
          const scriptBox = document.createElement('div');
          scriptBox.classList.add('scriptBox');
          scriptBox.insertAdjacentElement('beforeend', arrow);
          elem.insertAdjacentHTML('beforeend', scriptBox.outerHTML);
        } else {
          elem
            .querySelector('div.scriptBox')
            ?.insertAdjacentHTML('beforeend', arrow.outerHTML);
        }
      }
    });
  };

  addArrows();
};

export { expandAssociationCards };
