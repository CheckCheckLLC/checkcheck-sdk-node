import CheckCheck from '../src';

const API_KEY =
  'f0da95ce508d74b29ceb9193cbb3f592f47b11840eb15f3a2a94b804e76ffe1d';

let checkCheck: CheckCheck;

export const getCheckCheckInstance = () => {
  if (checkCheck) {
    return checkCheck;
  }
  checkCheck = new CheckCheck(API_KEY);
  return checkCheck;
};
