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

export const saveMenuItem = (payload) => {
    return axios.post('http://localhost:3001/SaveMenuItem', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const getMenuList = (payload) => {
    return axios.post('http://localhost:3001/GetMenuList', payload)
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

export const pushChatMessage = (payload) => {
    return axios.post('http://localhost:3001/PublishChatMessage', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const fetchChatMessage = () => {
    return axios.get('http://localhost:3001/GetChatMessage')
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const pushChatMessageRestaurant = (payload) => {
    return axios.post('http://localhost:3001/PublishChatMessageRestaurant', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const fetchChatMessageRestaurant = () => {
    return axios.get('http://localhost:3001/GetChatMessageRestaurant')
        .then((res) => {
            console.log(res)
            return res;
        })
        .catch(err => { return err.response })
};


