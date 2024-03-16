import {
  createScriptLoaderElement,
  createInitLoaderElement
} from './elementCreator';
import { checkConfig } from './config';
import { userIsBlocked } from './block';

window.addEventListener('load', async (): Promise<void> => {
  if (!self.top) {
    return;
  }
  if (userIsBlocked(ReSi.userName)) {
    GrowlNotification.notify({
      title: 'Ausschluss',
      description:
        'Wir haben entschieden, dass du keinen Zugriff mehr auf den Skript-Manager haben sollst. Wenn du dies für einen Fehler hälst, beschwere dich über Discord bei KeineAhnung#0306.',
      type: 'info',
      position: 'top-left'
    });
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
