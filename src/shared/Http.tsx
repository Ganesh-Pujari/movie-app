import axios from 'axios';

export const get = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (err) {
        return;
    }
};