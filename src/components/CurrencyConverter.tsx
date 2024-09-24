import { useEffect, useState } from 'react';
import { fetchExchangeRates } from '../services/currencyService';

const CurrencyConverter = () => {
    const [rates, setRates] = useState<{ [key: string]: number }>({});
    const [amount, setAmount] = useState<number>(1);
    const [fromCurrency, setFromCurrency] = useState<string>('USD');
    const [toCurrency, setToCurrency] = useState<string>('INR');
    const [convertedAmount, setConvertedAmount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getExchangeRates = async () => {
            try {
                const ratesData = await fetchExchangeRates(fromCurrency);
                console.log(ratesData);
                
                if (!ratesData || !ratesData[toCurrency]) {
                    throw new Error('Currency not found or data unavailable');
                }
                setRates(ratesData);
                setConvertedAmount(amount * ratesData[toCurrency]);
            } catch (err) {
                console.error('Error fetching exchange rates:', err);
                setError('Failed to fetch exchange rates.');
            }
        };

        getExchangeRates();
    }, [fromCurrency, toCurrency, amount]);

    const handleConvert = () => {
        if (rates[toCurrency]) {
            setConvertedAmount(amount * rates[toCurrency]);
        } else {
            setError('Conversion rate not available.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Currency Converter</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="flex flex-col space-y-4">
                    <div className="flex space-x-4">
                        <select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {rates && Object.keys(rates).length > 0 ? (
                                Object.keys(rates).map((currency) => (
                                    <option key={currency} value={currency}>
                                        {currency}
                                    </option>
                                ))
                            ) : (
                                <option value="">Loading...</option>
                            )}
                        </select>
                        <select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {rates && Object.keys(rates).length > 0 ? (
                                Object.keys(rates).map((currency) => (
                                    <option key={currency} value={currency}>
                                        {currency}
                                    </option>
                                ))
                            ) : (
                                <option value="">Loading...</option>
                            )}
                        </select>
                    </div>

                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter amount"
                    />

                    <button
                        onClick={handleConvert}
                        className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Convert
                    </button>
                </div>

                {convertedAmount > 0 && (
                    <div className="mt-6 text-center">
                        <h2 className="text-xl font-semibold text-gray-700">
                            {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurrencyConverter;
