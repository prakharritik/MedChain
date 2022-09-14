import Link from "next/link";
import React from "react";

const RecordRow = ({ record: { id, conclusion, hashURL }, account }) => {
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
        <Link href={`/RecordView?address=${account}&id=${id}`}>
          <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            View
          </a>
        </Link>
      </td>
    </tr>
  );
};

export default RecordRow;
