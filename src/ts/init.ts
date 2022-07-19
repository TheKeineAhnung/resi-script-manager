import { closeSettingsFrame } from './iframe';
import { Config } from '../types/Config';
import { faJsSquare } from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { getScriptNames } from './scripts';
import { loadScripts } from './scriptLoader';
import { variableIsNull } from '../ts/errors/console';
import { User } from '../types/api/User';
import { getConfig, setConfigItem, updateConfig } from './config';
import { Icon, icon, library } from '@fortawesome/fontawesome-svg-core';

library.add(faJsSquare, faTimes);
const jsSquare: Icon = icon(faJsSquare);
const closeIcon: Icon = icon(faTimes);
let server: string;

if (process.env.NODE_ENV === 'development') {
  server = 'https://localhost';
} else {
  server = 'https://keineahnung.eu/resi-script-manager';
}

const loadSettingsFrame = async function (): Promise<void> {
  const frame: HTMLIFrameElement | null = document.querySelector('#iframe');

  if (frame === null) {
    variableIsNull(Object.keys({ frame })[0], 'init.ts');

    return;
  }

  frame.removeEventListener('load', loadSettingsFrame);

  if (frame.contentWindow === null) {
    variableIsNull(`${Object.keys({ frame })[0]}.contentWindow`, 'init.ts');

    return;
  }

  const head: HTMLHeadElement | null =
    frame.contentWindow.document.querySelector('head');

  if (head === null) {
    variableIsNull(Object.keys({ head })[0], 'init.ts');

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

  const closeDivIconCreation: HTMLDivElement = document.createElement('div');

  closeDivIconCreation.id = 'closeDivIcon';
  closeDivIconCreation.style.width = '100%';
  closeDivIconCreation.style.display = 'flex';
  closeDivIconCreation.style.justifyContent = 'end';

  const closeSpanIconCreation: HTMLSpanElement = document.createElement('span');

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
    variableIsNull(Object.keys({ svgCloseElement })[0], 'init.ts');

    return;
  }

  svgCloseElement.style.height = '25px';

  const closeSpanIcon: HTMLSpanElement | null =
    frame.contentWindow.document.querySelector('#closeSpanIcon');

  if (closeSpanIcon === null) {
    variableIsNull(Object.keys({ closeSpanIcon })[0], 'init.ts');

    return;
  }

  closeSpanIcon.addEventListener('click', (): void => {
    closeSettingsFrame();
  });
  const script: HTMLScriptElement = document.createElement('script');

  script.src = `${server}/js/svelte/settings.js`;
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

  link2.href = `${server}/js/svelte/css/settings.css`;
  link2.rel = 'stylesheet';
  head.appendChild(link2);

  const buttonInterval = setInterval((): void => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    addReloadAction(frame);
  }, 100);

  const addReloadAction = function (frameVar: HTMLIFrameElement): void {
    if (frameVar.contentDocument === null) {
      variableIsNull(
        `${Object.keys({ frameVar })[0]}.contentDocument`,
        'init.ts'
      );

      return;
    }
    if (frameVar.contentDocument.querySelector('#saveButtonReload')) {
      const button: HTMLButtonElement | null =
        frameVar.contentDocument.querySelector('#saveButtonReload');

      if (button !== null) {
        button.addEventListener('click', (): void => {
          window.location.reload();
        });
      }

      clearInterval(buttonInterval);
    }
  };
};

const createPageLink = function (): void {
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
      (frame.src === '' || frame.src === 'https://rettungssimulator.online/') &&
      !frame.contentWindow.document.querySelector('#scriptManagerSettings') &&
      frame.getAttribute('data-source') === 'scriptManager'
    ) {
      frame.addEventListener('load', loadSettingsFrame);
    }
  });
};

const checkConfig = async function (): Promise<void> {
  const scriptNames: string[] = await getScriptNames();
  const config: Config = await getConfig();

  scriptNames.forEach(async (element): Promise<void> => {
    if (!Object.keys(config).includes(element)) {
      await setConfigItem(element, { active: false });
    }
  });

  // Sort config object by key
  const sortedConfig: Config = {};

  Object.keys(config)
    // eslint-disable-next-line id-length
    .sort((a, b): number => a.localeCompare(b))
    .forEach((key): void => {
      sortedConfig[key] = config[key];
    });
  updateConfig(sortedConfig);
};

window.addEventListener('load', async (): Promise<void> => {
  if (!self.top) {
    return;
  }

  if (
    !RegExp(/^https:\/\/(www.)?rettungssimulator.online(\/#?\??)?$/).test(
      window.location.href
    )
  ) {
    await loadScripts();

    return;
  }
  sessionStorage.removeItem('scriptManagerActiveScripts');
  createPageLink();
  await checkConfig();
  await loadScripts();
});
