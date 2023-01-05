const getGameServer = function (): string {
  return process.env.MODE === 'beta'
    ? 'https://beta.rettungssimulator.online/'
    : 'https://rettungssimulator.online/';
};

const getHostServer = function (): string {
  return process.env.MODE === 'production'
    ? 'https://keineahnung.eu/resi-script-manager'
    : 'http://localhost:8080';
};

export { getGameServer, getHostServer };
