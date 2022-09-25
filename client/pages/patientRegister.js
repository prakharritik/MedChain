import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ButtonLoading from "../components/ButtonLoading";
import Loading from "../components/Loading";
import { web3Context } from "../context/web3providerContext";
import useContract from "../hooks/useContract";

const patientReg = () => {
  const [dob, setDob] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phno, setPhno] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { web3Provider, setWeb3Provider } = useContext(web3Context);
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!web3Provider) {
      router.push("/");
    }
  }, []);

  const handleSubmit = async () => {
    if (!web3Provider) {
      router.push("/");
    } else {
      setLoading(true);
      const instance = useContract(web3Provider);
      const [account] = await web3Provider.eth.getAccounts();
      console.log(account);
      const res = await instance.methods
        .addPatient(name, phno, email, gender, city, dob)
        .send({
          from: account,
        });
      console.log(res);
      router.push("/patientProfile");
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Patient Profile
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Fill your profile details. These details will be shown on your
              medical records.
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="phno"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phno"
                    name="phno"
                    value={phno}
                    onChange={(e) => setPhno(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="Gender"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Gender
                  </label>
                  <input
                    type="text"
                    id="Gender"
                    name="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="Email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="Email"
                    name="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="City"
                    className="leading-7 text-sm text-gray-600"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="City"
                    name="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="Dob"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="Dob"
                    name="Dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <ButtonLoading
                  loading={loading}
                  handleSubmit={handleSubmit}
                  text="Submit"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      ;
    </div>
  );
};

export default patientReg;
