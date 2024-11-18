import axios from 'axios';

export const getTonExchangeRate = async (): Promise<number> => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/the-open-network',
    );
    const data = response.data;
    return data.market_data.current_price.usd;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return 0;
  }
};
