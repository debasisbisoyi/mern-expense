import moment from "moment";
import React from "react";
import { LuArrowDown } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard";
const IncomeList = ({ transactions = [], onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Source</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuArrowDown className="text-base" />
          Download
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            amount={income.amount}
            icon={income.icon}
            date={moment(income.date).format("DD MMMM YYYY")}
            type="income"
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
