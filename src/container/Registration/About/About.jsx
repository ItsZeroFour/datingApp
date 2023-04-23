import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { dbcode } from "../../../firebase/firebase-config-codeverify";

const About = (setAboutMe) => {
  const [users, setUsers] = useState([]);
  const aboutLength = setAboutMe.aboutMe.split("").length;

  const codeCollectionsRef = collection(dbcode, "datingusers");

  const maxLength = 150;

  function changeHref() {
    window.location.href = "/datingApp/datingapp/main";
  }

  setAboutMe.isRegistered === true && changeHref();

  useEffect(() => {
    // Get firebase data
    const getCode = async () => {
      const data = await getDocs(codeCollectionsRef);
      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getCode();
  }, []);

  return (
    <div className="about">
      {setAboutMe.gender !== "" &&
      setAboutMe.firstName !== "" &&
      setAboutMe.lastName !== "" &&
      setAboutMe.birthday !== "" &&
      setAboutMe.picture !== "" &&
      setAboutMe.interest1 !== "" &&
      setAboutMe.interest2 !== "" &&
      setAboutMe.interest3 !== "" ? (
        <div className="about__container">
          <div className="goback__button">
            <Link to="/datingapp/signup/registration/interests">
              <FontAwesomeIcon icon={faAngleLeft} />
            </Link>
          </div>

          <div className="about__content">
            <div className="about__text-content">
              <h1 className="about__title">About you</h1>
              <p className="about__text">
                Please write at least 50 characters about you
              </p>
            </div>

            <form className="about__form">
              <textarea
                className="about__textarea"
                onChange={(event) => setAboutMe.setAboutMe(event.target.value)}
                maxLength={maxLength}
              />
              {aboutLength >= 50 ? (
                <div className="button__container">
                  {setAboutMe.onClicked === false ? (
                    <button
                      className="about__button-confirm"
                      onClick={setAboutMe.createUser}
                    >
                      Confirm
                    </button>
                  ) : (
                    <button
                      className="about__button-confirm"
                      disabled
                      style={{ opacity: 0.8 }}
                    >
                      Register...{" "}
                      <svg
                        class="pl"
                        viewBox="0 0 200 200"
                        width="200"
                        height="200"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            id="pl-grad1"
                            x1="1"
                            y1="0.5"
                            x2="0"
                            y2="0.5"
                          >
                            <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                            <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                          </linearGradient>
                          <linearGradient
                            id="pl-grad2"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                            <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                          </linearGradient>
                        </defs>
                        <circle
                          class="pl__ring"
                          cx="100"
                          cy="100"
                          r="82"
                          fill="none"
                          stroke="url(#pl-grad1)"
                          stroke-width="36"
                          stroke-dasharray="0 257 1 257"
                          stroke-dashoffset="0.01"
                          stroke-linecap="round"
                          transform="rotate(-90,100,100)"
                        />
                        <line
                          class="pl__ball"
                          stroke="url(#pl-grad2)"
                          x1="100"
                          y1="18"
                          x2="100.01"
                          y2="182"
                          stroke-width="36"
                          stroke-dasharray="1 165"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ) : (
                <button
                  className="about__button-confirm about__disabled"
                  style={{ opacity: 0.8 }}
                  disabled
                >
                  Confirm
                </button>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div className="about__error">
          <p>You didn't fill in your data or choose a gender</p>
          <Link
            className="goback__button-link"
            to="/datingapp/signup/registration/interests"
          >
            Go back
          </Link>
        </div>
      )}
    </div>
  );
};

export default About;
