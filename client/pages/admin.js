import React, { useContext, useEffect, useState } from "react";
import AddProfileAccess from "../components/AddProfileAccess";
import Loading from "../components/Loading";
import ProtectedLayout from "../components/ProtectedLayout";
import { web3Context } from "../context/web3providerContext";
import useContract from "../hooks/useContract";
import Router from "next/router";
import useContractInsFactory from "../hooks/useContractInsFactory";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const { web3Provider } = useContext(web3Context);
  const [docList, setDocList] = useState([]);
  const [pathList, setPathList] = useState([]);
  const [insList, setInsList] = useState([]);

  const verifyDoc = async (index) => {
    setLoading(true);
    const instance = useContract(web3Provider);
    const [account] = await web3Provider.eth.getAccounts();
    console.log(account);
    const res = await instance.methods.verifyDoctor(index).send({
      from: account,
    });
    console.log(res);
    setLoading(false);
  };

  const verifyIns = async (index) => {
    setLoading(true);
    const instance = useContractInsFactory(web3Provider);
    const [account] = await web3Provider.eth.getAccounts();
    console.log(account);
    const res = await instance.methods.verifyInsurance(index).send({
      from: account,
    });
    console.log(res);
    setLoading(false);
  };

  const fetchList = async () => {
    try {
      const [account] = await web3Provider.eth.getAccounts();
      console.log(account);
      const instance = useContract(web3Provider);
      const res = await instance.methods.getDoctorVerList().call();

      console.log(res);
      setDocList(res);
    } catch (err) {}
  };

  const fetchInsList = async () => {
    try {
      const [account] = await web3Provider.eth.getAccounts();
      console.log(account);
      const instance = useContractInsFactory(web3Provider);
      const res = await instance.methods.getRequests().call();

      console.log(res);
      setInsList(res);
    } catch (err) {}
  };

  useEffect(() => {
    setLoading(true);

    fetchList();
    fetchInsList();
    setLoading(false);
  }, [web3Provider]);

  return (
    <ProtectedLayout>
      {loading ? (
        <Loading />
      ) : (
        <>
          <section class="text-gray-600 body-font">
            <h1 class="sm:text-3xl text-2xl text-center font-medium title-font mb-4 text-gray-900">
              Doctor Verification
            </h1>
            {docList.map((docAddress, index) => (
              <div class="container px-5 py-10 mx-auto">
                <div class="lg:w-2/3 flex flex-col justify-between sm:flex-row sm:items-center items-start mx-auto">
                  <div>
                    <h1 class="flex-grow sm:pr-16 text-xl font-medium title-font text-gray-900">
                      {docAddress}
                    </h1>
                    {/* <p className="font-small">{account}</p> */}
                  </div>

                  <button
                    onClick={() => verifyDoc(index)}
                    class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
                  >
                    Verify
                  </button>
                </div>
              </div>
            ))}
            {docList.length === 0 ? (
              <h1 class="py-24 text-center flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
                No doctor need verification.
              </h1>
            ) : null}
          </section>
          <section class="text-gray-600 body-font">
            <h1 class="sm:text-3xl text-2xl text-center font-medium title-font mb-4 text-gray-900">
              Pathology Verification
            </h1>
            {pathList.map((pathAddress) => (
              <div class="container px-5 py-10 mx-auto">
                <div class="lg:w-2/3 flex flex-col justify-between sm:flex-row sm:items-center items-start mx-auto">
                  <div>
                    <h1 class="flex-grow sm:pr-16 text-xl font-medium title-font text-gray-900">
                      {pathAddress}
                    </h1>
                    {/* <p className="font-small">{account}</p> */}
                  </div>

                  <button class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0">
                    Verify
                  </button>
                </div>
              </div>
            ))}
            {pathList.length === 0 ? (
              <p class="py-24 text-center flex-grow text-2xl font-medium title-font text-gray-600">
                No Pathology need verification.
              </p>
            ) : null}
          </section>
          <section class="text-gray-600 body-font">
            <h1 class="sm:text-3xl text-2xl text-center font-medium title-font mb-4 text-gray-900">
              Insurance Verification
            </h1>
            {insList.map((insurance, index) => (
              <div class="container px-5 py-10 mx-auto">
                <div class="lg:w-2/3 flex flex-col justify-between sm:flex-row sm:items-center items-start mx-auto">
                  <div>
                    <h1 class="flex-grow sm:pr-16 text-xl font-medium title-font text-gray-900">
                      {insurance.name}
                    </h1>
                    <p className="font-small">
                      {insurance.email} {insurance.phno}
                    </p>
                  </div>

                  <button
                    onClick={() => verifyIns(index)}
                    class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
                  >
                    Verify
                  </button>
                </div>
              </div>
            ))}
            {insList.length === 0 ? (
              <p class="py-24 text-center flex-grow text-2xl font-medium title-font text-gray-600">
                No Insurance need verification.
              </p>
            ) : null}
          </section>
        </>
      )}
    </ProtectedLayout>
  );
};

export default Admin;
