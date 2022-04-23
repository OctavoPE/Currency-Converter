const axios = require('axios');
require('dotenv').config();

const api_key = process.env.api_key;

// 1st function - getExchangeRate
// 2nd function - getCountries
// 3rd function - convertCurrency

// api 1: http://data.fixer.io/api/latest?access_key=[your key here]
// api 2: https://restcountries.com/v3.1/currency/usd


const getExchangeRate = (fromCurrency, toCurrency) => {
    axios.get(`http://data.fixer.io/api/latest?access_key=${api_key}`).then((response) => {
        const rate = response.data.rates.AED;
        console.log(rate)
    })
}
