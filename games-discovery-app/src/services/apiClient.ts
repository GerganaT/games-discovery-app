import axios, {CanceledError} from "axios";

const apiKey = "8db0261150f54753bd3e067abfe2ad37";
const resultsDisplayed = 30;

export default axios.create({
    params:{key:apiKey, page_size: resultsDisplayed}, // name the param in the object according to the server's requirement
    baseURL: "https://api.rawg.io/api",
})

export {CanceledError};