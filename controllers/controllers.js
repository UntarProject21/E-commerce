 const axios = require("axios");
 var env = require('dotenv').config()

var HOST = process.env.DB_URL + "/api";

function getProducts() {
    return axios
        .get(HOST + "/getproducts")
        .then((data) => response.data)
        .catch((error) => console.log(error));
}

function getProduct(pid) {
    return axios
        .get(HOST + "/getproduct", {
            params: {
                pid: pid
            }
        })
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

module.exports = {
    getProduct,
    getProducts
}