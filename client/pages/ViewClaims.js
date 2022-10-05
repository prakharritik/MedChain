import React, { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import ProtectedLayout from "../components/ProtectedLayout";
import { web3Context } from "../context/web3providerContext";

import { useRouter } from "next/router";

import useContractInsurance from "../hooks/useContractInsurance";
import useContractInsFactory from "../hooks/useContractInsFactory";
import Link from "next/link";

const ViewClaims = () => {
  const [loading, setLoading] = useState(false);

  const { web3Provider } = useContext(web3Context);
  const [claims, setClaims] = useState([]);
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  const fetchAccessList = async () => {
    try {
      const [account] = await web3Provider.eth.getAccounts();

      const instance = useContractInsFactory(web3Provider);
      const res = await instance.methods.insuranceMap(account).call();
      console.log(res);
      if (res["name"] == "") router.push("/insuranceLogin");
      else {
        setProfile({
          insurance: res["insurance"],
          verified: res["verified"],
          email: res["email"],
          name: res["name"],
          phno: res["phno"],
        });
      }
      const insurance_instance = useContractInsurance(
        web3Provider,
        res["insurance"]
      );
      console.log(insurance_instance);
      const claims = await insurance_instance.methods.viewClaim().call();
      setClaims(claims);
      console.log(claims);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetchAccessList();
    setLoading(false);
  }, [web3Provider]);

  return (
    <ProtectedLayout>
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="-my-8 divide-y-2 divide-gray-100">
            {claims.map((claim, index) => (
              <div key={index} class="py-8 flex flex-wrap md:flex-nowrap">
                <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span class="font-semibold title-font text-gray-700">
                    Application Date
                  </span>
                  <span class="mt-1 text-gray-500 text-sm">
                    {new Date(parseInt(claim["datetime"])).toString()}
                  </span>
                </div>
                <div class="md:flex-grow">
                  <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
                    {claim["customer"]}
                  </h2>
                  <p class="leading-relaxed">
                    <b>Record ID :</b> {claim["RecordId"]} <b>Amount: </b>{" "}
                    {claim["amount"]}
                  </p>
                  <Link href={`ViewClaim?claimID=${index}`}>
                    <a class="text-indigo-500 inline-flex items-center mt-4">
                      View Application
                      <svg
                        class="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ProtectedLayout>
  );
};

export default ViewClaims;
