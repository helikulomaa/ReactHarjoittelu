import axios from "axios";

// const url = "https://localhost:7111/api/authentication"
const baseUrl = "https://webapiharjoitus20221121201929.azurewebsites.net/api/authentication"

const authenticate = userForAuth => {
    const request = axios.post(baseUrl, userForAuth)
    return request.then(response => response)
}

export default { authenticate }