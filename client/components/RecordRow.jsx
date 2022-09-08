import React from "react";

const RecordRow = ({ record: { id, conclusion, hashURL } }) => {
  return (
    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
      <th
        scope="row"
        class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {id}
      </th>
      <td class="py-4 px-6">{conclusion}</td>

      <td class="py-4 px-6">
        <a
          href={hashURL}
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          View
        </a>
      </td>
    </tr>
  );
};

export default RecordRow;
