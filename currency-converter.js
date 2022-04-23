const axios = require('axios');
require('dotenv').config();

const api_key = process.env.api_key; 

// api 1: http://data.fixer.io/api/latest?access_key=[your key here]
// api 2: https://restcountries.com/v3.1/currency/[currency]]


const getExchangeRate = async (fromCurrency, toCurrency) => {
    const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${api_key}`);

    const rate = response.data.rates; 
    const euro = 1/rate[fromCurrency];
    const exchangeRate = euro * rate[toCurrency];
    
    if(isNaN(exchangeRate)){
        throw new Error (`Unable to get currency ${fromCurrency} and ${toCurrency}`);
    }

    return exchangeRate;
}

const getCountries = async (toCurrency) => {
    try{
        const response = await axios.get(`https://restcountries.com/v3.1/currency/${toCurrency}`);
        return response.data.map(country => country.name.common);
    }
    catch(error){
        throw new Error(`Unable to get countries that use ${toCurrency}`);
    }
}

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const exchangeRate = await getExchangeRate(fromCurrency,toCurrency);
    const countries = await getCountries(toCurrency);
    const convertedAmount = (amount * exchangeRate).toFixed(2);

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`;
}

convertCurrency('USD', 'HRK', 30)
    .then((message)=>{
        console.log(message);
    })
    .catch((error)=>{
        console.log(error.message);
    })