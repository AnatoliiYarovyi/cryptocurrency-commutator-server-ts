import * as fs from 'fs/promises';
import * as path from 'path';

import getAllCoins from '../api/getAllCoins';

const getCurrentPrice = async () => {
  try {
    const nameCoins = await getNameCoins(); // reading from the file the "name" of the desired bitcoins
    const arrAllCoins = await getAllCoins(); // get an array of objects from all markets
    const price = getPrice(nameCoins, arrAllCoins); // find current prices
    console.log('price', price);
    return price;
  } catch (error) {
    console.log(error);
  }
};

// reading from the file the "name" of the desired bitcoins
const getNameCoins = async () => {
  try {
    const filesPath = path.join(__dirname, 'dbNameCoin.json');

    const data = await fs.readFile(filesPath).then(async dataNameCoin => {
      const dataPars = await JSON.parse(dataNameCoin.toString());
      return dataPars;
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// find current prices
const getPrice = (nameCoins, arrAllCoins) => {
  return nameCoins.reduce((acc, el) => {
    const findCoin = arrAllCoins.filter(({ name, symbol }) => {
      return name === el.name || symbol === el.symbol;
    });

    const shops = {
      CoinMarketCap: null,
      CoinBase: null,
      CoinStats: null,
      Kucoin: null,
      CoinPaprika: null,
    };
    findCoin.map(({ shop_name, price }) => {
      let coinPrice;
      if (price) {
        coinPrice = price;
      } else {
        coinPrice = null;
      }
      switch (shop_name) {
        case 'coinMarketCap':
          shops.CoinMarketCap = coinPrice;
          break;
        case 'coinBase':
          shops.CoinBase = coinPrice;
          break;
        case 'coinStats':
          shops.CoinStats = coinPrice;
          break;
        case 'kucoin':
          shops.Kucoin = coinPrice;
          break;
        case 'coinPaprika':
          shops.CoinPaprika = coinPrice;
          break;
        default:
          console.log('Invalid store name');
      }
    });

    acc.push({
      name: el.name,
      symbol: el.symbol,
      coinMarketCap: shops.CoinMarketCap,
      coinBase: shops.CoinBase,
      coinStats: shops.CoinStats,
      kucoin: shops.Kucoin,
      coinPaprika: shops.CoinPaprika,
      price_average:
        (shops.CoinMarketCap +
          shops.CoinBase +
          shops.CoinStats +
          shops.Kucoin +
          shops.CoinPaprika) /
        5,
    });
    return acc;
  }, []);
};

export default getCurrentPrice;
