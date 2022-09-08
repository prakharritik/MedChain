import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
function TableRows({ rowsData, deleteTableRows, handleChange }) {
  return rowsData.map((data, index) => {
    const { Test, Value, Status } = data;
    return (
      <tr key={index}>
        <td class="border px-8 py-4">
          <input
            type="text"
            value={Test}
            placeholder="Name of Test"
            onChange={(evnt) => handleChange(index, evnt)}
            name="Test"
            class="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-yellow focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </td>
        <td class="border px-8 py-4">
          <input
            type="text"
            placeholder="Enter measured value"
            value={Value}
            onChange={(evnt) => handleChange(index, evnt)}
            name="Value"
            class="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </td>
        <td class="border px-8 py-4">
          <select
            placeholder=" Status"
            value={Status}
            onChange={(evnt) => handleChange(index, evnt)}
            name="Status"
            class="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          >
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>
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

function AddTestReport() {
  const [rowsData, setRowsData] = useState([]);

  const addTableRows = () => {
    const rowsInput = {
      Test: "",
      Value: "",
      Status: "",
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
    <div className="mx-auto md:w-3/4  bg-gray-200">
      <h1 class="text-center sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
        Tests
      </h1>
      <div className="row ">
        <div className=" mx-auto">
          <table class="shadow-lg mb-5 border-separate m-auto w-full ">
            <thead className="bg-indigo-500 border text-center px-8 py-4 ">
              <tr>
                <th className=" py-2 px-8">Test</th>
                <th className=" py-2 px-8">Value</th>
                <th className=" py-2 px-8">Status</th>
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
        <div class="relative mb-4">
          <h1 class="text-center sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Conclusion
          </h1>
          <textarea
            id="message"
            name="message"
            placeholder="Write a conclusion."
            class="w-3/4 block mx-auto bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>
      <button class="flex mx-auto mt-3 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        Submit
      </button>
    </div>
  );
}
export default AddTestReport;
