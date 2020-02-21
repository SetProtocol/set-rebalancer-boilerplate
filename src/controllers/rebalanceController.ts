import * as _ from "lodash";
import axios from "axios";
import BigNumber from "bignumber.js";
import { Request, Response } from "express";

import { Address, GasPrices } from "../typings/common";
import { setProtocol, web3 } from "../util/ethereum";
import { allocationFormatter } from "../util/formatters";
import { getGasPrice } from "../util/gas";
import { authorizeRequest } from "../util/request";
import { getSetId } from "../util/set";

/**
 * POST /rebalance/:address
 * Initiate a rebalance for a given Set using a new allocation.
 */
export let rebalance = async (req: Request, res: Response) => {
  if (authorizeRequest(req, res)) {
    return;
  }

  // Your Set's smart contract address.
  const tradingPoolAddress: Address = req.params.address;

  // The allocation you want to rebalance to in the form of a number. Must be an integer.
  // Ex: 50, 100, 0, 75, etc.
  const allocation: BigNumber = allocationFormatter(req.body.allocation);

  // Gas cost is the gas limit, the max amount of gas you'd be willing to pay for the transaction.
  const gasCost: string = req.body.gas_cost || process.env.DEFAULT_GAS_COST;

  // Gas price is the amount of gwei per gas unit used you would pay for a transaction to go through.
  const gasPrice: string = (await getGasPrice(req.body.gas_price)) || process.env.DEFAULT_GAS_PRICE;

  try {
    const transactionHash = await setProtocol.socialTrading.updateAllocationAsync(
      process.env.SET_MANAGER_ADDRESS,
      tradingPoolAddress,
      allocation,
      "0x00",
      {
        // This should be your trader address that owns the Set.
        from: process.env.FROM_ACCOUNT,
        gas: gasCost,
        gasPrice: gasPrice,
      },
    );

    /**
     * Handle feed post
     */
    const setId = await getSetId(tradingPoolAddress);

    const feedPostBody = {
      transaction_hash: transactionHash,
      text: `Rebalancing to a new allocation of ${req.body.allocation}% of this Set's base asset.`,
    };

    const feedPostHeaders = {
      headers: {
        "X-SET-TRADER-API-KEY": process.env.SET_API_KEY,
      },
    };

    axios
      .post(`${process.env.SET_API_HOST}/public/v1/trading_pools/${setId}/feed_post`, feedPostBody, feedPostHeaders)
      .then(res => console.log("Response from /v1/trading_pools/${setId}/feed_post:", res.status))
      .catch(error => console.log("Error from /v1/trading_pools/${setId}/feed_post: ", error.message));

    const response = { transaction_hash: transactionHash };
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({
      error: {
        type: "InvalidRequest",
        message: `${error}`,
      },
    });

    // Propagate error to error handler middlewares
    throw error;
  }
};
