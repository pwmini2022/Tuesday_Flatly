import { atom, selector } from "recoil";

export const user = atom({
  key: 'user',
  default: null,
});

export const getUserName = selector({
  key: 'getUserName',
  get: ({get}) => get(user).username
});

export const getUserEmail = selector({
  key: 'getUserEmail',
  get: ({get}) => get(user).email
});

export const getUserToken = selector({
  key: 'getUserToken',
  get: ({get}) => get(user).token
});
