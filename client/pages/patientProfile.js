import React from "react";

const Tabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
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
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
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
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Settings
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Options
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Applicant Information
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Personal details and application.
                      </p>
                    </div>
                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Full name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            Margot Foster
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Application for
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            Backend Developer
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Email address
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            margotfoster@example.com
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Salary expectation
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            $120,000
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            About
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            Fugiat ipsum ipsum deserunt culpa aute sint do
                            nostrud anim incididunt cillum culpa consequat.
                            Excepteur qui ipsum aliquip consequat sint. Sit id
                            mollit nulla mollit nostrud in ea officia proident.
                            Irure nostrud pariatur mollit ad adipisicing
                            reprehenderit deserunt qui eu.
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Attachments
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul
                              role="list"
                              className="divide-y divide-gray-200 rounded-md border border-gray-200"
                            >
                              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                <div className="flex w-0 flex-1 items-center">
                                  {/* <PaperClipIcon
                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                  /> */}
                                  <span className="ml-2 w-0 flex-1 truncate">
                                    resume_back_end_developer.pdf
                                  </span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <a
                                    href="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Download
                                  </a>
                                </div>
                              </li>
                              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                <div className="flex w-0 flex-1 items-center">
                                  {/* <PaperClipIcon
                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                  /> */}
                                  <span className="ml-2 w-0 flex-1 truncate">
                                    coverletter_back_end_developer.pdf
                                  </span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <a
                                    href="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Download
                                  </a>
                                </div>
                              </li>
                            </ul>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="py-3 px-6">
                            Product name
                          </th>
                          <th scope="col" class="py-3 px-6">
                            Color
                          </th>
                          <th scope="col" class="py-3 px-6">
                            Category
                          </th>
                          <th scope="col" class="py-3 px-6">
                            Price
                          </th>
                          <th scope="col" class="py-3 px-6">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                          <th
                            scope="row"
                            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Apple MacBook Pro 17"
                          </th>
                          <td class="py-4 px-6">Sliver</td>
                          <td class="py-4 px-6">Laptop</td>
                          <td class="py-4 px-6">$2999</td>
                          <td class="py-4 px-6">
                            <a
                              href="#"
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Microsoft Surface Pro
                          </th>
                          <td class="py-4 px-6">White</td>
                          <td class="py-4 px-6">Laptop PC</td>
                          <td class="py-4 px-6">$1999</td>
                          <td class="py-4 px-6">
                            <a
                              href="#"
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                          <th
                            scope="row"
                            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Magic Mouse 2
                          </th>
                          <td class="py-4 px-6">Black</td>
                          <td class="py-4 px-6">Accessories</td>
                          <td class="py-4 px-6">$99</td>
                          <td class="py-4 px-6">
                            <a
                              href="#"
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Google Pixel Phone
                          </th>
                          <td class="py-4 px-6">Gray</td>
                          <td class="py-4 px-6">Phone</td>
                          <td class="py-4 px-6">$799</td>
                          <td class="py-4 px-6">
                            <a
                              href="#"
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Apple Watch 5
                          </th>
                          <td class="py-4 px-6">Red</td>
                          <td class="py-4 px-6">Wearables</td>
                          <td class="py-4 px-6">$999</td>
                          <td class="py-4 px-6">
                            <a
                              href="#"
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="py-3 px-6">
                            Product name
                          </th>
                          <th scope="col" class="py-3 px-6">
                            Color
                          </th>
                          <th scope="col" class="py-3 px-6">
                            Category
                          </th>
                          <th scope="col" class="py-3 px-6">
                            Price
                          </th>
                          <th scope="col" class="py-3 px-6">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                          <th
                            scope="row"
                            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Apple MacBook Pro 17"
                          </th>
                          <td class="py-4 px-6">Sliver</td>
                          <td class="py-4 px-6">Laptop</td>
                          <td class="py-4 px-6">$2999</td>
                          <td class="py-4 px-6">
                            <a
                              href="#"
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Microsoft Surface Pro
                          </th>
                          <td class="py-4 px-6">White</td>
                          <td class="py-4 px-6">Laptop PC</td>
                          <td class="py-4 px-6">$1999</td>
                          <td class="py-4 px-6">
                            <a
                              href="#"
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                          <th
                            scope="row"
                            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Magic Mouse 2
                          </th>
                          <td class="py-4 px-6">Black</td>
                          <td class="py-4 px-6">Accessories</td>
                          <td class="py-4 px-6">$99</td>
                          <td class="py-4 px-6">
                            <a
                              href="#"
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Google Pixel Phone
                          </th>
                          <td class="py-4 px-6">Gray</td>
                          <td class="py-4 px-6">Phone</td>
                          <td class="py-4 px-6">$799</td>
                          <td class="py-4 px-6">
                            <a
                              href="#"
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Apple Watch 5
                          </th>
                          <td class="py-4 px-6">Red</td>
                          <td class="py-4 px-6">Wearables</td>
                          <td class="py-4 px-6">$999</td>
                          <td class="py-4 px-6">
                            <a
                              href="#"
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function TabsRender() {
  return (
    <>
      <Tabs color="indigo" />;
    </>
  );
}
