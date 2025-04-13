import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.sweetLoading}>
      <ClipLoader color="#36d7b7" size={50} />
    </div>
  );
};

export default Loader;
