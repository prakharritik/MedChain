import React, { useContext, useEffect, useState } from "react";
import AddProfileAccess from "../components/AddProfileAccess";
import Loading from "../components/Loading";
import ProtectedLayout from "../components/ProtectedLayout";
import { web3Context } from "../context/web3providerContext";
import useContract from "../hooks/useContract";
import { useRouter } from "next/router";

import useContractInsurance from "../hooks/useContractInsurance";
import useContractInsFactory from "../hooks/useContractInsFactory";

const viewPolicies = () => {
  const [loading, setLoading] = useState(false);
  const [pdetails, setPdetails] = useState("");
  const [pamount, setPamount] = useState(100);
  const [pduration, setPduration] = useState(6);
  const { web3Provider } = useContext(web3Context);
  const [policies, setPolicies] = useState([]);
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  const fetchPolicies = async () => {
    try {
      const [account] = await web3Provider.eth.getAccounts();

      const insurance_instance = useContractInsurance(
        web3Provider,
        router.query.insurance
      );
      console.log(insurance_instance);
      const policies = await insurance_instance.methods.getPolicies().call();
      setPolicies(policies);
      console.log(policies);
    } catch (err) {
      console.log(err);
    }
  };

  const sendRequest = async (policyId) => {
    try {
      const [account] = await web3Provider.eth.getAccounts();
      console.log(account);
      const instance = useContractInsurance(
        web3Provider,
        router.query.insurance
      );
      const res = await instance.methods
        .addRequest(policyId)
        .send({ from: account });
      router.push("/manageInsurance");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetchPolicies();
    setLoading(false);
  }, []);

  return (
    <ProtectedLayout>
      {loading ? (
        <Loading />
      ) : (
        <section class="text-gray-600 body-font">
          {policies.map((policy) => {
            console.log(policy["policyNo"]);
            return (
              <div
                class="container px-5 py-10 mx-auto"
                key={policy["policyNo"]}
              >
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
                  <div>
                    <a href={policy["policyDetails"]} target="_blank">
                      <button class="flex-shrink-0 text-white bg-indigo-500 border-0 mr-4 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0">
                        View Details
                      </button>
                    </a>

                    <button
                      onClick={() => sendRequest(policy["policyNo"])}
                      class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
                    >
                      Send Opt-In Request
                    </button>
                  </div>
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

export default viewPolicies;
