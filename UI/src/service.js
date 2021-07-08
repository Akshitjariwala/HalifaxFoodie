import axios from 'axios';

export const registerUser = (payload) => {
    return axios.post(`https://register-xb62dfh2va-uc.a.run.app/register`, payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const loginUser = (payload) => {
    return axios.post(`https://login-xb62dfh2va-uc.a.run.app/login`, payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const getAllOnlineUers = () => {
    return axios.get(`https://session-xb62dfh2va-uc.a.run.app/onlineUsers`)
        .then((res) => {
            return res.data;
        })
        .catch(err => { return err.response})
};

export const logoutUser = (payload) => {
    return axios.post(`https://session-xb62dfh2va-uc.a.run.app/logout`, payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};