import axios from 'axios';

export const postSignUp = async (payload) => {
    const res = await axios.post('/signUp.php', payload);
    return res;
}