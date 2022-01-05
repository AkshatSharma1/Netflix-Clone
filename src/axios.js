import axios from 'axios';
import requests from './Requests';

//Base url
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

//Send get rew with requests object data from requests.js
// instance.get('./foo-bar')


export default instance;