import React, { useContext, useEffect, useState } from "react";
import AddProfileAccess from "../components/AddProfileAccess";
import Loading from "../components/Loading";
import ProtectedLayout from "../components/ProtectedLayout";
import { web3Context } from "../context/web3providerContext";
import useContract from "../hooks/useContract";
import { useRouter } from "next/router";

import useContractInsurance from "../hooks/useContractInsurance";
import useContractInsFactory from "../hooks/useContractInsFactory";

const policies = () => {
  const [loading, setLoading] = useState(false);
  const [pdetails, setPdetails] = useState("");
  const [pamount, setPamount] = useState(100);
  const [pduration, setPduration] = useState(6);
  const { web3Provider } = useContext(web3Context);
  const [policies, setPolicies] = useState([]);
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
      const policies = await insurance_instance.methods.getPolicies().call();
      setPolicies(policies);
      console.log(policies);
    } catch (err) {
      console.log(err);
    }
  };

  const addPolicy = async () => {
    try {
      const [account] = await web3Provider.eth.getAccounts();
      console.log(account);
      const instance = useContractInsurance(web3Provider, profile.insurance);
      const res = await instance.methods
        .addPolicy(pdetails, pduration, pamount)
        .send({ from: account });
      //  Router.reload(window.location.pathname);
    } catch (err) {}
  };

  useEffect(() => {
    setLoading(true);

    fetchAccessList();
    setLoading(false);
  }, []);

  return (
    <ProtectedLayout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Add policy
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Store the policy brochure at a sharable place and add the link
              here.
            </p>
          </div>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div className="relative flex-grow w-full">
              <label
                htmlFor="pdetails"
                className="leading-7 text-sm text-gray-600"
              >
                Link of policy details
              </label>
              <input
                type="text"
                id="pdetails"
                name="pdetails"
                value={pdetails}
                onChange={(e) => setPdetails(e.target.value)}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative flex-grow w-full">
              <label
                htmlFor="amount"
                className="leading-7 text-sm text-gray-600"
              >
                Premium amount(in wei)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={pamount}
                onChange={(e) => setPamount(e.target.value)}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative flex-grow w-full">
              <label
                htmlFor="duration"
                className="leading-7 text-sm text-gray-600"
              >
                Premium Period (in months)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={pduration}
                onChange={(e) => setPduration(e.target.value)}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              onClick={addPolicy}
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Add
            </button>
          </div>
        </div>
      </section>

      {loading ? (
        <Loading />
      ) : (
        <section class="text-gray-600 body-font">
          {policies.map((policy) => {
            console.log(policy["id"]);
            return (
              <div class="container px-5 py-10 mx-auto" key={policy["id"]}>
                <div class="lg:w-2/3 flex flex-col justify-between sm:flex-row sm:items-center items-start mx-auto">
                  <div>
                    <h1 class="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
                      Policy No. {policy["policyNo"]}
                    </h1>
                    <p className="font-small">
                      {policy["premiumAmount"]} wei per {policy["interval"]}{" "}
                      months
                    </p>
                    <p className="font-small"></p>
                  </div>
                  <a href={policy["policyDetails"]} target="_blank">
                    <button class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0">
                      View Details
                    </button>
                  </a>
                </div>
              </div>
            );
          })}
          {policies.length === 0 ? (
            <h1 class="py-24 text-center flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
              No policies.
            </h1>
          ) : null}
        </section>
      )}
    </ProtectedLayout>
  );
};

export default policies;
