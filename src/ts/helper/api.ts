import axios from 'axios';
import { firstLetterUppercase } from './general';

type BrowserStorage = 'local' | 'session';
type ApiCacheStatus = 'up-to-date' | 'outdated' | 'non-existent';

const getCacheKey = function (api: string): string {
  return `a${firstLetterUppercase(api)}`;
};

const apiCacheStatus = function (
  api: string,
  storageType: BrowserStorage
): ApiCacheStatus {
  const storage = storageType === 'local' ? localStorage : sessionStorage;
  const cacheKey = getCacheKey(api);
  if (
    storage.getItem(cacheKey) &&
    JSON.parse(storage.getItem(`a${firstLetterUppercase(api)}`) ?? '{}')
      .lastUpdate >
      new Date().getTime() - 5 * 1000 * 60
  ) {
    return 'up-to-date';
  } else if (
    JSON.parse(storage.getItem(cacheKey) ?? '{}').lastUpdate <
    new Date().getTime() - 5 * 1000 * 60
  ) {
    return 'outdated';
  } else {
    return 'non-existent';
  }
};

const apiGet = async function (
  api: string,
  params: object,
  storageType: BrowserStorage,
  cache = true
): Promise<unknown> {
  const storage = storageType === 'local' ? localStorage : sessionStorage;
  const cacheStatus = apiCacheStatus(api, storageType);
  const cacheKey = getCacheKey(api);
  if (cacheStatus === 'up-to-date' && cache) {
    return JSON.parse(storage.getItem(cacheKey) ?? '{}').value;
  }
  const reqData = (await (
    await axios({
      method: 'get',
      url: `api/${api}`,
      params
    })
  ).data) as unknown;
  localStorage.setItem(
    cacheKey,
    JSON.stringify({
      lastUpdate: new Date().getTime(),
      value: reqData
    })
  );
  return reqData;
};

export { apiGet };
