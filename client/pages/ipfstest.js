import React, { useEffect } from "react";
import * as IPFS from "ipfs-core";

const ipfstest = () => {
  let j = { name: "John", age: 30, car: null };
  const ip = async () => {
    const ipfs = await IPFS.create();
    const res = await ipfs.add(JSON.stringify(j));
    console.log(res.path);
  };
  useEffect(() => {
    ip();
  }, []);

  return <div>ipfstest</div>;
};

export default ipfstest;
