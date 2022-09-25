const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_RecordId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "addClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_policyDetails",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_interval",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "addPolicy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "policyNo",
        type: "uint256",
      },
    ],
    name: "addRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "assignPolicy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "claimID",
        type: "uint256",
      },
      {
        internalType: "enum Insurance.ClaimStatus",
        name: "action",
        type: "uint8",
      },
    ],
    name: "claimAction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "payPremium",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "claimMapping",
    outputs: [
      {
        internalType: "uint256",
        name: "claimID",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "customer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "RecordId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "datetime",
        type: "uint256",
      },
      {
        internalType: "enum Insurance.ClaimStatus",
        name: "status",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "customerMapping",
    outputs: [
      {
        internalType: "address",
        name: "customerAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "policyNo",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "dueDate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "customer",
        type: "address",
      },
    ],
    name: "getCustomerClaims",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "claimID",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "customer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "RecordId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "datetime",
            type: "uint256",
          },
          {
            internalType: "enum Insurance.ClaimStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct Insurance.Claim[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "customer",
        type: "address",
      },
    ],
    name: "getCustomerPremiums",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "policyNo",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "date",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "dueDate",
            type: "uint256",
          },
        ],
        internalType: "struct Insurance.Premium[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "customer",
        type: "address",
      },
    ],
    name: "getCustomerStatus",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "customerAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "policyNo",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "dueDate",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "policyNo",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "date",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "dueDate",
                type: "uint256",
              },
            ],
            internalType: "struct Insurance.Premium[]",
            name: "prevPremiums",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "claimID",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "customer",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "RecordId",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "datetime",
                type: "uint256",
              },
              {
                internalType: "enum Insurance.ClaimStatus",
                name: "status",
                type: "uint8",
              },
            ],
            internalType: "struct Insurance.Claim[]",
            name: "prevClaims",
            type: "tuple[]",
          },
        ],
        internalType: "struct Insurance.Customer",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "string",
            name: "policyDetails",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "policyNo",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "interval",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "premiumAmount",
            type: "uint256",
          },
        ],
        internalType: "struct Insurance.Policy",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPolicies",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "policyDetails",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "policyNo",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "interval",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "premiumAmount",
            type: "uint256",
          },
        ],
        internalType: "struct Insurance.Policy[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRequests",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "customerAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "policyNo",
            type: "uint256",
          },
        ],
        internalType: "struct Insurance.Request[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "requests",
    outputs: [
      {
        internalType: "address",
        name: "customerAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "policyNo",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "viewClaim",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "claimID",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "customer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "RecordId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "datetime",
            type: "uint256",
          },
          {
            internalType: "enum Insurance.ClaimStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct Insurance.Claim[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const useContractInsurance = (web3, address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};

export default useContractInsurance;
