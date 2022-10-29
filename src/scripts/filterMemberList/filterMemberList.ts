import { variableIsNull } from '../../ts/errors/console';

// TODO: Better selection interface

const filterMemberList = async function (): Promise<any> {
  const element: Element = document.querySelectorAll('div.card')[4];
  const head: HTMLDivElement | null =
    element.querySelector('div.card-headline');

  if (head === null) {
    variableIsNull(Object.keys({ head })[0], 'filterMemberList');

    return;
  }

  head.style.display = 'flex';
  head.innerHTML +=
    '<div><input type="checkbox" id="green" name="Online" checked><label for="green">Online</label></div><div><input type="checkbox" id="red" name="red" checked><label for="red">Offline</label></div><div><input type="checkbox" id="purple" name="purple" checked><label for="purple">Mehr als 90 Tage offline</label></div>';

  const online: HTMLInputElement | null = document.querySelector('input#green');
  const offline: HTMLInputElement | null = document.querySelector('input#red');
  const longOffline: HTMLInputElement | null =
    document.querySelector('input#purple');

  if (online === null) {
    variableIsNull(Object.keys({ online })[0], 'filterMemberList');

    return;
  }

  if (offline === null) {
    variableIsNull(Object.keys({ offline })[0], 'filterMemberList');

    return;
  }

  if (longOffline === null) {
    variableIsNull(Object.keys({ longOffline })[0], 'filterMemberList');

    return;
  }

  online.addEventListener('change', (): void => {
    if (online.checked) {
      const elements: NodeListOf<HTMLTableRowElement> =
        document.querySelectorAll('tr.toplistTr');

      elements.forEach((elem): void => {
        if (elem.children[0].classList.contains('toplist-online')) {
          // eslint-disable-next-line no-param-reassign
          elem.style.display = 'table-row';
        }
      });
    } else {
      const elements: NodeListOf<HTMLTableRowElement> =
        document.querySelectorAll('tr.toplistTr');

      elements.forEach((elem): void => {
        if (elem.children[0].classList.contains('toplist-online')) {
          // eslint-disable-next-line no-param-reassign
          elem.style.display = 'none';
        }
      });
    }
  });
  offline.addEventListener('change', (): void => {
    if (offline.checked) {
      const elements: NodeListOf<HTMLTableRowElement> =
        document.querySelectorAll('tr.toplistTr');

      elements.forEach((elem): void => {
        if (elem.children[0].classList.contains('toplist-offline')) {
          // eslint-disable-next-line no-param-reassign
          elem.style.display = 'table-row';
        }
      });
    } else {
      const elements: NodeListOf<HTMLTableRowElement> =
        document.querySelectorAll('tr.toplistTr');

      elements.forEach((elem): void => {
        if (elem.children[0].classList.contains('toplist-offline')) {
          // eslint-disable-next-line no-param-reassign
          elem.style.display = 'none';
        }
      });
    }
  });
  longOffline.addEventListener('change', (): void => {
    if (longOffline.checked) {
      const elements: NodeListOf<HTMLTableRowElement> =
        document.querySelectorAll('tr.toplistTr');

      elements.forEach((elem): void => {
        if (elem.children[0].classList.contains('toplist-absent')) {
          // eslint-disable-next-line no-param-reassign
          elem.style.display = 'table-row';
        }
      });
    } else {
      const elements: NodeListOf<HTMLTableRowElement> =
        document.querySelectorAll('tr.toplistTr');

      elements.forEach((elem): void => {
        if (elem.children[0].classList.contains('toplist-absent')) {
          // eslint-disable-next-line no-param-reassign
          elem.style.display = 'none';
        }
      });
    }
  });
};

export { filterMemberList };
