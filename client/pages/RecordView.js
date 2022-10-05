import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import ProtectedLayout from "../components/ProtectedLayout";
import { web3Context } from "../context/web3providerContext";
import useContract from "../hooks/useContract";
import useContractInsurance from "../hooks/useContractInsurance";

const RecordView = (props) => {
  const { web3Provider } = useContext(web3Context);
  const router = useRouter();
  const { address: account, id } = router.query;

  const [profile, setProfile] = useState(null);
  const [record, setRecord] = useState(null);
  const [recordData, setRecordData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInsurance, setShowInsurance] = useState(false);

  const applyClaim = async () => {
    setLoading(true);
    console.log(record["amount"]);
    try {
      const instance = useContractInsurance(web3Provider, profile["insurance"]);
      const [acc] = await web3Provider.eth.getAccounts();
      await instance.methods.addClaim(id, record["amount"]).send({ from: acc });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    const conn = async () => {
      const instance = useContract(web3Provider);
      const [acc] = await web3Provider.eth.getAccounts();

      if (acc === account) setShowInsurance(true);
      const res = await instance.methods.getPatient(account).call();
      console.log(res);
      const record = await instance.methods.getRecord(account, id).call();
      setRecord(record);
      console.log(record);

      if (res["name"] == "") router.push("/");
      else {
        setProfile({
          city: res["city"],
          dob: res["dob"],
          gender: res["gender"],
          insurance: res["insurance"],
          email: res["email"],
          name: res["name"],
          phno: res["phno"],
        });
      }

      const resd = await fetch(`https://ipfs.io/ipfs/${record.hashURL}`);
      const recordData = await resd.json();
      console.log(recordData);
      setRecordData(recordData);
    };
    conn();

    setLoading(false);
  }, [web3Provider]);

  return (
    <ProtectedLayout>
      {loading || !profile || !recordData ? (
        <Loading />
      ) : (
        <div className="container m-5 p-5">
          <div className="columns-2">
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {profile.name}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {profile.email}
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
              <dt className="text-sm font-medium text-gray-500">Gender</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {profile.gender}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">DOB</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {profile.dob}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">City</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {profile.city}
              </dd>
            </div>
          </div>
          {showInsurance ? (
            <section class="text-gray-600 body-font">
              <div class="container px-5 py-10 mx-auto">
                <div class="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
                  <h1 class="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
                    Apply for insurance claim for this record.
                  </h1>
                  <button
                    onClick={applyClaim}
                    class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </section>
          ) : null}
          <section class="text-gray-600 body-font">
            <div class="container px-5 py-12 mx-auto">
              <div class="text-center mb-10">
                <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                  Symptoms
                </h1>
              </div>
              <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                {recordData.symptoms.map((symptom) => (
                  <div class="p-2 sm:w-1/3 w-full">
                    <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                      <span class="title-font font-medium">{symptom.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <div class="text-center mb-10">
              <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                Meds
              </h1>
            </div>
            <table class="w-5/6 mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Medicine name
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Dosage
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Days
                  </th>
                </tr>
              </thead>
              <tbody>
                {recordData.medicines.map((medicine) => (
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {medicine.Medicine}
                    </th>
                    <td class="py-4 px-6"> {medicine.Dosage}</td>
                    <td class="py-4 px-6"> {medicine.Days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div class="text-center m-10">
              <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                Tests
              </h1>
            </div>
            <table class="w-5/6 mx-auto  text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Test name
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Comment
                  </th>
                </tr>
              </thead>
              <tbody>
                {recordData.tests.map((test) => (
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {test.Name}
                    </th>
                    <td class="py-4 px-6"> {test.Comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="w-full sm:p-4 px-4 mb-6 text-center">
            <h1 class="title-font font-medium text-xl mb-2 text-gray-900">
              Conclusion
            </h1>
            <div class="leading-relaxed">{record.conclusion}</div>
          </div>
        </div>
      )}
    </ProtectedLayout>
  );
};

export default RecordView;
