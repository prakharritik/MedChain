import "../style.css";
import { web3Context } from "../context/web3providerContext";
import { useEffect, useState } from "react";
import useWeb3Provider from "../hooks/useWeb3Provider";
import Loading from "../components/Loading";

export default function MyApp({ Component, pageProps }) {
  const [web3Provider, setWeb3Provider] = useState(null);
  const [loadingWeb3, setLoadingWeb3] = useState(false);
  const [role, setRole] = useState(0);
  const getWeb3 = async () => {
    const [web3] = await useWeb3Provider();
    setWeb3Provider(web3);
  };

  useEffect(() => {
    if (localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")) {
      setLoadingWeb3(true);
      getWeb3();
      setLoadingWeb3(false);
    }
    if (localStorage.getItem("role"))
      setRole(parseInt(localStorage.getItem("role")));
  }, []);

  return loadingWeb3 ? (
    <Loading />
  ) : (
    <web3Context.Provider
      value={{ web3Provider, setWeb3Provider, role, setRole }}
    >
      <Component {...pageProps} />
    </web3Context.Provider>
  );
}
