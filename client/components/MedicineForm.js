import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
function TableRows({ rowsData, deleteTableRows, handleChange }) {
  return rowsData.map((data, index) => {
    const { Medicine, Dosage, Days } = data;
    return (
      <tr key={index}>
        <td class="border px-8 py-4">
          <input
            type="text"
            value={Medicine}
            placeholder="Name of medicine"
            onChange={(evnt) => handleChange(index, evnt)}
            name="Medicine"
            class="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-yellow focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </td>
        <td class="border px-8 py-4">
          <input
            type="text"
            placeholder="Enter daily intake"
            value={Dosage}
            onChange={(evnt) => handleChange(index, evnt)}
            name="Dosage"
            class="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </td>
        <td class="border px-8 py-4">
          <input
            type="number"
            placeholder="Number of days"
            value={Days}
            onChange={(evnt) => handleChange(index, evnt)}
            name="Days"
            class="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </td>
        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteTableRows(index)}
          >
            <TrashIcon className="w-6 h-6" />
          </button>
        </td>
      </tr>
    );
  });
}

function MedicineForm({ medicines: rowsData, setMedicines: setRowsData }) {
  const addTableRows = () => {
    const rowsInput = {
      Medicine: "",
      Dosage: "",
      Days: "",
    };
    setRowsData([...rowsData, rowsInput]);
  };
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };
  return (
    <div className="mb-5">
      <h1 class="text-center sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
        Medicines
      </h1>
      <div className="row">
        <div className=" mx-auto">
          <table class="shadow-lg  border-separate m-auto w-full ">
            <thead className="bg-indigo-500 border text-center px-8 py-4 ">
              <tr>
                <th className=" py-2 px-8">Medicine</th>
                <th className=" py-2 px-8">Dosage</th>
                <th className=" py-2 px-8">Days</th>
              </tr>
            </thead>
            <tbody className="">
              <TableRows
                rowsData={rowsData}
                deleteTableRows={deleteTableRows}
                handleChange={handleChange}
              />
              <tr>
                <td className="btn btn-outline-success text-center" colSpan={4}>
                  <button
                    onClick={addTableRows}
                    class="flex mx-auto mt-3 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
}
export default MedicineForm;
