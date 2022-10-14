import vcgNFTJson from "./artifacts/vcgNFTJson.json";
import vcgMpJson from "./artifacts/vcgMpJson.json";
import marketplace from './artifacts/marketplace.json'
import vcgEnableTokenJson from "./artifacts/vcgEnableTokenJson.json";
import vcgSubscibeJson from "./artifacts/vcgSubscribe.json";
import { testnetTokenAddress ,tokenAddress } from "./globalConstant";

// helper object to access contracts periphery
export const vcgNFT = {
  abi: vcgNFTJson.abi,
  address: tokenAddress.LAND_ADDRESS,
  defaultApproved:"0x0000000000000000000000000000000000000000"
};

export const vcgMpLand = {
  abi: marketplace,
  address: tokenAddress.LAND_MARKETPLACE_ADDRESS,
};

export const vcgEnableToken={
  abi: vcgEnableTokenJson.abi,
  address: tokenAddress.TOKEN_CURRENCY,
}

export const vcgSubscibe={
  abi: vcgSubscibeJson.abi,
  address: testnetTokenAddress.SIGNAL_SUBSCRIBE
}

export const vcgNFTtestnet = {
  abi: vcgNFTJson.abi,
  address: testnetTokenAddress.LAND_ADDRESS,
  defaultApproved:"0x0000000000000000000000000000000000000000"
};

export const vcgMpTestnet = {
  abi: vcgMpJson.abi,
  address: testnetTokenAddress.LAND_MARKETPLACE_ADDRESS,
};

export const vcgEnableTokenTestnet={
  abi: vcgEnableTokenJson.abi,
  address: testnetTokenAddress.TOKEN_CURRENCY,
}

export const vcgNftStat={
  sell:0,
  buy :1,
  other:2
}
