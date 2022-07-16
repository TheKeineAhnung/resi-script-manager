import { variableIsNull } from '../ts/errors/console';

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

export { closeSettingsFrame, isSettingsFrame };
