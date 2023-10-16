import { ethers } from "ethers";

export const connectWallet = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
  } catch (err) {
    console.log('error->',err);
  }
};

export const getSigner = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer;
  } catch (err) {
    console.log('error->',err);
  }
};

export const readContract = async (rpc, contractAddress, contractABI) => {
  try {
    const defaultProvider = new ethers.providers.JsonRpcProvider(rpc);
    const contract = new ethers.Contract(contractAddress, contractABI, defaultProvider);
    return contract;
  } catch (err) {
    console.log('error->',err);
  }
};

export const writeContract = async (contractAddress, contractABI) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
    return nftContract;
  } catch (err) {
    console.log('error->',err);
  }
};

export const sign = async (message) => {
  try {
    console.log(window.ethereum);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signing = await signer.signMessage(message);
    return signing;
  } catch (err) {
    console.log('error->',err);
    return {error : err};
  }
};