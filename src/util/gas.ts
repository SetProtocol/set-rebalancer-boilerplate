import axios from "axios";

import { web3 } from "../util/ethereum";

export const getGasPrice = async (gasPrice: number) => {
  if (!gasPrice) {
    const gasPrices = await axios.get("https://api.tokensets.com/v1/gas_estimates");
    gasPrice = gasPrices.data.fast;
  }

  return web3.utils.toWei(gasPrice.toString(), "gwei");
};
