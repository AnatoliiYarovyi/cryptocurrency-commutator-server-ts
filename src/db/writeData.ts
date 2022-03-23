import { Coin } from '../entity/Coin';

const writeData = async (manager, data) => {
  try {
    const {
      name,
      symbol,
      coinMarketCap,
      coinBase,
      coinStats,
      kucoin,
      coinPaprika,
      price_average,
    } = data;

    await manager.upsert(
      Coin,
      {
        cryptocurrensy_name: name,
        cryptocurrensy_symbol: symbol,
        coinMarketCap,
        coinBase,
        coinStats,
        kucoin,
        coinPaprika,
        price_average,
        date: new Date().toISOString(),
      },
      {
        conflictPaths: ['id'],
        skipUpdateIfNoValuesChanged: true, // supported by postgres, skips update if it would not change row values
      },
    );
  } catch (error) {
    console.log(error);
  }
};

export default writeData;
