import React from "react";
import checks from "../../../images/account/checks.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Account = () => {
  const getUserInfo = JSON.parse(localStorage.getItem("user"));
  const year = new Date().getFullYear();

  if (!localStorage.getItem("user")) {
    window.location.href = "/datingapp/";
  }

  const signOut = () => {
    localStorage.removeItem("user");
    window.location.href = "/datingapp/";
  };

  return (
    <div className="account">
      <div className="account__container">
        {getUserInfo ? (
          <div className="account__conetent">
            <div
              className="account__avatar"
              style={{ backgroundImage: `url(${getUserInfo.picture})` }}
            >
              <div className="account__header">
                <div className="account__back--link">
                  <Link to="/datingapp/main">
                    <FontAwesomeIcon icon={faAngleLeft} />
                  </Link>
                </div>

                <div className="account__signout">
                  <FontAwesomeIcon onClick={signOut} icon={faSignOut} />
                </div>
              </div>
            </div>

            <div className="account__info">
              <div className="account__text-info">
                <div className="account__name">
                  <h2>
                    {getUserInfo.firstName} {getUserInfo.lastName},{" "}
                    {year - +getUserInfo.birthyear}
                  </h2>
                </div>

                <div className="account__about">
                  <h3>About</h3>
                  <p>{getUserInfo.about}</p>
                </div>

                <div className="account__interests">
                  <h3>Interests</h3>
                  <ul className="account__interests-list">
                    {[
                      getUserInfo.interest1,
                      getUserInfo.interest2,
                      getUserInfo.interest3,
                    ].map((item) => (
                      <li className="account__iterests-item">
                        <img src={checks} alt="choose" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Account;
