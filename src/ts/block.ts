import { blockedUsers } from '../data/blockedUsers';

const userIsBlocked = function (username: string): boolean {
  const findUser: string | undefined = blockedUsers.find(blockedUser => {
    return username.match(new RegExp(blockedUser, 'gm'));
  });

  return typeof findUser === 'string';
};

export { userIsBlocked };
