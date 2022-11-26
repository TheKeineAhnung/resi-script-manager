import {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  variableIsNull,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  variableIsUndefined
} from '../../ts/errors/console';
import { closeSettingsFrame } from '../../ts/iframe';
import { faTimes, faTruck } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../types/api/User';
import { Icon, icon, library } from '@fortawesome/fontawesome-svg-core';

const renameManager = async function (): Promise<any> {
  library.add(faTruck, faTimes);
  const truckIcon: Icon = icon(faTruck);
  const closeIcon: Icon = icon(faTimes);
  let server: string;

  if (process.env.NODE_ENV === 'development') {
    server = 'http://localhost:8080';
  } else {
    server = 'https://keineahnung.eu/resi-script-manager';
  }

  const loadRenameFrame = async function (): Promise<void> {
    const frame: HTMLIFrameElement | null = document.querySelector('#iframe');

    if (frame === null) {
      variableIsNull(Object.keys({ frame })[0], 'renameManager.ts');

      return;
    }

    frame.removeEventListener('load', loadRenameFrame);

    if (frame.contentWindow === null) {
      variableIsNull(
        `${Object.keys({ frame })[0]}.contentWindow`,
        'renameManager.ts'
      );

      return;
    }

    const head: HTMLHeadElement | null =
      frame.contentWindow.document.querySelector('head');

    if (head === null) {
      variableIsNull(Object.keys({ head })[0], 'renameManager.ts');

      return;
    }

    if (head.querySelectorAll('script').length > 0) {
      const scripts = head.querySelectorAll('script');

      scripts.forEach((script): void => {
        script.remove();
      });
    }
    if (head.querySelectorAll('link').length > 0) {
      const links = head.querySelectorAll('link');

      links.forEach((link): void => {
        link.remove();
      });
    }

    frame.contentWindow.document.body.innerHTML = '';
    frame.contentWindow.document.body.style.overflowX = 'hidden';

    const closeDivIconCreation: HTMLDivElement = document.createElement('div');

    closeDivIconCreation.id = 'closeDivIcon';
    closeDivIconCreation.style.width = '100%';
    closeDivIconCreation.style.display = 'flex';
    closeDivIconCreation.style.justifyContent = 'end';

    const closeSpanIconCreation: HTMLSpanElement =
      document.createElement('span');

    closeSpanIconCreation.id = 'closeSpanIcon';
    closeSpanIconCreation.style.height = '25px';
    closeSpanIconCreation.insertAdjacentHTML('beforeend', closeIcon.html[0]);
    closeSpanIconCreation.style.cursor = 'pointer';
    closeSpanIconCreation.style.display = 'block';
    closeSpanIconCreation.style.width = '25px';
    closeSpanIconCreation.style.marginRight = '5px';
    closeDivIconCreation.insertAdjacentHTML(
      'beforeend',
      closeSpanIconCreation.outerHTML
    );
    frame.contentWindow.document.body.insertAdjacentHTML(
      'afterbegin',
      closeDivIconCreation.outerHTML
    );
    const svgCloseElement: (SVGElement & HTMLElement) | null =
      frame.contentWindow.document.querySelector('svg.svg-inline--fa.fa-xmark');

    if (svgCloseElement === null) {
      variableIsNull(Object.keys({ svgCloseElement })[0], 'renameManager.ts');

      return;
    }

    svgCloseElement.style.height = '25px';

    const closeSpanIcon: HTMLSpanElement | null =
      frame.contentWindow.document.querySelector('#closeSpanIcon');

    if (closeSpanIcon === null) {
      variableIsNull(Object.keys({ closeSpanIcon })[0], 'renameManager.ts');

      return;
    }

    closeSpanIcon.addEventListener('click', (): void => {
      closeSettingsFrame();
    });
    const script: HTMLScriptElement = document.createElement('script');

    script.src = `${server}/scripts/renameManager/renameManager.js`;
    head.appendChild(script);
    const link: HTMLLinkElement = document.createElement('link');

    const userApi: User = await (await fetch('/api/user')).json();

    if (userApi.usesDarkMode) {
      link.href = `${server}/theme/smui-dark.css`;
    } else {
      link.href = `${server}/theme/smui.css`;
    }

    link.rel = 'stylesheet';
    head.appendChild(link);
    const link2: HTMLLinkElement = document.createElement('link');

    link2.href = `${server}/scripts/renameManager/css/renameManager.css`;
    link2.rel = 'stylesheet';
    head.appendChild(link2);
  };

  const createPageLink = function (): void {
    const anchorPoint: HTMLLIElement | null =
      document.querySelector('#darkMode');

    if (anchorPoint === null) {
      variableIsNull(Object.keys({ anchorPoint })[0], 'renameManager.ts');

      return;
    }
    const li: HTMLLIElement = document.createElement('li');

    li.id = 'renameManager';
    li.innerHTML = `Umbenennen ${truckIcon.html}`;
    anchorPoint.insertAdjacentHTML('afterend', li.outerHTML);

    const renameManagerSettingsOpener: HTMLLIElement | null =
      document.querySelector('#renameManager');

    if (renameManagerSettingsOpener === null) {
      variableIsNull(
        Object.keys({ renameManagerSettingsOpener })[0],
        'renameManager.ts'
      );

      return;
    }

    renameManagerSettingsOpener.addEventListener('click', (): void => {
      openFrame('', '1/1/4/5');
      const frame: HTMLIFrameElement | null = document.querySelector('#iframe');

      if (frame === null || frame.contentWindow === null) {
        if (frame === null) {
          variableIsNull(Object.keys({ frame })[0], 'renameManager.ts');
        } else {
          variableIsNull(
            `${Object.keys({ frame })[0]}.contentWindow`,
            'renameManager.ts'
          );
        }

        return;
      }

      frame.setAttribute('data-source', 'renameManager');
      if (
        (frame.src === '' ||
          frame.src === 'https://rettungssimulator.online/') &&
        !frame.contentWindow.document.querySelector('#renameManager') &&
        frame.getAttribute('data-source') === 'renameManager'
      ) {
        frame.addEventListener('load', loadRenameFrame);
      }
    });
  };

  if (!self.top) {
    return;
  }

  if (
    !RegExp(
      /^https:\/\/(www.)?rettungssimulator.online(\/#?\??(#[A-Za-z=]*)?)?$/
    ).test(window.location.href)
  ) {
    return;
  }
  createPageLink();
};

export { renameManager };
