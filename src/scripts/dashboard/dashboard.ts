import {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  variableIsNull,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  variableIsUndefined
} from '../../ts/errors/console';
import { closeSettingsFrame } from '../../ts/iframe';
import { faTimes, faChartPie } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../types/api/User';
import { Icon, icon, library } from '@fortawesome/fontawesome-svg-core';
import { getHostServer, getGameServer } from '../../ts/helper/config';

const dashboard = async function (): Promise<any> {
  library.add(faChartPie, faTimes);
  const chartIcon: Icon = icon(faChartPie);
  const closeIcon: Icon = icon(faTimes);
  const server: string = getHostServer();

  const loadDashboardFrame = async function (): Promise<void> {
    const frame: HTMLIFrameElement | null = document.querySelector('#iframe');

    if (frame === null) {
      variableIsNull(Object.keys({ frame })[0], 'dashboard.ts');

      return;
    }

    frame.removeEventListener('load', loadDashboardFrame);

    if (frame.contentWindow === null) {
      variableIsNull(
        `${Object.keys({ frame })[0]}.contentWindow`,
        'dashboard.ts'
      );

      return;
    }

    const head: HTMLHeadElement | null =
      frame.contentWindow.document.querySelector('head');

    if (head === null) {
      variableIsNull(Object.keys({ head })[0], 'dashboard.ts');

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
      variableIsNull(Object.keys({ svgCloseElement })[0], 'dashboard.ts');

      return;
    }

    svgCloseElement.style.height = '25px';

    const closeSpanIcon: HTMLSpanElement | null =
      frame.contentWindow.document.querySelector('#closeSpanIcon');

    if (closeSpanIcon === null) {
      variableIsNull(Object.keys({ closeSpanIcon })[0], 'dashboard.ts');

      return;
    }

    closeSpanIcon.addEventListener('click', (): void => {
      closeSettingsFrame();
    });
    const script: HTMLScriptElement = document.createElement('script');

    script.src = `${server}/scripts/dashboard/dashboard.js`;
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

    link2.href = `${server}/scripts/dashboard/css/dashboard.css`;
    link2.rel = 'stylesheet';
    head.appendChild(link2);
  };

  const createPageLink = function (): void {
    const anchorPoint: HTMLLIElement | null =
      document.querySelector('#darkMode');

    if (anchorPoint === null) {
      variableIsNull(Object.keys({ anchorPoint })[0], 'dashboard.ts');

      return;
    }
    const li: HTMLLIElement = document.createElement('li');

    li.id = 'dashboard';
    li.innerHTML = `Dashboard ${chartIcon.html}`;
    anchorPoint.insertAdjacentHTML('afterend', li.outerHTML);

    const dashboardSettingsOpener: HTMLLIElement | null =
      document.querySelector('#dashboard');

    if (dashboardSettingsOpener === null) {
      variableIsNull(
        Object.keys({ dashboardSettingsOpener })[0],
        'dashboard.ts'
      );

      return;
    }

    dashboardSettingsOpener.addEventListener('click', (): void => {
      openFrame('', '1/1/4/5');
      const frame: HTMLIFrameElement | null = document.querySelector('#iframe');

      if (frame === null || frame.contentWindow === null) {
        if (frame === null) {
          variableIsNull(Object.keys({ frame })[0], 'dashboard.ts');
        } else {
          variableIsNull(
            `${Object.keys({ frame })[0]}.contentWindow`,
            'dashboard.ts'
          );
        }

        return;
      }

      frame.setAttribute('data-source', 'dashboard');
      if (
        (frame.src === '' || frame.src === getGameServer()) &&
        !frame.contentWindow.document.querySelector('#dashboard') &&
        frame.getAttribute('data-source') === 'dashboard'
      ) {
        frame.addEventListener('load', loadDashboardFrame);
      }
    });
  };

  if (!self.top) {
    return;
  }

  if (process.env.MODE === 'beta') {
    if (
      !RegExp(
        /^https:\/\/(beta.)?rettungssimulator.online(\/#?\??(#[A-Za-z=]*)?)?$/
      ).test(window.location.href)
    ) {
      return;
    }
  } else {
    if (
      !RegExp(
        /^https:\/\/(www.)?rettungssimulator.online(\/#?\??(#[A-Za-z=]*)?)?$/
      ).test(window.location.href)
    ) {
      return;
    }
  }
  createPageLink();
};

export { dashboard };
