import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-20 h-20 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
