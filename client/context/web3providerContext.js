import { createContext } from "react";

export const web3Context = createContext({
  web3Provider: null,
  role: 0,
  setWeb3Provider: () => null,
  setRole: () => null,
});
