import { useRouter, Router } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { web3Context } from "../context/web3providerContext";
import useContractInsurance from "../hooks/useContractInsurance";
import Loading from "./Loading";

const InsuranceCard = ({ insuranceAddress, web3Provider }) => {
  const [insuranceDetails, setInsuranceDetails] = useState(null);
  const [policyDetails, setPolicyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        const [account] = await web3Provider.eth.getAccounts();

        const instance = useContractInsurance(web3Provider, insuranceAddress);
        const res = await instance.methods.getCustomerStatus(account).call();
        console.log(res);
        setInsuranceDetails(res[0]);
        setPolicyDetails(res[1]);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
    setLoading(false);
  }, []);

  const payPremium = async () => {
    try {
      const [account] = await web3Provider.eth.getAccounts();

      const instance = useContractInsurance(web3Provider, insuranceAddress);
      const res = await instance.methods.payPremium().send({
        from: account,
        value: 1000000000000,
      });
      console.log(res);
      router.push("/manageInsurance");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" p-5">
      {loading || insuranceDetails === null ? (
        <Loading />
      ) : (
        <>
          <div className="container mx-auto px-20">
            <div className="flex flex-col w-full" style={{ cursor: "auto" }}>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
                <div
                  className="metric-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full"
                  style={{ cursor: "auto" }}
                >
                  <a
                    aria-label="Unsplash Downloads"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://stackdiary.com/"
                  >
                    <div
                      className="flex items-center text-gray-900 dark:text-gray-100"
                      style={{ cursor: "auto" }}
                    >
                      Insurance Address
                    </div>
                  </a>
                  <p
                    className="mt-2 text-xl font-bold spacing-sm text-black dark:text-white"
                    style={{ cursor: "auto" }}
                  >
                    {insuranceAddress}
                  </p>
                </div>
                <div
                  className="metric-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full"
                  style={{ cursor: "auto" }}
                >
                  <a
                    aria-label="Unsplash Views"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://stackdiary.com/"
                  >
                    <div
                      className="flex items-center text-gray-900 dark:text-gray-100"
                      style={{ cursor: "auto" }}
                    >
                      Policy Number
                      <a href={policyDetails["policyDetails"]} target="_blank">
                        <svg
                          className="h-4 w-4 ml-1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </a>
                  <p
                    className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white"
                    style={{ cursor: "auto" }}
                  >
                    {policyDetails["policyNo"]}
                  </p>
                </div>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
                <div
                  className="metric-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full"
                  style={{ cursor: "auto" }}
                >
                  <a
                    aria-label="YouTube Subscribers"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://stackdiary.com/"
                  >
                    <div
                      className="flex items-center text-gray-900 dark:text-gray-100"
                      style={{ cursor: "auto" }}
                    >
                      DueDate
                    </div>
                  </a>
                  <p
                    className="mt-2 text-xl font-bold spacing-sm text-black dark:text-white"
                    style={{ cursor: "auto" }}
                  >
                    {new Date(parseInt(insuranceDetails["dueDate"])).toString()}
                  </p>
                </div>
                <div
                  className="metric-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full"
                  style={{ cursor: "auto" }}
                >
                  <p className=" text-gray-900 dark:text-gray-100">
                    Premium Amount
                  </p>
                  <div className="flex justify-between">
                    <p
                      className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white"
                      style={{ cursor: "auto" }}
                    >
                      {policyDetails["premiumAmount"]}
                    </p>
                    <button
                      onClick={payPremium}
                      class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    >
                      Pay Premium
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InsuranceCard;
