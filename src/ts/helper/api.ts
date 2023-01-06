import axios from 'axios';
import { firstLetterUppercase } from './general';
import { getGameServer } from './config';

type ApiCacheStatus = 'up-to-date' | 'outdated' | 'non-existent';

const getCacheKey = function (api: string): string {
  return `a${firstLetterUppercase(api)}`;
};

const apiCacheStatus = function (
  api: string,
  storage: Storage
): ApiCacheStatus {
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
  storage: Storage,
  cache = true,
  params?: object
): Promise<unknown> {
  const cacheStatus = apiCacheStatus(api, storage);
  const cacheKey = getCacheKey(api);
  if (cacheStatus === 'up-to-date' && cache) {
    return JSON.parse(storage.getItem(cacheKey) ?? '{}').value;
  }
  const reqData = (await (
    await axios({
      method: 'get',
      url: api,
      params,
      baseURL: `${getGameServer()}api/`
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

const apiPost = async function (api: string, data: object): Promise<unknown> {
  const reqData = (await (
    await axios({
      method: 'post',
      url: api,
      data,
      baseURL: `${getGameServer()}api/`
    })
  ).data) as unknown;
  return reqData;
};

export { apiGet, apiPost };
