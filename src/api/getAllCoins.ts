import getArrCoinMarketCap from './CoinMarketCap';
import getCoinBase from './CoinBase';
import getArrCoinStats from './CoinStats';
import getArrKucoin from './Kucoin';
import getArrCoinPaprika from './Coinpaprika';

const getAllCoins = async () => {
  try {
    const arrCoinMarketCap = await getArrCoinMarketCap();
    const arrCoinBase = await getCoinBase();
    const arrCoinStats = await getArrCoinStats();
    const arrKucoin = await getArrKucoin();
    const arrArrCoinPaprika = await getArrCoinPaprika();
    const allCoins = arrCoinMarketCap.concat(
      arrCoinBase,
      arrCoinStats,
      arrKucoin,
      arrArrCoinPaprika,
    );
    return allCoins;
  } catch (error) {
    console.log(error);
  }
};

export default getAllCoins;
