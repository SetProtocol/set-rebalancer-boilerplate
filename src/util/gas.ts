import axios from "axios";

export const getGasPrice = async (gasPrice: number) => {
  let gasPriceResult = gasPrice;

  if (!gasPriceResult) {
    const gasPrices = await axios.get("https://api.tokensets.com/public/v1/gas_price");
    gasPriceResult = gasPrices.data.fast;
  }

  return gasPriceResult.toString();
};
