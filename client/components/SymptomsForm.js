import { useEffect, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function SymptomsForm({ symptoms, setSymptoms }) {
  const [symptom, setSymptom] = useState("");

  function handleInputChange(e) {
    setSymptom(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (symptom !== "") {
      setSymptoms([
        ...symptoms,
        {
          id: symptoms.length + 1,
          text: symptom.trim(),
        },
      ]);
    }

    setSymptom("");
  }

  function handleDeleteClick(id) {
    console.log(id);
    const removeItem = symptoms.filter((symptom) => {
      return symptom.id !== id;
    });
    setSymptoms(removeItem);
  }

  // function to handle when the "Edit" button is clicked
  function handleEditClick(symptom) {
    setSymptom(symptom.text);
    handleDeleteClick(symptom.id);
  }

  return (
    <div className="">
      <form onSubmit={handleFormSubmit}>
        <div className=" rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0">
          <h1 class="text-center sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Symptoms
          </h1>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <input
              name="symptom"
              type="text"
              placeholder="Add a new symptom"
              value={symptom}
              onChange={handleInputChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />

            <button className="m-auto block text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Add
            </button>
          </div>
          <div className=" inline-block text-gray-500 mt-3  gap-2">
            {symptoms.map((symptom) => (
              <div
                key={symptom.id}
                className="inline-block border-solid border-2 border-indigo-500/100	 text-white flex-shrink-0"
              >
                <p class="inline-flex text-gray-900 p-3 items-center justify-center text-lg title-font font-medium">
                  {symptom.text}
                </p>
                <button
                  onClick={() => handleEditClick(symptom)}
                  class="w-6 h-6 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0"
                >
                  <PencilSquareIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(symptom.id)}
                  class="w-6 h-6 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
