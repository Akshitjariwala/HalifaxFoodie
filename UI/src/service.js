import axios from 'axios';

export const registerUser = (payload) => {
    return axios.post('https://service-66eshghvya-de.a.run.app/Register', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const getRole = (payload) => {
    console.log(payload);
    return axios.post('https://service-66eshghvya-de.a.run.app/FetchRole', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const registerRestaurant = (restaurantRegistration) => {
    return axios.post('https://service-66eshghvya-de.a.run.app/RegisterRestaurant', restaurantRegistration)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const loginUser = (payload) => {
    return axios.post('https://service-66eshghvya-de.a.run.app/Login', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const saveMenuItem = (payload) => {
    return axios.post('https://service-66eshghvya-de.a.run.app/SaveMenuItem', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const calculateML = (payload) => {
    return axios.post('https://service-66eshghvya-de.a.run.app/getSimilarity', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const getMenuList = (payload) => {
    return axios.get('https://service-66eshghvya-de.a.run.app/GetMenuList', { params: { payload } })
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const placeOrder = (payload) => {
    return axios.post('https://service-66eshghvya-de.a.run.app/placeOrder', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const getOrders = (payload) => {
    console.log(payload);
    return axios.get('https://service-66eshghvya-de.a.run.app/getOrders',{ params: { payload } })
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const updateOrder = (payload) => {
    return axios.post('https://service-66eshghvya-de.a.run.app/updateOrder', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const getRestaurantList = () => {
    return axios.get('https://service-66eshghvya-de.a.run.app/GetRestaurantList')
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const pushChatMessage = (payload) => {
    return axios.post('https://service-66eshghvya-de.a.run.app/PublishChatMessage', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const fetchChatMessage = (payload) => {
    console.log("in fetch message"+payload);
    return axios.get('https://service-66eshghvya-de.a.run.app/GetChatMessage',{ params: { payload } })
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const pushChatMessageRestaurant = (payload) => {
    return axios.post('https://service-66eshghvya-de.a.run.app/PublishChatMessageRestaurant', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const fetchChatMessageRestaurant = (payload) => {
    console.log("in fetch message"+payload);
    return axios.get('https://service-66eshghvya-de.a.run.app/GetChatMessageRestaurant',{ params: {payload} })
        .then((res) => {
            console.log(res)
            return res;
        })
        .catch(err => { return err.response })
};

export const logoutUser = () => {
    return axios.post('https://service-66eshghvya-de.a.run.app/Logout')
        .then((res) => {
            console.log(res)
            return res;
        })
        .catch(err => { return err.response })
};

export const deleteSubscription = () => {
    return axios.post('https://service-66eshghvya-de.a.run.app/DeleteSubscription')
        .then((res) => {
            console.log(res)
            return res;
        })
        .catch(err => { return err.response })
};

