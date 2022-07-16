import { variableIsNull } from '../../ts/errors/console';

const expandMapLegend = async function (): Promise<any> {
  const headlines: NodeListOf<HTMLDivElement> =
    document.querySelectorAll('div.card-headline');
  const arrow =
    '<i class="fas fa-angle-up card-collapse-toggle pointer right"></i>';

  headlines.forEach((elem): void => {
    if (elem.textContent === null || elem.parentElement === null) {
      variableIsNull(Object.keys(elem)[0], 'expandMapLegend');

      return;
    }

    if (
      !elem.classList.contains('bg-organisation-4') ||
      elem.textContent.includes('Leitstelle')
    ) {
      elem.parentElement.classList.add('collapsed');
    }
    // eslint-disable-next-line no-param-reassign
    elem.innerHTML += arrow;
  });
};

export { expandMapLegend };
