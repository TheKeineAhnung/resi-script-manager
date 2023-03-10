import { checkConfig } from './config';
import { loadScripts } from './scriptLoader';

(async () => {
  await checkConfig();
  await loadScripts();
})();
