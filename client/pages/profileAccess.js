import React from "react";
import Layout from "../components/Layout";

const profileAccess = () => {
  return (
    <Layout>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-10 mx-auto">
          <div class="lg:w-2/3 flex flex-col justify-between sm:flex-row sm:items-center items-start mx-auto">
            <div>
              <h1 class="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
                sriracha forage.
              </h1>
              <p className="font-small">sriracha forage.</p>
            </div>

            <button class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0">
              Button
            </button>
          </div>
        </div>{" "}
        <div class="container px-5 py-10 mx-auto">
          <div class="lg:w-2/3 flex flex-col justify-between sm:flex-row sm:items-center items-start mx-auto">
            <div>
              <h1 class="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
                sriracha fofdgdfgdfgdfrage.
              </h1>
              <p className="font-small">sriracha forage.</p>
            </div>

            <button class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0">
              Button
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default profileAccess;
