import { loadSettingsFrame } from './iframe';
import { faJsSquare } from '@fortawesome/free-brands-svg-icons';
import { Icon, icon, library } from '@fortawesome/fontawesome-svg-core';
import { getGameServer } from './helper/config';
import { variableIsNull } from '../ts/errors/console';

const createPageLink = function (): void {
  library.add(faJsSquare);
  const jsSquare: Icon = icon(faJsSquare);
  const gameServer: string = getGameServer();
  const anchorPoint: HTMLLIElement | null = document.querySelector('#darkMode');

  if (anchorPoint === null) {
    variableIsNull(Object.keys({ anchorPoint })[0], 'init.ts');

    return;
  }
  const li: HTMLLIElement = document.createElement('li');

  li.id = 'scriptManager';
  li.innerHTML = `Skripte ${jsSquare.html}`;
  anchorPoint.insertAdjacentHTML('afterend', li.outerHTML);

  const scriptManagerSettingsOpener: HTMLLIElement | null =
    document.querySelector('#scriptManager');

  if (scriptManagerSettingsOpener === null) {
    variableIsNull(Object.keys({ scriptManagerSettingsOpener })[0], 'init.ts');

    return;
  }

  scriptManagerSettingsOpener.addEventListener('click', (): void => {
    openFrame('', '1/1/4/5');
    const frame: HTMLIFrameElement | null = document.querySelector('#iframe');

    if (frame === null || frame.contentWindow === null) {
      if (frame === null) {
        variableIsNull(Object.keys({ frame })[0], 'init.ts');
      } else {
        variableIsNull(`${Object.keys({ frame })[0]}.contentWindow`, 'init.ts');
      }

      return;
    }

    frame.setAttribute('data-source', 'scriptManager');
    if (
      (frame.src === '' || frame.src === gameServer) &&
      !frame.contentWindow.document.querySelector('#scriptManagerSettings') &&
      frame.getAttribute('data-source') === 'scriptManager'
    ) {
      frame.addEventListener('load', loadSettingsFrame);
    }
  });
};

(async (): Promise<void> => {
  if (!self.top) {
    return;
  }

  if (
    (process.env.MODE === 'beta' &&
      !RegExp(
        /^https:\/\/(beta.)?rettungssimulator.online(\/#?\??(#[A-Za-z=]*)?)?$/
      ).test(window.location.href)) ||
    !RegExp(
      /^https:\/\/(www.)?rettungssimulator.online(\/#?\??(#[A-Za-z=]*)?)?$/
    ).test(window.location.href)
  ) {
    return;
  }

  createPageLink();
})();
