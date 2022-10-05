import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import ButtonLoading from "../components/ButtonLoading";
import * as IPFS from "ipfs-core";
import Loading from "../components/Loading";
import MedicalTest from "../components/MedicalTest";
import MedicineForm from "../components/MedicineForm";
import ProtectedLayout from "../components/ProtectedLayout";
import SymptomForm from "../components/SymptomsForm";
import { web3Context } from "../context/web3providerContext";
import useContract from "../hooks/useContract";

const addRecord = () => {
  const router = useRouter();
  const { web3Provider } = useContext(web3Context);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [tests, setTests] = useState([]);
  const [conclusion, setConclusion] = useState("");
  const [important, setImportant] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [amount, setAmount] = useState(8);
  const address = router.query.address;

  useEffect(() => {
    const conn = async () => {
      const instance = useContract(web3Provider);
      const res = await instance.methods.getPatient(address).call();
      console.log(res);
      if (res["name"] == "") router.push("/patientRegister");
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
    };
    conn();
  }, [web3Provider]);

  const getCid = async (record) => {
    const ipfs = await IPFS.create();
    const res = await ipfs.add(record);
    console.log(res.path);
    return res.path;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const record = {
      symptoms,
      medicines,
      tests,
      conclusion,
      important,
      patient: { address },
      amount,
    };
    try {
      let cid = await getCid(JSON.stringify(record));
      let patientAddress = address;
      const instance = useContract(web3Provider);
      const [account] = await web3Provider.eth.getAccounts();
      console.log(account);
      const res = await instance.methods
        .addRecord(patientAddress, cid, conclusion, important, amount)
        .send({
          from: account,
        });
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <ProtectedLayout>
      {!profile ? (
        <Loading />
      ) : (
        <div class="mx-auto md:w-3/4  bg-gray-200">
          <div class="flex flex-col text-center w-full mb-10">
            <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
              {address}
            </h2>
            <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              {profile.name}
            </h1>
            <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
              {profile.dob}
            </h2>
            <Link href={`/ViewPatientProfile?address=${address}`}>
              <a class="text-indigo-500 inline-flex justify-center items-center">
                View Profile
                <svg
                  class="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </Link>
          </div>
          <div>
            <SymptomForm symptoms={symptoms} setSymptoms={setSymptoms} />
          </div>
          <div>
            <MedicineForm setMedicines={setMedicines} medicines={medicines} />
          </div>
          <div>
            <MedicalTest setTests={setTests} tests={tests} />
          </div>
          <div class="relative mb-4">
            <h1 class="text-center sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Conclusion
            </h1>
            <textarea
              id="message"
              name="message"
              placeholder="Write a conclusion."
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
              class="w-3/4 block mx-auto bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <div className=" flex w-full justify-center">
            <label
              htmlFor="purple-toggle"
              className="inline-flex relative items-center mr-5 cursor-pointer "
            >
              <input
                type="checkbox"
                defaultValue
                id="purple-toggle"
                className="sr-only peer"
                checked={important}
                onChange={() => setImportant(!important)}
              />
              <div className="ring-4 w-11 h-6 bg-gray-600 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600" />
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Important
              </span>
            </label>
          </div>
          <div class="flex w-full  justify-center items-end">
            <div class="relative mr-4  lg:w-1/4 xl:w-1/2 w-2/4">
              <label for="hero-field" class="leading-7 text-sm text-gray-600">
                Amount / Fee charged in Wei (1 Wei = 12.17 Rs)
              </label>
              <input
                type="number"
                id="hero-field"
                name="hero-field"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                class="w-full  rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            {amount * 12.17}
          </div>
          <div className="flex items-center">
            <input
              id="link-checkbox"
              type="checkbox"
              defaultValue
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="link-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I have verified all the medications prescribed in this record.
            </label>
          </div>
          <ButtonLoading
            loading={loading}
            handleSubmit={handleSubmit}
            text="Submit"
          />
        </div>
      )}
    </ProtectedLayout>
  );
};

export default addRecord;
