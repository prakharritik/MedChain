import React, { useContext, useEffect, useState } from "react";
import AddProfileAccess from "../components/AddProfileAccess";
import Loading from "../components/Loading";
import ProtectedLayout from "../components/ProtectedLayout";
import { web3Context } from "../context/web3providerContext";
import useContract from "../hooks/useContract";
import Router from "next/router";

const profileAccess = () => {
  const [loading, setLoading] = useState(false);
  const { web3Provider } = useContext(web3Context);
  const [accessList, setAccessList] = useState([]);
  console.log(web3Provider);
  const fetchAccessList = async () => {
    try {
      const [account] = await web3Provider.eth.getAccounts();
      console.log(account);
      const instance = useContract(web3Provider);
      const res = await instance.methods.getAccessList(account).call();
      let list = [];
      for (let index = 0; index < res[0].length; index++) {
        list.push({ account: res[0][index], name: res[1][index], index });
      }
      console.log(list);
      setAccessList(list);
    } catch (err) {}
  };

  const revokeAccess = async (address) => {
    try {
      const [account] = await web3Provider.eth.getAccounts();
      console.log(account);
      const instance = useContract(web3Provider);
      const res = await instance.methods
        .revokeAccess(address)
        .send({ from: account });
      Router.reload(window.location.pathname);
    } catch (err) {}
  };

  useEffect(() => {
    setLoading(true);

    fetchAccessList();
    setLoading(false);
  }, [web3Provider]);

  return (
    <ProtectedLayout>
      <AddProfileAccess />
      {loading ? (
        <Loading />
      ) : (
        <section class="text-gray-600 body-font">
          {accessList.map(({ account, name, index }) => (
            <div class="container px-5 py-10 mx-auto" key={account}>
              <div class="lg:w-2/3 flex flex-col justify-between sm:flex-row sm:items-center items-start mx-auto">
                <div>
                  <h1 class="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
                    {name}
                  </h1>
                  <p className="font-small">{account}</p>
                </div>

                <button
                  onClick={() => revokeAccess(account)}
                  class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {accessList.length === 0 ? (
            <h1 class="py-24 text-center flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
              No one has access.
            </h1>
          ) : null}
        </section>
      )}
    </ProtectedLayout>
  );
};

export default profileAccess;
