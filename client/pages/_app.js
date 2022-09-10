import "../style.css";
import { web3Context } from "../context/web3providerContext";
import { useState } from "react";

export default function MyApp({ Component, pageProps }) {
  const [web3Provider, setWeb3Provider] = useState(null);
  const [role, setRole] = useState(0);
  return (
    <web3Context.Provider
      value={{ web3Provider, setWeb3Provider, role, setRole }}
    >
      <Component {...pageProps} />
    </web3Context.Provider>
  );
}
