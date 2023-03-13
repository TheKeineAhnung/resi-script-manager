import { getHostServer } from './helper/config';

const createScriptLoaderElement = function (): HTMLScriptElement {
  const scriptElement = document.createElement('script');
  scriptElement.src = `${getHostServer()}/js/script.js`;

  return scriptElement;
};

const createInitLoaderElement = function (): HTMLScriptElement {
  const scriptElement = document.createElement('script');
  scriptElement.src = `${getHostServer()}/js/init.js`;

  return scriptElement;
};

export { createScriptLoaderElement, createInitLoaderElement };
