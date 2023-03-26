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

// fetch geolocation
export const getLocation = async (payload) => {
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${payload.address}&key=${payload.apikey}`);
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

export const postAdminQuery = async (payload) => {
    const res = await axios.post(`${baseURL}/admin.php`, payload);
    console.log("postadmin");
    return res;
}