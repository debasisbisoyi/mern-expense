import React from "react";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";

const FilteredTransactionList = ({ transactions, onClose }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Filtered Transactions</h2>
        <button onClick={onClose} className="hover:bg-gray-200 cursor-pointer transition duration-200">
          <svg
            className="w-6 h-6 stroke-red-500 transition-colors duration-200"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="10"
              y1="10"
              x2="40"
              y2="40"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="40"
              y1="10"
              x2="10"
              y2="40"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      {transactions.length > 0 ? (
        transactions.map((txn) => (
          <TransactionInfoCard
            key={txn._id}
            icon={txn.icon}
            title={txn.source || txn.category}
            amount={txn.amount}
            date={moment(txn.date).format("DD MM YYYY")}
            type={txn.source ? "income" : "expense"}
          />
        ))
      ) : (
        <p className="text-gray-500">
          No transactions found for the selected date range.
        </p>
      )}
    </div>
  );
};

export default FilteredTransactionList;
