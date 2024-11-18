import { FC, useEffect, useState } from 'react';
import { getTonExchangeRate } from '../../utils/getTONExchangeRate';
import './TonExchangeRate.css';

const TonExchangeRate: FC = () => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const rate = await getTonExchangeRate();
      setExchangeRate(rate);
    };

    fetchExchangeRate();
  }, []);

  return (
    <div>
      {exchangeRate !== null ? (
        <div>
          <p>TON exchange rate: {exchangeRate.toFixed(2)}$</p>
          <p>1,5$ equivalent: {(1.5 / exchangeRate).toFixed(3)} TON</p>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default TonExchangeRate;
