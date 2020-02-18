import BigNumber from "bignumber.js";

import { web3 } from "../util/ethereum";

export const allocationFormatter = (allocation: number) => {
  const allocationPercentage = new BigNumber(allocation).div(100);
  const allocationInWei = web3.utils.toWei(allocationPercentage.toString(), "ether");
  return new BigNumber(allocationInWei);
};
