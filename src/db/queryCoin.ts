const queryCoin = async (
  userRepository,
  symbolCoin,
  shopCoin: any = 'price_average',
  limit = 12,
) => {
  try {
    const dataCoin = await userRepository.find({
      select: {
        cryptocurrensy_symbol: true,
        price_average: true,
      },
      where: {
        cryptocurrensy_symbol: symbolCoin,
      },
      order: {
        id: 'DESC',
      },
      take: limit,
    });

    let sumPrice = null;
    let number = null;
    const data = dataCoin.reduce((acc, el, i, arr) => {
      const { cryptocurrensy_symbol, price_average } = el;

      if (price_average) {
        sumPrice += Number(price_average);
        ++number;
      }
      if (i === arr.length - 1) {
        acc = {
          symbol: cryptocurrensy_symbol,
          price: sumPrice / number,
        };
      }
      return acc;
    }, []);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default queryCoin;
