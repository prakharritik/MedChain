import React, { useContext, useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import Header from "../components/Header";
import patientImg from "../assets/face-mask-man-icon.svg";
import doctorImg from "../assets/doctor-stethoscope-svgrepo-com.svg";
import insurImg from "../assets/health-insurance.svg";
import pathologyImg from "../assets/pathology-cropped.svg";
import Layout from "../components/Layout";

import { useRouter } from "next/router";
import useWeb3Provider from "../hooks/useWeb3Provider";
import { web3Context } from "../context/web3providerContext";

const index = () => {
  const router = useRouter();
  const { web3Provider, setWeb3Provider, setRole } = useContext(web3Context);

  useEffect(() => {
    setRole(0);
  }, []);

  async function connectWallet(num) {
    const [web3] = await useWeb3Provider();

    if (web3) {
      setWeb3Provider(web3);
      setRole(num);
      if (num === 1) router.push("patientProfile");
      else if (num === 2) router.push("docDash");
      else if (num === 3) router.push("insDash");
      //  else if (num === 4)router.push()
    }
  }
  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="lg:w-2/3 mx-auto">
            <div className="flex flex-wrap w-full bg-gray-100 py-5 px-10 relative mb-4 border-solid border-8 border-indigo-600">
              <div className="container px-5 py-5 mx-auto flex flex-wrap items-center ">
                <div className="lg:w-2/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                  <img src={patientImg.src} className="h-32 mx-auto" />
                  <h2 className="text-gray-900 text-lg font-medium title-font mb-5 text-center">
                    Patient Login
                  </h2>
                </div>
                <div className="ml-auto lg:w-3/5 md:w-1/2 bg-gray-900 rounded-lg p-8  flex flex-col md:ml-auto w-full shadow-2lg shadow-indigo-500/40">
                  <h2 className="text-gray-100 text-lg font-medium title-font mb-5 text-center">
                    Connect your cryptowallet to get started
                  </h2>

                  <button
                    onClick={() => connectWallet(1)}
                    className="w-1/2 mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Connect
                  </button>
                  <p className="text-xs text-gray-500 mt-3">
                    There is no registeration required. Your profile will be
                    linked to your crypto-account.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="px-2 w-1/3">
                <div class="block rounded-lg shadow-lg border-solid border-8 border-indigo-600  text-center">
                  <div class="py-3 px-6 border-b border-gray-300">
                    <img src={doctorImg.src} className="h-32 mx-auto" />
                  </div>
                  <div class="p-6">
                    <h5 class="text-gray-900 text-xl font-medium mb-2">
                      Doctor's Login
                    </h5>
                    <p class="text-gray-700 text-base mb-4">
                      Login to your account by connecting your wallet, if your
                      profile has been verified.
                    </p>
                    <button
                      onClick={() => connectWallet(2)}
                      type="button"
                      class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>{" "}
              <div className="px-2 w-1/3">
                <div class="block rounded-lg shadow-lg border-solid border-8 border-indigo-600  text-center">
                  <div class="py-3 px-6 border-b border-gray-300">
                    <img src={pathologyImg.src} className="h-32 mx-auto" />
                  </div>
                  <div class="p-6">
                    <h5 class="text-gray-900 text-xl font-medium mb-2">
                      Pathology's Login
                    </h5>
                    <p class="text-gray-700 text-base mb-4">
                      Login to your account by connecting your wallet, if your
                      profile has been verified.
                    </p>
                    <button
                      onClick={() => connectWallet(2)}
                      type="button"
                      class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-2 w-1/3">
                <div class="block rounded-lg shadow-lg bg-white border-solid border-8 border-indigo-600  text-center">
                  <div class="py-3 px-6 border-b border-gray-300">
                    <img src={insurImg.src} className="h-32 mx-auto" />
                  </div>
                  <div class="p-6">
                    <h5 class="text-gray-900 text-xl font-medium mb-2">
                      Insurance Org Login
                    </h5>
                    <p class="text-gray-700 text-base mb-4">
                      Login to your account by connecting your wallet, if your
                      profile has been verified.
                    </p>
                    <button
                      onClick={() => connectWallet(3)}
                      type="button"
                      class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default index;
