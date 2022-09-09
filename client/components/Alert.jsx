import React from "react";

const Alert = ({ type, msg }) => {
  const color = type === "success" ? green : red;

  return (
    <div
      className={`p-4 mb-4 text-sm text-${color}-700 bg-${color}-100 rounded-lg dark:bg-${color}-200 dark:text-${color}-800`}
      role="alert"
    >
      <span class="font-medium">{msg}</span>
    </div>
  );
};

export default Alert;
