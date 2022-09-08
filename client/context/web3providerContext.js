import { createContext } from "react";

export const web3Context = createContext({
  web3Provider: null,
  role: null,
  setWeb3Provider: () => null,
});
