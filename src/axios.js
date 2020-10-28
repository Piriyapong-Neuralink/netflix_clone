import axios from 'axios';

// Custom instance axios
// -- create custom config
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export default instance;