import React from "react";
import { atom, selector } from 'recoil';

export const user = atom({
    key: 'user',
    default: {
        id: 0,
        username: '',
        email: ''
    },
});

export const token = atom({
    key: 'token',
    default: ''
});

export const logged = atom({
    key: 'logged',
    default: false
});

export const numOfItems = atom({
    key: 'numOfItems',
    default: 10
});

export const sortBy = atom({
    key: 'sortBy',
    default: ''
});

export const currParam = atom({
    key: 'currParam',
    default: ''
})