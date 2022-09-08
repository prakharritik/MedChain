import React from "react";
import RecordRow from "./RecordRow";

const Records = ({ records }) => {
  return records.length === 0 ? (
    <div className="py-24 text-center text-medium">No records.</div>
  ) : (
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6">
              id
            </th>
            <th scope="col" class="py-3 px-6">
              Conclusion
            </th>
            <th scope="col" class="py-3 px-6">
              Link
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <RecordRow record={record} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Records;
