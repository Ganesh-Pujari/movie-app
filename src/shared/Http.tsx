import axios from "axios";

export const get = async (url: string) => {
  try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_ACCESS_TOKEN,
        },
      });
    return data;
  } catch (err) {
    return;
  }
};
