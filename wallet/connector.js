import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [56, 1, 97],
});

export const REACT_APP_API_URL = "https://api.vcgamers.io/";
export const API_URL = REACT_APP_API_URL;
export const API_KEY_BSC = "VHEB53E4Y115CT5ZPV1KUP6EKTC3CWFYAN";
export const BSC_RPC = "https://bsc-dataseed1.binance.org/";
export const API_BSC_SCAN =
  "https://apis.ankr.com/37d357f51dd54b2e92a99f19a5e036a8/e18df296a67dc5f3fdbfbc990c10bf76/binance/full/test";
export const ETH_RPC =
  "https://mainnet.infura.io/v3/e83a8c54240f48c3bb04c457d4c04946";
export const walletConnect = new WalletConnectConnector({
  rpc: { 1: ETH_RPC, 56: BSC_RPC },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 12000,
});

export const REACT_APP_BSC_BRIDGE =
  "0xd3432e42925DEF749909D55FDC149B48d94eA44d";
export const REACT_APP_ETH_BRIDGE =
  "0xd3432e42925DEF749909D55FDC149B48d94eA44d";

export const REACT_APP_BSC_TOKEN = "0x1F36FB2D91d9951Cf58aE4c1956C0b77e224F1E9";
export const REACT_APP_ETH_TOKEN = "0x1F36FB2D91d9951Cf58aE4c1956C0b77e224F1E9";

export const REACT_APP_PANCAKE_ROUTER =
  "0x10ED43C718714eb63d5aA57B78B54704E256024E";
export const REACT_APP_PANCAKE_FACTORY =
  "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";

export const REACT_APP_PERCENTAGE = 10;
export const REACT_APP_ADMIN_ADDRESS = 0x01a0a01815769775b59215ba402c8be67efe8cd5;

export const AddressZero = "0x0000000000000000000000000000000000000000";

export const REACT_APP_ERC721_FACTORY_ADDRESS =
  "0x723e6b6C3E68F4524443dDC825F3BB90A0e0f2fc";
export const REACT_APP_ERC1155_FACTORY_ADDRESS =
  "0x26825cf9f5D795CbcD4c5b5aAcC0a9D5117dfbE5";

export const REACT_APP_NFT_MARKETPLACE =
  "0x47F23A148394e10008d4108ed6a12BcCC0F32b48";

export const REACT_APP_NFT_MARKETPLACE_ROYALTY =
  "0x7e782210405E90CE9A3C1c7cAFa380C28d35C78c";
