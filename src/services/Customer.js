import axios from "axios";

const baseUrl = "https://localhost:7111/nw/customer"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// newCustomer on paramentri, jonka ympärillä voisi olla sulkeet. Kun parametreja on yksi ei sulkeita tarvita. Jos on useampi tai ei yhtään silloin tarvitaan.

const create = newCustomer => {
    return axios.post(baseUrl, newCustomer)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (object) => { // object voi olla suluissa tai voi olla olematta
    return axios.put(`${baseUrl}/${object.customerId}`, object)
}

export default { getAll, create, remove, update }