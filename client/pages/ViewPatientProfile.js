import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { web3Context } from "../context/web3providerContext";
import ProtectedLayout from "../components/ProtectedLayout";
import Profile from "../components/Profile";
import Records from "../components/Records";
import useContract from "../hooks/useContract";
import Loading from "../components/Loading";

const Tabs = () => {
  const [openTab, setOpenTab] = useState(1);
  const { web3Provider } = useContext(web3Context);
  const router = useRouter();
  const account = router.query.address;

  const [profile, setProfile] = useState(null);
  const [records, setRecords] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const conn = async () => {
      const instance = useContract(web3Provider);
      const res = await instance.methods.getPatient(account).call();
      const records = await instance.methods.getRecords(account).call();
      setRecords(records);
      console.log(records);
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
    };
    conn();

    setLoading(false);
  }, []);

  return (
    <ProtectedLayout>
      {loading || !profile ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-purple-600"
                      : "text-purple-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Profile
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                      ? "text-white bg-purple-600"
                      : "text-purple-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Important Records
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 3
                      ? "text-white bg-purple-600"
                      : "text-purple-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  All Records
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    <Profile profile={profile} />
                  </div>
                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                    <Records
                      records={records.filter((record) => record.important)}
                      account={account}
                    />
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                    <Records records={records} account={account} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ProtectedLayout>
  );
};

export default Tabs;
