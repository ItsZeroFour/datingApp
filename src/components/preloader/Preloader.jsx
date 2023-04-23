import React from "react";
import preloader from "../../images/preloader/preloader.gif";
import BottomMenu from "../BottomMenu/BottomMenu";

const Preloader = () => {
  return (
    <div className="preloader">
      <img src={preloader} alt="loading..." />

      <div className="preloader__bottom-menu">
        <BottomMenu />
      </div>
    </div>
  );
};

export default Preloader;
