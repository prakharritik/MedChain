import "../style.css";
import { web3Context } from "../context/web3providerContext";
import { useState } from "react";

export default function MyApp({ Component, pageProps }) {
  const [web3Provider, setWeb3Provider] = useState(null);
  return (
    <web3Context.Provider value={{ web3Provider, setWeb3Provider }}>
      <Component {...pageProps} />
    </web3Context.Provider>
  );
}
