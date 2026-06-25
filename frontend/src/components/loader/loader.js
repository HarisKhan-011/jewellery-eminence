import React from "react";
import {BarLoader} from "react-spinners";

const Loader = ({ loading }) => {
  return (
    <div className="text-center">
      <BarLoader
        color="#D8B866"
        loading={loading}
        height={8}
        width={100}
        margin={2}
      />
    </div>
  );
};

export default Loader;
