import { variableIsNull, variableIsUndefined } from '../../ts/errors/console';

// TODO: Better selection interface

const filterMemberList = async function (): Promise<any> {
  const card: Element = document.querySelectorAll('div.card')[4];
  const headline: HTMLDivElement | null =
    card.querySelector('div.card-headline');

  if (headline === null) {
    variableIsNull(Object.keys({ head: headline })[0], 'filterMemberList');

    return;
  }

  if (document.querySelector('div.scriptBox') === null) {
    const box = document.createElement('div');
    box.classList.add('scriptBox');
    headline.insertAdjacentElement('beforeend', box);
  }

  const scriptBox: HTMLDivElement | null =
    headline.querySelector('div.scriptBox');

  if (scriptBox === null) {
    variableIsNull(Object.keys({ scriptBox })[0], 'filterMemberList');

    return;
  }

  const filterIconSpan = document.createElement('span');
  filterIconSpan.dataset.open = 'false';
  filterIconSpan.id = 'filterIconSpan';
  const filterIcon = document.createElement('i');
  filterIcon.classList.add('fa-regular', 'fa-filter');
  filterIconSpan.insertAdjacentElement('afterbegin', filterIcon);
  scriptBox.insertAdjacentElement('afterbegin', filterIconSpan);

  const filterIconSpanSelector: HTMLSpanElement | null =
    headline.querySelector('#filterIconSpan');

  if (filterIconSpanSelector === null) {
    variableIsNull(
      Object.keys({ filterIconSelector: filterIconSpanSelector })[0],
      'filterMemberList'
    );

    return;
  }

  filterIconSpanSelector.addEventListener('click', () => {
    const dataset: DOMStringMap | undefined =
      filterIconSpan.querySelector('svg')?.dataset;
    if (dataset === undefined) {
      variableIsUndefined(Object.keys({ dataset })[0], 'filterMemberList');

      return;
    }
    if (filterIconSpanSelector.dataset.open === 'false') {
      showFilterField(headline);
      filterIconSpanSelector.dataset.open = 'true';
      dataset.prefix = 'fas';
    } else {
      hideFilterField();
      filterIconSpanSelector.dataset.open = 'false';
      dataset.prefix = 'far';
    }
  });

  const generateCheckbox = function (
    label: string,
    matchCount: number,
    // eslint-disable-next-line no-unused-vars
    changeFunction: (e: Event) => void
  ) {
    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('checkbox-container');
    checkboxContainer.style.width = '95%';
    checkboxContainer.style.boxShadow = '-1px 1px 5px 5px rgba(0,0,0,0.3)';
    checkboxContainer.dataset.tooltip = `${matchCount.toString()} ${
      matchCount === 1 ? 'Mitglied' : 'Mitglieder'
    } mit diesem Filter gefunden`;
    const checkboxInput = document.createElement('input');
    checkboxInput.id = label.replaceAll(' ', '-').toLowerCase();
    checkboxInput.type = 'checkbox';
    checkboxInput.checked = true;
    checkboxInput.addEventListener('change', e => {
      changeFunction(e);
    });
    const checkboxLabel = document.createElement('label');
    checkboxLabel.setAttribute('for', label.replaceAll(' ', '-').toLowerCase());
    checkboxLabel.textContent = label;
    checkboxContainer.insertAdjacentElement('beforeend', checkboxInput);
    checkboxContainer.insertAdjacentElement('beforeend', checkboxLabel);
    return checkboxContainer;
  };

  const showFilterField = function (headline: HTMLDivElement) {
    // head.innerHTML +=
    //   '<div><input type="checkbox" id="green" name="Online" checked><label for="green">Online</label></div><div><input type="checkbox" id="red" name="red" checked><label for="red">Offline</label></div><div><input type="checkbox" id="purple" name="purple" checked><label for="purple">Mehr als 90 Tage offline</label></div>';
    const filterCard = document.createElement('div');
    filterCard.classList.add('card-body');
    filterCard.style.borderRadius = '0';
    filterCard.id = 'associationMemberFilterCard';
    filterCard.style.display = 'grid';
    filterCard.style.gridTemplateColumns = 'repeat(2, 50%)';

    const statusFilter = document.createElement('div');
    statusFilter.style.display = 'flex';
    statusFilter.style.flexDirection = 'column';
    statusFilter.style.justifyContent = 'center';
    statusFilter.style.alignItems = 'center';
    statusFilter.style.margin = '2px 0';
    statusFilter.insertAdjacentElement(
      'beforeend',
      generateCheckbox(
        'Online',
        document.querySelectorAll('tr.toplistTr td.toplist-online').length,
        (e: Event) => {
          const checked = (<HTMLInputElement>e.target).checked;
          const elements: NodeListOf<HTMLTableRowElement> =
            document.querySelectorAll('tr.toplistTr');
          if (checked) {
            elements.forEach((elem): void => {
              if (elem.children[0].classList.contains('toplist-online')) {
                elem.style.display = 'table-row';
              }
            });
          } else {
            const elements: NodeListOf<HTMLTableRowElement> =
              document.querySelectorAll('tr.toplistTr');

            elements.forEach((elem): void => {
              if (elem.children[0].classList.contains('toplist-online')) {
                elem.style.display = 'none';
              }
            });
          }
        }
      )
    );
    statusFilter.insertAdjacentElement(
      'beforeend',
      generateCheckbox(
        'Offline',
        document.querySelectorAll('tr.toplistTr td.toplist-offline').length,
        (e: Event) => {
          const checked = (<HTMLInputElement>e.target).checked;
          const elements: NodeListOf<HTMLTableRowElement> =
            document.querySelectorAll('tr.toplistTr');
          if (checked) {
            elements.forEach((elem): void => {
              if (elem.children[0].classList.contains('toplist-offline')) {
                elem.style.display = 'table-row';
              }
            });
          } else {
            elements.forEach((elem): void => {
              if (elem.children[0].classList.contains('toplist-offline')) {
                elem.style.display = 'none';
              }
            });
          }
        }
      )
    );
    statusFilter.insertAdjacentElement(
      'beforeend',
      generateCheckbox(
        'Mehr als 90 Tage offline',
        document.querySelectorAll('tr.toplistTr td.toplist-absent').length,
        (e: Event) => {
          const checked = (<HTMLInputElement>e.target).checked;
          const elements: NodeListOf<HTMLTableRowElement> =
            document.querySelectorAll('tr.toplistTr');
          if (checked) {
            elements.forEach((elem): void => {
              if (elem.children[0].classList.contains('toplist-absent')) {
                // eslint-disable-next-line no-param-reassign
                elem.style.display = 'table-row';
              }
            });
          } else {
            elements.forEach((elem): void => {
              if (elem.children[0].classList.contains('toplist-absent')) {
                // eslint-disable-next-line no-param-reassign
                elem.style.display = 'none';
              }
            });
          }
        }
      )
    );

    const roleFilter = document.createElement('div');
    roleFilter.style.display = 'flex';
    roleFilter.style.flexDirection = 'column';
    roleFilter.style.justifyContent = 'center';
    roleFilter.style.alignItems = 'center';
    roleFilter.style.margin = '2px 0';
    roleFilter.insertAdjacentElement(
      'beforeend',
      generateCheckbox(
        'Admin',
        Array.from(
          document.querySelectorAll('tr td span.label.label-info.label-round')
        ).filter(e => e.textContent?.toLowerCase() === 'admin').length,
        (e: Event) => {
          const checked = (<HTMLInputElement>e.target).checked;
          const elements: NodeListOf<HTMLTableRowElement> =
            document.querySelectorAll('tr.toplistTr');
          if (checked) {
            elements.forEach((elem): void => {
              if (
                elem.children[3]
                  .querySelector('span')
                  ?.innerText.toLowerCase() === 'admin'
              ) {
                elem.style.display = 'table-row';
              }
            });
          } else {
            elements.forEach((elem): void => {
              if (
                elem.children[3]
                  .querySelector('span')
                  ?.innerText.toLowerCase() === 'admin'
              ) {
                elem.style.display = 'none';
              }
            });
          }
        }
      )
    );
    roleFilter.insertAdjacentElement(
      'beforeend',
      generateCheckbox(
        'Co-Admin',
        Array.from(
          document.querySelectorAll('tr td span.label.label-info.label-round')
        ).filter(e => e.textContent?.toLowerCase() === 'co-admin').length,
        (e: Event) => {
          const checked = (<HTMLInputElement>e.target).checked;
          const elements: NodeListOf<HTMLTableRowElement> =
            document.querySelectorAll('tr.toplistTr');
          if (checked) {
            elements.forEach((elem): void => {
              if (
                elem.children[3]
                  .querySelector('span')
                  ?.innerText.toLowerCase() === 'co-admin'
              ) {
                elem.style.display = 'table-row';
              }
            });
          } else {
            elements.forEach((elem): void => {
              if (
                elem.children[3]
                  .querySelector('span')
                  ?.innerText.toLowerCase() === 'co-admin'
              ) {
                elem.style.display = 'none';
              }
            });
          }
        }
      )
    );

    roleFilter.insertAdjacentElement(
      'beforeend',
      generateCheckbox(
        'Schuldirektor',
        Array.from(
          document.querySelectorAll('tr td span.label.label-info.label-round')
        ).filter(e => e.textContent?.toLowerCase() === 'schuldirektor').length,
        (e: Event) => {
          const checked = (<HTMLInputElement>e.target).checked;
          const elements: NodeListOf<HTMLTableRowElement> =
            document.querySelectorAll('tr.toplistTr');
          if (checked) {
            elements.forEach((elem): void => {
              if (
                elem.children[3]
                  .querySelector('span')
                  ?.innerText.toLowerCase() === 'schuldirektor'
              ) {
                elem.style.display = 'table-row';
              }
            });
          } else {
            elements.forEach((elem): void => {
              if (
                elem.children[3]
                  .querySelector('span')
                  ?.innerText.toLowerCase() === 'schuldirektor'
              ) {
                elem.style.display = 'none';
              }
            });
          }
        }
      )
    );

    roleFilter.insertAdjacentElement(
      'beforeend',
      generateCheckbox(
        'Mitglied',
        Array.from(
          document.querySelectorAll('tr td span.label.label-info.label-round')
        ).filter(e => e.textContent?.toLowerCase() === 'mitglied').length,
        (e: Event) => {
          const checked = (<HTMLInputElement>e.target).checked;
          const elements: NodeListOf<HTMLTableRowElement> =
            document.querySelectorAll('tr.toplistTr');
          if (checked) {
            elements.forEach((elem): void => {
              if (
                elem.children[3]
                  .querySelector('span')
                  ?.innerText.toLowerCase() === 'mitglied'
              ) {
                elem.style.display = 'table-row';
              }
            });
          } else {
            elements.forEach((elem): void => {
              if (
                elem.children[3]
                  .querySelector('span')
                  ?.innerText.toLowerCase() === 'mitglied'
              ) {
                elem.style.display = 'none';
              }
            });
          }
        }
      )
    );

    filterCard.insertAdjacentElement('beforeend', statusFilter);
    filterCard.insertAdjacentElement('beforeend', roleFilter);
    const seperator = document.createElement('hr');
    seperator.style.width = '100%';
    seperator.style.gridArea = '2/1/3/3';
    seperator.style.filter = 'contrast(1000000%)';
    filterCard.insertAdjacentElement('beforeend', seperator);
    headline.insertAdjacentElement('afterend', filterCard);
  };

  const hideFilterField = function () {
    document.querySelector('div#associationMemberFilterCard')?.remove();
  };
};

export { filterMemberList };
