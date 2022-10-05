import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { web3Context } from "../context/web3providerContext";
import Footer from "./Footer";
import Header from "./Header";
import Loading from "./Loading";

const ProtectedLayout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { web3Provider } = useContext(web3Context);
  console.log(web3Provider);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    if (
      !web3Provider &&
      !localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")
    ) {
      router.push("/");
    }
    setLoading(false);
  }, [web3Provider]);

  return (
    <>
      <Header />
      {loading ? <Loading /> : children}
      <Footer />
    </>
  );
};

export default ProtectedLayout;
