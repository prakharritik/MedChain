import React from "react";
import MedicalTest from "../components/MedicalTest";
import MedicineForm from "../components/MedicineForm";
import SymptomForm from "../components/SymptomsForm";

const addRecord = () => {
  return (
    <div class="mx-auto md:w-3/4  bg-gray-200">
      <div>
        <SymptomForm />
      </div>
      <div>
        <MedicineForm />
      </div>
      <div>
        <MedicalTest />
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
          />
          <div className="ring-4 w-11 h-6 bg-gray-600 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600" />
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Important
          </span>
        </label>
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
          I agree with the .
        </label>
      </div>
      <button class="mx-auto block text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        Submit
      </button>
    </div>
  );
};

export default addRecord;
