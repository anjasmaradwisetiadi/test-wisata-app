import axios from "axios";

const apiKey = import.meta.env.VITE_API_URL;

const instanceAxios = axios.create({
    baseURL: apiKey,
});

instanceAxios.defaults.withCredentials = false;
instanceAxios.interceptors.request.use((config) => {
    let itemStorage = getLocalStorage();
    if (itemStorage) {
      itemStorage = JSON.parse(itemStorage);
      config.headers = config.headers || {};
      config.headers['Authorization'] = itemStorage.access_token ? `Bearer ${itemStorage.access_token}` : "";
    }
    return config;
});

export default instanceAxios;