import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  type,
  amount,
  hideDeleteBtn,
  onDelete
}) => {
  const getAmountStyles = () =>
    type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";

  return (
    <div className="group relative flex md:items-center gap-4 mt-2 p-3 rounded-lg border md:border-none border-gray-200 hover:bg-gray-100/60 flex-col md:flex-row items-start">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          <span className="w-6 h-6">{icon}</span>
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="md:flex-1 flex items-center justify-between w-full">
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>
        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="md:text-gray-400 opacity-100 text-red-500 hover:text-red-500 md:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 />
            </button>
          )}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"} ${amount}
            </h6>
            <h6 className="">
              {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
