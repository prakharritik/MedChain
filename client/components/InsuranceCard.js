import React, { useContext, useEffect, useState } from "react";
import { web3Context } from "../context/web3providerContext";
import useContractInsurance from "../hooks/useContractInsurance";
import Loading from "./Loading";

const InsuranceCard = ({ insuranceAddress, web3Provider }) => {
  const [insuranceDetails, setInsuranceDetails] = useState(null);
  const [policyDetails, setPolicyDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        const [account] = await web3Provider.eth.getAccounts();

        const instance = useContractInsurance(web3Provider, insuranceAddress);
        const res = await instance.methods.getCustomerStatus(account).call();
        console.log(res);
        setInsuranceDetails(res[0]);
        setPolicyDetails(res[1]);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
    setLoading(false);
  }, []);

  return (
    <div className=" p-5">
      {loading || insuranceDetails === null ? (
        <Loading />
      ) : (
        <>
          <dl class="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div class=" ">
              <dt class="font-medium text-gray-900">Insurance Address</dt>
              <dd class="mt-2 text-sm text-gray-500">{insuranceAddress}</dd>
            </div>

            <div class=" ">
              <dt class="font-medium text-gray-900">Policy Number</dt>
              <dd class="mt-2 text-sm text-gray-500">
                {policyDetails["policyNo"]}
              </dd>
            </div>

            <div class=" ">
              <dt class="font-medium text-gray-900">DueDate</dt>
              <dd class="mt-2 text-sm text-gray-500">
                {new Date(parseInt(insuranceDetails["dueDate"])).toString()}
              </dd>
            </div>

            <div class=" ">
              <dt class="font-medium text-gray-900">Premium Amount</dt>
              <dd class="mt-2 text-sm text-gray-500">
                {policyDetails["premiumAmount"]}
              </dd>
            </div>
          </dl>
        </>
      )}
    </div>
  );
};

export default InsuranceCard;
