import axios from "axios";

export const getSetId = async (address: string) => {
  const requestOptions = {
    headers: {
      "X-SET-TRADER-API-KEY": process.env.SET_API_KEY,
    },
  };
  const traderData = await axios.get(`${process.env.SET_API_HOST}/public/v1/trader`, requestOptions);
  const chosenSet = traderData.data.trading_pools.find((set) => set.address === address);

  return chosenSet.id;
};
