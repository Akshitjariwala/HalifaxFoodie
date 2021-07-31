import axios from 'axios';

export const registerUser = (payload) => {
    return axios.post('http://localhost:3001/Register', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const getRole = (payload) => {
    console.log(payload);
    return axios.post('http://localhost:3001/FetchRole', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const registerRestaurant = (restaurantRegistration) => {
    return axios.post('http://localhost:3001/RegisterRestaurant', restaurantRegistration)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
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

export const calculateML = (payload) => {
    return axios.post('http://localhost:3001/getSimilarity', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const getMenuList = (payload) => {
    return axios.get('http://localhost:3001/GetMenuList', { params: { payload } })
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const placeOrder = (payload) => {
    return axios.post('http://localhost:3001/placeOrder', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const getOrders = (payload) => {
    console.log(payload);
    return axios.get('http://localhost:3001/getOrders', { params: payload })
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const updateOrder = (payload) => {
    return axios.post('http://localhost:3001/updateOrder', payload)
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

export const logoutUser = () => {
    return axios.post('http://localhost:3001/Logout')
        .then((res) => {
            console.log(res)
            return res;
        })
        .catch(err => { return err.response })
};