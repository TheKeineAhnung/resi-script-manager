import { variableIsNull } from '../ts/errors/console';
import { User } from '../types/api/User';
import { apiGet } from './helper/api';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Icon, icon, library } from '@fortawesome/fontawesome-svg-core';
import { getHostServer } from './helper/config';

const loadSettingsFrame = async function (): Promise<void> {
  library.add(faTimes);
  const closeIcon: Icon = icon(faTimes);
  const hostServer: string = getHostServer();
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
  frame.contentWindow.document.body.style.overflowX = 'hidden';

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

  script.src = `${hostServer}/js/svelte/settings.js`;
  head.appendChild(script);
  const link: HTMLLinkElement = document.createElement('link');

  const userApi = (await apiGet(
    'user',
    sessionStorage,
    false
  )) as unknown as User;

  if (userApi.usesDarkMode) {
    link.href = `${hostServer}/theme/smui-dark.css`;
  } else {
    link.href = `${hostServer}/theme/smui.css`;
  }

  link.rel = 'stylesheet';
  head.appendChild(link);
  const link2: HTMLLinkElement = document.createElement('link');

  link2.href = `${hostServer}/js/svelte/css/settings.css`;
  link2.rel = 'stylesheet';
  head.appendChild(link2);

  const charset = document.createElement('meta');
  charset.setAttribute('charset', 'utf-8');
  head.appendChild(charset);
};

const closeSettingsFrame = function (): void {
  const iframe: HTMLIFrameElement | null = document.querySelector('#iframe');

  if (iframe === null) {
    variableIsNull(Object.keys({ iframe })[0], 'iframe.ts');

    return;
  }
  iframe.remove();
  const frame: HTMLIFrameElement = document.createElement('iframe');

  frame.id = 'iframe';
  frame.classList.add('panel');
  frame.setAttribute('data-hj-allow-iframe', '');
  const mainarea: HTMLDivElement | null = document.querySelector('#mainarea');

  if (mainarea === null) {
    variableIsNull(Object.keys({ mainarea })[0], 'iframe.ts');

    return;
  }

  mainarea.style.overflow = 'unset';
  mainarea.appendChild(frame);

  // ! frameVisible is a variable of rettungssimulator.online
  // ! You can find it in the controlCenter.js file
  for (const i in frameVisible) {
    // @ts-expect-error frameVisible is a variable of rettungssimulator.online
    // eslint-disable-next-line no-undef
    frameVisible[i] = true;
  }

  // ! hidePanels is a function of rettungssimulator.online
  // ! You can find it in the controlCenter.js file
  hidePanels();
};

const isSettingsFrame = function (): boolean {
  return (
    document.querySelector('#iframe')?.getAttribute('data-source') ===
    'scriptManager'
  );
};

export { loadSettingsFrame, closeSettingsFrame, isSettingsFrame };
