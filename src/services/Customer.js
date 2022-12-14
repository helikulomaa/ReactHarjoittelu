import axios from "axios";

// const baseUrl = "https://localhost:7111/nw/customer"
const baseUrl = "https://webapiharjoitus20221121201929.azurewebsites.net/nw/customers"

let token = null

// Tämä on metodi, jota kutsutaan aina ennen kuin tehdään muu pyyntö serviceen
// Parametrina annetaan token, joka otetaan local storagesta
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const config = {
        headers: { Authorization: token},
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

// newCustomer on paramentri, jonka ympärillä voisi olla sulkeet. Kun parametreja on yksi ei sulkeita tarvita. Jos on useampi tai ei yhtään silloin tarvitaan.

const create = newCustomer => {
    const config = {
        headers: { Authorization: token},
    }
    return axios.post(baseUrl, newCustomer, config)
}

const remove = id => {
    const config = {
        headers: { Authorization: token},
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

const update = (object) => { // object voi olla suluissa tai voi olla olematta
    const config = {
        headers: { Authorization: token},
    }
    return axios.put(`${baseUrl}/${object.customerId}`, object, config)
}

export default { getAll, create, remove, update, setToken }