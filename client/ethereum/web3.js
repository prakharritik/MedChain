import Web3 from "web3";

let web3;

const provider = new Web3.providers.HttpProvider(
  process.env.NEXT_PUBLIC_rinkby
);

web3 = new Web3(provider);

export default web3;
