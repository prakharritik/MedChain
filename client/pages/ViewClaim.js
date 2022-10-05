import React, { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import ProtectedLayout from "../components/ProtectedLayout";
import { web3Context } from "../context/web3providerContext";

import { useRouter } from "next/router";

import useContractInsurance from "../hooks/useContractInsurance";
import useContractInsFactory from "../hooks/useContractInsFactory";
import Link from "next/link";

const ViewClaim = () => {
  const [loading, setLoading] = useState(false);

  const { web3Provider } = useContext(web3Context);
  const [claim, setClaim] = useState([]);
  const [profile, setProfile] = useState(null);
  const router = useRouter();
  const { claimID } = router.query;

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
      setClaim(claims[claimID]);
      console.log(claim);
    } catch (err) {
      console.log(err);
    }
  };

  const claimAction = async (action) => {
    try {
      const [account] = await web3Provider.eth.getAccounts();
      const instance = useContractInsurance(web3Provider, profile["insurance"]);
      await instance.methods
        .claimAction(claimID, action)
        .send({ from: account });
      router.push("/ViewClaims");
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
          <div class="lg:w-3/4 mx-auto flex flex-wrap">
            <div class=" w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                {new Date(parseInt(claim["datetime"])).toString()}
              </h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">
                {claim["customer"]}
              </h1>

              <div class="flex border-t border-gray-200 py-2">
                <span class="text-gray-500">
                  <b>Record ID :</b> {claim["RecordId"]}{" "}
                </span>
                <Link
                  href={`RecordView?address=${claim["customer"]}&id=${claim["RecordId"]}`}
                >
                  <span class="ml-auto text-gray-900">Visit</span>
                </Link>
              </div>
              <div class="flex border-t border-gray-200 py-2">
                <span class="text-gray-500">Size</span>
                <span class="ml-auto text-gray-900">Medium</span>
              </div>
              <div class="flex border-t border-b mb-6 border-gray-200 py-2">
                <span class="text-gray-500">Quantity</span>
                <span class="ml-auto text-gray-900">4</span>
              </div>
              <div class="flex">
                <span class="title-font font-medium text-2xl text-gray-900">
                  {claim["amount"]} Wei
                </span>
                <div className="ml-auto flex space-x-4">
                  <button
                    onClick={() => claimAction(1)}
                    class="flex  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => claimAction(2)}
                    class="flex  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ProtectedLayout>
  );
};

export default ViewClaim;
