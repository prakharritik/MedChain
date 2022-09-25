import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import AddInsurance from "../components/AddInsurance";
import InsuranceCard from "../components/InsuranceCard";
import Loading from "../components/Loading";
import ProtectedLayout from "../components/ProtectedLayout";
import { web3Context } from "../context/web3providerContext";
import useContract from "../hooks/useContract";

const manageInsurance = () => {
  const { web3Provider } = useContext(web3Context);
  const router = useRouter();

  const [insurance, setInsurance] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const conn = async () => {
      try {
        const [account] = await web3Provider.eth.getAccounts();

        const instance = useContract(web3Provider);
        const res = await instance.methods.getPatient(account).call();
        console.log(res);
        if (res["name"] == "") router.push("/");
        else {
          console.log(res["insurance"]);
          setInsurance(res["insurance"]);
        }
      } catch (err) {}
    };
    conn();

    setLoading(false);
  }, []);
  return (
    <ProtectedLayout>
      {loading ? (
        <Loading />
      ) : (
        <>
          {insurance !== null ? (
            <InsuranceCard
              insuranceAddress={insurance}
              web3Provider={web3Provider}
            />
          ) : null}

          <AddInsurance />
          <Link href="viewInsurances">
            <button class="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">
              View Insurances
            </button>
          </Link>
        </>
      )}
    </ProtectedLayout>
  );
};

export default manageInsurance;
