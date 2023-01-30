import React from "react";
import { atom, selector } from 'recoil';

export const user = atom({
    key: 'user',
    default: {
        id: 2,
        username: '',
        email: ''
    },
});

export const token = atom({
    key: 'token',
    default: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnaG9zdG9yYml0ZXIiLCJpcCI6IjE5NC4yOS4xMzcuMjIiLCJleHAiOjE2NzUxMTgyODUsImlhdCI6MTY3NTAzMTg4NSwidXNlci1hZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMDkuMC4wLjAgU2FmYXJpLzUzNy4zNiJ9.ajoh_hy9wZ6DXYURRtJOS_hArsztkM84U5xwNoGr5OkLyfi6fzboOYGoQVAI4ipef6S6pUxJXjNVA0ivKt6-jQ'
});

export const logged = atom({
    key: 'logged',
    default: true
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