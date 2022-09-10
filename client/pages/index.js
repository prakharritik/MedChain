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
      {/* <div class="container mx-auto my-5 px-5">
        <div class="grid px-5 m-5 overflow-hidden grid-cols-2 grid-rows-2 gap-6 grid-flow-row">
          <div className="text-gray-600 body-font col-span-2 shadow-lg bg-[#8C95D0] ">
            <div className="container px-5  mx-auto flex flex-wrap items-center">
              <div className="m-5 lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                <img src={patientImg.src} className="h-32 mx-auto" />
                <h1 className="title-font font-medium text-3xl text-gray-900">
                  Doctor's Login
                </h1>
                <p className="leading-relaxed mt-4">
                  Login to your account by connecting your wallet, if your
                  profile has been verified.
                </p>
              </div>
              <div className="m-5 lg:w-2/6 md:w-1/2 bg-gray-900 rounded-lg p-8  flex flex-col md:ml-auto w-full shadow-2lg shadow-indigo-500/40">
                <h2 className="text-gray-100 text-lg font-medium title-font mb-5">
                  Sign Up
                </h2>

                <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Button
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  Literally you probably haven't heard of them jean shorts.
                </p>
              </div>
            </div>
          </div>

          <div class="flex justify-center">
            <div class="block rounded-lg shadow-lg border-solid border-8 border-indigo-600 max-w-sm text-center">
              <div class="py-3 px-6 border-b border-gray-300">
                <img src={doctorImg.src} className="h-32 mx-auto" />
              </div>
              <div class="p-6">
                <h5 class="text-gray-900 text-xl font-medium mb-2">
                  Insurance Organisation Login
                </h5>
                <p class="text-gray-700 text-base mb-4">
                  Login to your account by connecting your wallet, if your
                  profile has been verified.
                </p>
                <button
                  type="button"
                  class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Button
                </button>
              </div>
              <div class="py-3 px-6 border-t border-gray-300 text-gray-600">
                2 days ago
              </div>
            </div>
          </div>
          <div class="flex justify-center">
            <div class="block rounded-lg shadow-lg bg-white border-solid border-8 border-indigo-600 max-w-sm text-center">
              <div class="py-3 px-6 border-b border-gray-300">
                <img src={insurImg.src} className="h-32 mx-auto" />
              </div>
              <div class="p-6">
                <h5 class="text-gray-900 text-xl font-medium mb-2">
                  Special title treatment
                </h5>
                <p class="text-gray-700 text-base mb-4">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <button
                  type="button"
                  class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Button
                </button>
              </div>
              <div class="py-3 px-6 border-t border-gray-300 text-gray-600">
                2 days ago
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src="https://dummyimage.com/720x400"
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    The Catalyzer
                  </h1>
                  <p className="leading-relaxed mb-3">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                  <div className="flex items-center flex-wrap ">
                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </a>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx={12} cy={12} r={3} />
                      </svg>
                      1.2K
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                      6
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src="https://dummyimage.com/721x401"
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    The 400 Blows
                  </h1>
                  <p className="leading-relaxed mb-3">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                  <div className="flex items-center flex-wrap">
                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </a>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx={12} cy={12} r={3} />
                      </svg>
                      1.2K
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                      6
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src="https://dummyimage.com/722x402"
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    Shooting Stars
                  </h1>
                  <p className="leading-relaxed mb-3">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                  <div className="flex items-center flex-wrap ">
                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </a>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx={12} cy={12} r={3} />
                      </svg>
                      1.2K
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                      6
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}{" "}
    </Layout>
  );
};

export default index;
