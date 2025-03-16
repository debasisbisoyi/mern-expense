import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-100 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm">
          <div className="flex items-baseline justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center cursor-pointer"
              onClick={onClose}
            >
              <svg
                className="w-6 h-6 stroke-black transition-colors duration-200"
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
          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
