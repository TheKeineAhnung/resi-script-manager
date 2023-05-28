import { blockedUsers } from '../data/blockedUsers';

const userIsBlocked = function (username: string): boolean {
  console.log(username);
  const findUser: string | undefined = blockedUsers.find(blockedUser => {
    return username.match(new RegExp(blockedUser, 'gm'));
  });
  console.log(findUser, typeof findUser);

  return typeof findUser === 'string';
};

export { userIsBlocked };
