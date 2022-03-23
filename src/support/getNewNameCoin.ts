import axios from 'axios';
import fs from 'fs/promises';

const endPoints =
  'https://api.coinstats.app/public/v1/coins?limit=20&currency=USD';

async function getNewNameCoin() {
  try {
    const arrCryptos = await getArrCryptos(endPoints);
    const stringData = await JSON.stringify(arrCryptos);

    const pathFile = __dirname + 'dbNameCoin.json';

    await fs.writeFile(pathFile, stringData);
    console.log(`Data save in "dbNameCoin.json"`);
  } catch (error) {
    console.log(error);
  }
}

const getArrCryptos = async endPoints => {
  return await Promise.all(
    await axios.get(endPoints).then(resp => {
      const dataCoins = resp.data.coins;
      return dataCoins.reduce((acc, el, i) => {
        acc.push({
          id: i + 1,
          name: el.name,
          symbol: el.symbol,
        });
        return acc;
      }, []);
    }),
  );
};

getNewNameCoin();
// export default getNewNameCoin;
