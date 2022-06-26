import axios from 'axios';

export const get = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        console.log("🚀 ~ file: Movies.ts ~ line 5 ~ getMovies ~ data", data);
        return data;
    } catch (err) {
        console.log("🚀 ~ file: Movies.ts ~ line 10 ~ getMovies ~ err", err);
        return;
    }
};