import HDWalletProvider from "truffle-hdwallet-provider";
import Web3 from "web3";
import SetProtocol from "setprotocol.js";

const mnemonic = process.env.MNEMONIC;
const infuraAPIHost = process.env.INFURA_API_HOST;

export const provider = new HDWalletProvider(mnemonic, `${infuraAPIHost}`);
export const web3 = new Web3(provider);

const setProtocolConfig = {
  coreAddress: process.env.CORE_ADDRESS,
  transferProxyAddress: process.env.TRANSFER_PROXY_ADDRESS,
  vaultAddress: process.env.VAULT_ADDRESS,
  setTokenFactoryAddress: process.env.SET_TOKEN_FACTORY_ADDRESS,
  rebalancingSetTokenFactoryAddress: process.env.REBALANCING_SET_TOKEN_FACTORY_ADDRESS,
  rebalanceAuctionModuleAddress: process.env.REBALANCE_MODULE_ADDRESS,
  kyberNetworkWrapperAddress: process.env.KYBER_NETWORK_WRAPPER_ADDRESS,
  exchangeIssuanceModuleAddress: process.env.EXCHANGE_ISSUE_MODULE_ADDRESS,
  rebalancingSetExchangeIssuanceModule:
    process.env.REBALANCING_SET_TOKEN_EXCHANGE_ISSUANCE_MODULE_ADDRESS,
  wrappedEtherAddress: process.env.WRAPPED_ETHER_ADDRESS,
  protocolViewerAddress: process.env.PROTOCOL_VIEWER_ADDRESS,
};

export const setProtocol = new SetProtocol(web3, setProtocolConfig);
