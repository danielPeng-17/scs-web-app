import axios from 'axios';
import qs from 'qs';

const baseURL = 'http://localhost:80/scs';

// create new users
export const postSignUp = async (payload) => {
    const res = await axios.post(`${baseURL}/signUp.php`, payload);
    return res;
}

// sign users in
export const postSignIn = async (payload) => {
    const res = await axios.post(`${baseURL}/signIn.php`, payload);
    return res;
}

// fetch user's shopping cart
export const getShoppingCart = async (payload) => {
    const queryParams = qs.stringify({shoppingCart: payload});
    const res = await axios.get(`${baseURL}/products.php/shoppingCart?${queryParams}`);
    return res;
}

//fetch products
export const getProducts = async () => {
    const res = await axios.get(`${baseURL}/products.php/products`);
    return res;
}

//fetch single product
export const getSingleProduct = async (id) => {
    const res = await axios.get(`${baseURL}/products.php/view?id=${id}`);
    return res;
}

//fetch reviews
export const getReviews = async (id) => {
    const res = await axios.get(`${baseURL}/products.php/reviews?id=${id}`);
    return res;
}

export const addReview = async (payload) => {
    const res = await axios.post(`${baseURL}/products.php/addReview`, payload);
    return res;
}

// fetch geolocation
export const getLocation = async (payload) => {
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${payload.address}&key=${payload.apiKey}`);
    return res;
}

// orders

// fetch order
export const getOrder = async (payload) => {
    const res = await axios.get(`${baseURL}/orders.php`, payload);
    return res;
}

// new order
export const postOrder = async (payload) => {
    const res = await axios.post(`${baseURL}/orders.php`, payload);
    return res;
}

// post to run admin query 
export const postAdminQuery = async (payload) => {
    const res = await axios.post(`${baseURL}/admin.php`, payload);
    return res;
}

// fetch truck data
export const getTruck = async () => {
    const res = await axios.get(`${baseURL}/truck.php`);
    return res;
} 

// fetch order -> orderId & userId
export const getOrder = async (payload) => {
    const { id, userId } = payload;
    const res = await axios.get(`${baseURL}/searchBar.php?id=${id}&userId=${userId}`);
    return res;
};