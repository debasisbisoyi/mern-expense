import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const TransactionFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleFilter = () => {
    if (!startDate || !endDate) {
      setError("Both start and end dates are required.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be later than end date.");
      return;
    }

    setError(""); // Clear errors if validation passes
    onFilter(startDate, endDate);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-4 card col-span-2 mt-6">
      <h1 className="relative group text-lg flex items-center gap-2 w-full md:w-fit border px-1.5 py-1.5 rounded-lg border-gray-200 cursor-pointer">
        <FaFilter />
        {/* Tooltip on hover */}
        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 text-sm text-white bg-primary w-20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Filter by date
        </span>
      </h1>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border border-gray-200 p-2 rounded-md"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border border-gray-200 p-2 rounded-md"
      />
      <button
        onClick={handleFilter}
        className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer"
      >
        Show Transactions
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default TransactionFilter;
