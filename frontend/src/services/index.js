import axios from 'axios';

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
export const getCart = async (payload) => {
    const res = await axios.post(`${baseURL}/shoppingCart.php`, payload);
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