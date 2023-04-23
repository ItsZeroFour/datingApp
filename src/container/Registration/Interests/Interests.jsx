import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { interests } from "../../../data/interests";

const Interests = ({
  gender,
  firstName,
  lastName,
  birthday,
  picture,
  setInterest1,
  setInterest2,
  setInterest3,
  interest1,
  interest2,
  interest3,
}) => {
  if (interest1 === interest2) {
    setInterest2("");
  } else if (interest1 === interest3) {
    setInterest3("");
  } else if (interest2 === interest3) {
    setInterest2("");
  }

  return (
    <div className="interests">
      {gender !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      birthday !== "" &&
      picture !== "" ? (
        <div className="interests__container">
          <div className="goback__button">
            <Link to="/datingapp/signup/registration/details">
              <FontAwesomeIcon icon={faAngleLeft} />
            </Link>
          </div>

          <div className="interests__texts">
            <h1 className="interests__title">Your Interests</h1>
            <p className="interests__text">
              Select a few of your interests and let everyone know what you’re
              passionate about.
            </p>
          </div>

          <div className="interests__content">
            <ul className="interests__list">
              {interests.map(({ image, title }) => (
                <li
                  className="interests__item"
                  onClick={() =>
                    interest1 === ""
                      ? setInterest1(title)
                      : interest2 === ""
                      ? setInterest2(title)
                      : interest3 === "" && setInterest3(title)
                  }
                  style={
                    interest1 === title ||
                    interest2 === title ||
                    interest3 === title
                      ? { backgroundColor: "#e94057" }
                      : { backgroundColor: "transparent" }
                  }
                  key={title}
                >
                  <div
                    className={
                      interest1 === title ||
                      interest2 === title ||
                      interest3 === title
                        ? "interests__img active"
                        : "interests__img"
                    }
                  >
                    {image}
                  </div>

                  <p
                    style={
                      interest1 === title ||
                      interest2 === title ||
                      interest3 === title
                        ? { color: "#fff" }
                        : { color: "#323755" }
                    }
                  >
                    {title}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="button__container">
            {interest1 !== "" && interest2 !== "" && interest3 !== "" ? (
              <Link
                className="interests__button continue__button"
                to="/datingapp/signup/registration/about"
              >
                Continue
              </Link>
            ) : (
              <div
                className="interests__button continue__button"
                style={{ opacity: 0.8 }}
                to="/datingapp/signup/registration/about"
              >
                Continue
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="interest__error">
          <p>You didn't fill in your data or choose a gender</p>
          <Link
            className="goback__button-link"
            to="/datingapp/signup/registration/gender"
          >
            Go back
          </Link>
        </div>
      )}
    </div>
  );
};

export default Interests;
