import axios from 'axios';
const API_KEY=process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`; // Change URL based on the API you choose

export const fetchExchangeRates = async (baseCurrency: string) => {
    try {
        const response = await axios.get(`${API_URL}${baseCurrency}`);
        console.log(response);
        
        return response.data.conversion_rates;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        throw error;
    }
};
