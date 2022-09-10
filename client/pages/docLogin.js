import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import ButtonLoading from "../components/ButtonLoading";
import ProtectedLayout from "../components/ProtectedLayout";
import { web3Context } from "../context/web3providerContext";
import useContract from "../hooks/useContract";

const docLogin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [loading, setLoading] = useState(false);
  const [qualification, setQualification] = useState("");
  const [phno, setPhno] = useState("");
  const [hospital, setHospital] = useState("");
  const { web3Provider } = useContext(web3Context);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    const [account] = await web3Provider.eth.getAccounts();
    console.log(account);
    const instance = useContract(web3Provider);
    try {
      const res = await instance.methods
        .addDoctor(name, speciality, qualification, email, phno, hospital)
        .send({
          from: account,
        });
    } catch (err) {}
    setLoading(false);
  };

  return (
    <ProtectedLayout>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Doctor Registeration
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Please fill the following details. They will be used in
              verification.
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
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="Speciality"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Speciality
                  </label>
                  <input
                    type="text"
                    id="Speciality"
                    name="Speciality"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="Qualification"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Qualification
                  </label>
                  <input
                    type="text"
                    id="qualification"
                    name="qualification"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
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
                    htmlFor="Hospital"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Hospital / Pvt Clinic (specify name and address)
                  </label>
                  <input
                    type="text"
                    id="Hospital"
                    name="Hospital"
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <ButtonLoading loading={loading} handleSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      </section>
      ;
    </ProtectedLayout>
  );
};

export default docLogin;
