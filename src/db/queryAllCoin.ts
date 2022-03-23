const queryAllCoin = async userRepository => {
  try {
    const data = await userRepository.find({
      select: {
        cryptocurrensy_symbol: true,
        price_average: true,
      },
      order: {
        id: 'DESC',
      },
      take: 20,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default queryAllCoin;
