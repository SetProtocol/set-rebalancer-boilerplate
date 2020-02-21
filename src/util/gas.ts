import axios from "axios";

export const getGasPrice = async (gasPrice: number) => {
  let gasPriceResult = gasPrice;

  if (!gasPriceResult) {
    const gasPrices = await axios.get(`${process.env.SET_API_HOST}/public/v1/gas_price`);
    gasPriceResult = gasPrices.data.fast;
  }

  return gasPriceResult.toString();
};
