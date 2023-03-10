import {
  createScriptLoaderElement,
  createInitLoaderElement
} from './elementCreator';
import { checkConfig } from './config';

window.addEventListener('load', async (): Promise<void> => {
  if (!self.top) {
    return;
  }

  const scriptElement = createScriptLoaderElement();
  const initElement = createInitLoaderElement();
  if (
    (process.env.MODE === 'beta' &&
      !RegExp(
        /^https:\/\/(beta.)?rettungssimulator.online(\/#?\??(#[A-Za-z=]*)?)?$/
      ).test(window.location.href)) ||
    !RegExp(
      /^https:\/\/(www.)?rettungssimulator.online(\/#?\??(#[A-Za-z=]*)?)?$/
    ).test(window.location.href)
  ) {
    document.head.appendChild(scriptElement);

    return;
  }

  sessionStorage.removeItem('scriptManagerActiveScripts');
  await checkConfig();
  document.head.appendChild(scriptElement);
  document.head.appendChild(initElement);
});
