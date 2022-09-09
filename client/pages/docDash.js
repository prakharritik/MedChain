import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import ProtectedLayout from "../components/ProtectedLayout";
import { web3Context } from "../context/web3providerContext";
import useContract from "../hooks/useContract";

const docDash = () => {
  const { web3Provider } = useContext(web3Context);
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [records, setRecords] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const conn = async () => {
      const [account] = await web3Provider.eth.getAccounts();

      const instance = useContract(web3Provider);
      const res = await instance.methods.getDoctor(account).call();

      setRecords(records);
      console.log(records);
      if (res["name"] == "") router.push("/docLogin");
      else {
        setProfile({
          hospital: res["hospital"],
          speciality: res["speciality"],
          qualification: res["qualification"],
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
        "Doc"
      ) : (
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-xl font-medium title-font mb-4 text-gray-900">
            Profile Not Verifed
          </h1>
        </div>
      )}
    </ProtectedLayout>
  );
};

export default docDash;
