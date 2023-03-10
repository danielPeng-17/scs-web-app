import axios from 'axios';

export const postSignUp = async (payload) => {
    const res = await axios.post('/signUp.php', payload);
    return res;
}

export const postSignIn = async (payload) => {
    const res = await axios.post('/signIn.php', payload);
    return res;
}

export const getCart = async (payload) => {
    const res = await axios.post('/shoppingCart.php', payload);
    return res;
}