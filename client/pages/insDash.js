import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import ProtectedLayout from "../components/ProtectedLayout";
import { web3Context } from "../context/web3providerContext";
import useContractInsFactory from "../hooks/useContractInsFactory";

const insDash = () => {
  const { web3Provider } = useContext(web3Context);
  const router = useRouter();

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const conn = async () => {
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
    };
    conn();

    setLoading(false);
  }, []);
  return (
    <ProtectedLayout>
      {loading || !profile ? (
        <Loading />
      ) : profile.verified ? (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Profile Information
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {profile.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {profile.phno}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {profile.email}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Contract Addess
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {profile.insurance}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ) : (
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-xl font-medium title-font mb-4 text-gray-900">
            Profile Not Verified
          </h1>
        </div>
      )}
    </ProtectedLayout>
  );
};

export default insDash;
