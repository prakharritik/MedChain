import React, { useContext, useEffect, useState } from "react";
import AddProfileAccess from "../components/AddProfileAccess";
import Loading from "../components/Loading";
import ProtectedLayout from "../components/ProtectedLayout";
import { web3Context } from "../context/web3providerContext";
import useContract from "../hooks/useContract";
import Router from "next/router";
import useContractInsFactory from "../hooks/useContractInsFactory";
import useContractInsurance from "../hooks/useContractInsurance";

const ViewCustomerRequests = () => {
  const [loading, setLoading] = useState(false);
  const { web3Provider } = useContext(web3Context);
  const [docList, setDocList] = useState([]);
  const [pathList, setPathList] = useState([]);
  const [insList, setInsList] = useState([]);
  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState([]);

  const assignPolicy = async (index) => {
    setLoading(true);
    const instance = useContractInsurance(web3Provider, profile["insurance"]);
    const [account] = await web3Provider.eth.getAccounts();
    console.log(account);
    const res = await instance.methods.assignPolicy(index).send({
      from: account,
    });
    console.log(res);
    setLoading(false);
  };

  const fetchList = async () => {
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
      const requests = await insurance_instance.methods.getRequests().call();
      setRequests(requests);
      console.log(requests);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetchList();

    setLoading(false);
  }, []);

  return (
    <ProtectedLayout>
      {loading ? (
        <Loading />
      ) : (
        <section class="text-gray-600 body-font">
          <h1 class="sm:text-3xl text-2xl text-center font-medium title-font mb-4 text-gray-900">
            Customer Requests
          </h1>
          {requests.map(({ customerAddress, policyNo }, index) => (
            <div class="container px-5 py-10 mx-auto">
              <div class="lg:w-2/3 flex flex-col justify-between sm:flex-row sm:items-center items-start mx-auto">
                <div>
                  <h1 class="flex-grow sm:pr-16 text-xl font-medium title-font text-gray-900">
                    {customerAddress}
                  </h1>
                  <p className="font-small">{policyNo}</p>
                </div>

                <button
                  onClick={() => assignPolicy(index)}
                  class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
                >
                  Assign
                </button>
              </div>
            </div>
          ))}
          {requests.length === 0 ? (
            <h1 class="py-24 text-center flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
              No Requests.
            </h1>
          ) : null}
        </section>
      )}
    </ProtectedLayout>
  );
};

export default ViewCustomerRequests;
