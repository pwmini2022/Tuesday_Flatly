import { atom, selector } from "recoil";

export const user = atom({
  key: 'user',
  default: null,
});

export const getUsername = selector({
  key: 'getUsername',
  get: ({get}) => get(user).username
});

export const getEmail = selector({
  key: 'getEmail',
  get: ({get}) => get(user).email
});
