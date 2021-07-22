import axios from 'axios';

export const registerUser = (payload) => {
    return axios.post('http://localhost:3001/Register', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const getRole = (payload) => {
    return axios.post('http://localhost:3001/FetchRole', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const registerRestaurant = (restaurantRegistration) => {
    return axios.post('http://localhost:3001/RegisterRestaurant',restaurantRegistration)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response})
};


export const loginUser = (payload) => {
    return axios.post('http://localhost:3001/Login', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const getRestaurantList = () => {
    return axios.get('http://localhost:3001/GetRestaurantList')
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};


