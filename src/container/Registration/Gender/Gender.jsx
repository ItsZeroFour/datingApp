import { faAngleLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Gender = ({
  setGender,
  gender,
  picture,
  firstName,
  lastName,
  birthday,
}) => {
  return (
    <div className="gender">
      {picture !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      birthday !== "" ? (
        <div className="gender__container">
          <div className="goback__button">
            <Link to="/datingapp/signup/registration/details">
              <FontAwesomeIcon icon={faAngleLeft} />
            </Link>
          </div>

          <h1 className="gender__title">I am a</h1>

          <div className="gender__content">
            <div className="gender__choose">
              <button
                value="Man"
                onClick={(event) => setGender(event.target.value)}
                style={
                  gender === "Man"
                    ? { backgroundColor: "#e94057", color: "#fff" }
                    : { backgroundColor: "transparent" }
                }
              >
                <p>Man</p>
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button
                value="Woman"
                onClick={(event) => setGender(event.target.value)}
                style={
                  gender === "Woman"
                    ? { backgroundColor: "#e94057", color: "#fff" }
                    : { backgroundColor: "transparent" }
                }
              >
                <p>Woman</p>
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>

            {gender !== "" ? (
              <Link
                className="continue__button gender__continue-button"
                to="/datingapp/signup/registration/interests"
              >
                Continue
              </Link>
            ) : (
              <div className="continue__button gender__continue-button">
                Continue
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="gender__error">
          <p>You did not provide your details</p>
          <Link
            className="goback__button-link"
            to="/datingapp/signup/registration/details"
          >
            Go back
          </Link>
        </div>
      )}
    </div>
  );
};

export default Gender;
