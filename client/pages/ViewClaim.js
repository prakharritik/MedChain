import React from "react";

const ViewClaim = () => {
  return (
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-3/4 mx-auto flex flex-wrap">
          <div class=" w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">
              BRAND NAME
            </h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">
              Animated Night Hill Illustrations
            </h1>

            <p class="leading-relaxed mb-4">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric
              sriracha taximy chia microdosing tilde DIY. XOXO fam inxigo
              juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
              seitan poutine tumeric. Gastropub blue bottle austin listicle
              pour-over, neutra jean.
            </p>
            <div class="flex border-t border-gray-200 py-2">
              <span class="text-gray-500">Color</span>
              <span class="ml-auto text-gray-900">Blue</span>
            </div>
            <div class="flex border-t border-gray-200 py-2">
              <span class="text-gray-500">Size</span>
              <span class="ml-auto text-gray-900">Medium</span>
            </div>
            <div class="flex border-t border-b mb-6 border-gray-200 py-2">
              <span class="text-gray-500">Quantity</span>
              <span class="ml-auto text-gray-900">4</span>
            </div>
            <div class="flex">
              <span class="title-font font-medium text-2xl text-gray-900">
                $58.00
              </span>
              <div className="ml-auto flex space-x-4">
                <button class="flex  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Button
                </button>
                <button class="flex  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Button
                </button>
                <button class="flex  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewClaim;
