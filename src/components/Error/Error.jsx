import React from "react";
import { Link } from "react-router-dom";
import BrokenHeart from "../../images/Error/Broken_heart.svg";

const Error = () => {
  return (
    <div className="error">
      <div className="error__container">
        <div className="error__type">
          <h1>4</h1> <img src={BrokenHeart} alt="Broke Heart" /> <h1>4</h1>
        </div>

        <div className="error__text">
          <p>Ooops! Sorry, we could not find the LOVE</p>
        </div>

        <div className="error__button">
          <Link className="error__button-link" to="/datingapp">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
