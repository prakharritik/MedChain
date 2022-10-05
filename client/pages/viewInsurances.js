import React, { useContext, useEffect, useState } from "react";
import AddProfileAccess from "../components/AddProfileAccess";
import Loading from "../components/Loading";
import ProtectedLayout from "../components/ProtectedLayout";
import { web3Context } from "../context/web3providerContext";
import useContract from "../hooks/useContract";
import { useRouter } from "next/router";
import useContractInsFactory from "../hooks/useContractInsFactory";

const accessList = () => {
  const [loading, setLoading] = useState(false);
  const { web3Provider } = useContext(web3Context);
  const [insurances, setInsurances] = useState([]);
  const router = useRouter();

  const fetchInsurances = async () => {
    try {
      const instance = useContractInsFactory(web3Provider);
      const res = await instance.methods.getDeployedInsurances().call();

      console.log(res);
      setInsurances(res);
    } catch (err) {}
  };

  useEffect(() => {
    setLoading(true);

    fetchInsurances();
    setLoading(false);
  }, [web3Provider]);

  return (
    <ProtectedLayout>
      {loading ? (
        <Loading />
      ) : (
        <section class="text-gray-600 body-font">
          {insurances.map(({ insurance, name, index }) => (
            <div class="container px-5 py-10 mx-auto">
              <div class="lg:w-2/3 flex flex-col justify-between sm:flex-row sm:items-center items-start mx-auto">
                <div>
                  <h1 class="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
                    {name}
                  </h1>
                  <p className="font-small">{insurance}</p>
                </div>

                <button
                  onClick={() =>
                    router.push(`/viewPolicies?insurance=${insurance}`)
                  }
                  class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
                >
                  View Policies
                </button>
              </div>
            </div>
          ))}
          {insurances.length === 0 ? (
            <h1 class="py-24 text-center flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
              No insurances.
            </h1>
          ) : null}
        </section>
      )}
    </ProtectedLayout>
  );
};

export default accessList;
