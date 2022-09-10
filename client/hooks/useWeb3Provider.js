import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import Web3 from "web3";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.NEXT_PUBLIC_RINKBYID,
      chainId: 4,
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "MedChain",
      infuraId: process.env.NEXT_PUBLIC_RINKBYID,
      chainId: 4,
    },
  },
};

const useWeb3Provider = async () => {
  let web3 = null;

  try {
    let web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions,
    });

    const web3ModalInstance = await web3Modal.connect();
    //   const web3 = new ethers.providers.Web3Provider(web3ModalInstance);
    web3 = new Web3(web3ModalInstance);

    return [web3];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default useWeb3Provider;
