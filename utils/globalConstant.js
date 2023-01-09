export const swap = {
  SAVEDTOKENS: "savedTokens",
  defaultTokenA: {
    name: "BNB Token",
    symbol: "BNB",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    chainId: 56,
    decimals: 18,
    logoURI:
      "https://tokens.pancakeswap.finance/images/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c.png",
  },
  defaultTokenB: {
    name: "VCG Token",
    symbol: "VCG",
    address: "0x1f36fb2d91d9951cf58ae4c1956c0b77e224f1e9",
    chainId: 56,
    decimals: 18,
    logoURI: "https://vcgamers.com/img/icon/vcg.gif",
  },
  transactionSpeed: {
    standard: "5000000000",
    fast: "6000000000",
    instant: "7000000000",
  },
  wBNBaddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
};

export const firebaseConfig = {
  apiKey: "AIzaSyBUQG4WvvuZymoDOfSK6u0DP3-TnyNYNFg",
  authDomain: "vcg-blockchain.firebaseapp.com",
  projectId: "vcg-blockchain",
  storageBucket: "vcg-blockchain.appspot.com",
  messagingSenderId: "439944187001",
  appId: "1:439944187001:web:dbd286025ad836dc9e18a8",
  measurementId: "G-HRGJDP789V",
};

//TODO : MAINNET
export const tokenAddress = {
  LAND_ADDRESS: "0xaF10C7233e84925898bCFF9139b0E942AF75c74E",
  LAND_MARKETPLACE_ADDRESS: "0x32f98cF8955D70Ef6AEFe49A58D792904004f651",
  TOKEN_CURRENCY: "0x1F36FB2D91d9951Cf58aE4c1956C0b77e224F1E9",
};

// 0xd4EdD685B25d6Fc6B00fed63F9aC6cBDDDDc7980
//TODO : TESTNET
export const testnetTokenAddress = {
  LAND_ADDRESS: "0xeb89E3EA534A727018b6a0BA5493050D877D8B87",
  LAND_MARKETPLACE_ADDRESS: "0x47F23A148394e10008d4108ed6a12BcCC0F32b48",
  TOKEN_CURRENCY: "0x33e9f1d1ad100CbBd7FF35BD3d8228A7ec52C224",
  SIGNAL_SUBSCRIBE: "0x843385BdeC67aE66474E18D63aCb62d44A657e77",
};

//TODO : FCM Scope
export const fcmScope = {
  register: "/firebase-messaging-sw.js",
  scope: "/firebase-cloud-messaging-push-scope",
};
// http://localhost:4300/mp
// https://api.vcgamers.io/mp
//TODO : API
export const API = {
  ransverse: "https://api.vcgamers.io/ransverse",
  marketplace: "https://api.vcgamers.io/mp",
  domain: "https://api.vcgamers.io/mp",
  local: "https://api.vcgamers.io/mp",
  land: {
    list: "/land/list",
    filter: "/land/filter",
    detail: "/land/detail",
    wave: "/land/update/wave",
    owner: "/land/owner",
    owned: "/land/owned",
  },
  bid: {
    leaderboard: "/bid/leaderboard",
    mybid: "/bid/mybid",
  },
  faq: {
    list: "/faq/list",
    add: "faq/add",
  },
  category: {
    list: "/category/list",
    add: "/category/add",
  },
  notif: "/settings/notification/",
  collections: {
    list: "/collections/list",
    add: "/collections/add",
    filter: "/collections/filter",
    popularArtist: "/collections/popularArtist",
    info: "/collections/",
    update: "/collections/update",
    fromLaunchpad: "/collections/fromLaunchpad"
  },
  artist: {
    list: "/artist/list",
    add: "/artist/add",
    update: "/artist/update",
    getAddress: "/artist/address/",
  },
  offer: {
    list: "/offers/list",
    filter: "/offers/",
  },
  vcmarket: {
    connect: "/vcmarket/connect",
    register: "/vcmarket/register",
    login: "/vcmarket/login",
    update: "/vcmarket/update",
  },
  metadata: {
    create: "/metadata/addNewItem",
    cancel: "/metadata/cancelNewItem",
    get: "/metadata/",
    fromLaunchpad: "/metadata/fromLaunchpad"
  },
  launchpad: {
    // https://api-launchpad.vcgamers.com/launchpad
    // https://api-launchpad.vcg.asia/launchpad
    // http://localhost:3700/launchpad
    domain: 'https://api-launchpad.vcg.asia/launchpad',
    local: "https://api-launchpad.vcg.asia/launchpad",
    info: {
      totalProject: "/info/totalProject",
      totalFunded: "/info/totalFunded",
    },
    nft: {
      detail: "/nft/info",
      filter: "/nft/filter",
      add: "/nft/add",
      update: "/nft/update",
      buy: "/nft/buy",
      finalize: "/nft/finalize",
    },
    ownedNft: {
      filter: "/ownedNft/filter",
      claim: "/ownedNft/claim",
    },
    project: {
      detail: "/project/info",
      filter: "/project/filter",
      add: "/project/add",
      update: "/project/update",
      approve: "/project/approve",
      start: "/project/start",
      finish: "/project/finish",
      buy: "/project/buy",
      finalizeBox: "/project/finalizeBox",
      finalizeProject: "/project/finalizeProject",
    },
    item: {
      filter: "/ownedItem/filter",
      filterClaim: "/ownedItem/filterClaim",
      add: "/ownedItem/add",
      buy: "/ownedItem/buy",
      claim: "/ownedItem/claim",
      claimed: "/ownedItem/claimed"
    },
    history: {
      detail: "/history/info",
      filter: "/history/filter",
      add: "/history/add"
    },
    faq: {
      list: "/faq/list",
      add: "/faq/add",
      delete: "/faq/"
    }
  }
};

export const domainMp = {
  dev :'https://nft.vcg.asia',
  stg :'https://nft.vcgamers.io',
  pro :'https://nft.vcgamers.com'
}
