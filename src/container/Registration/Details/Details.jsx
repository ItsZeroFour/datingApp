import React, { useState } from "react";
import { Link } from "react-router-dom";
import camera from "../../../images/details/camera.png";

const Details = ({
  setFirstName,
  setLastName,
  setBirthday,
  unCorrectBirthday,
  setPicture,
  picture,
  firstName,
  lastName,
  birthday,
}) => {
  const [maxFileSize, setMaxFileSize] = useState(false);
  const getInputEmail = localStorage.getItem("savedEmail");

  if (localStorage.getItem("user")) {
    window.location.href = "/datingapp/main";
  }

  // File reader
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    setPicture(fileReader.result);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    // If file size is larger than max file size
    if (file.size < 1048487) {
      fileReader.readAsDataURL(file);
      setMaxFileSize(false);
    } else {
      setMaxFileSize(true);
    }
  };

  return (
    <div className="details">
      {getInputEmail !== "" ? (
        <div className="details__content">
          <h1>Profile details</h1>

          <input
            className="detailt__avatar-input"
            type="file"
            id="file"
            accept=".jpg, .jpeg"
            onChange={handleSubmit}
          />
          <label className="detailt__avatar-label" htmlFor="file">
            {picture === "" || maxFileSize ? (
              <div>
                <img
                  className="details__photo"
                  src={camera}
                  alt="select picture"
                />

                {maxFileSize && (
                  <p style={{ marginTop: "1rem" }}>Max file size!</p>
                )}
              </div>
            ) : (
              <img className="details__avatar" src={picture} alt="avatar" />
            )}
          </label>

          <form className="details__form">
            <div className="input__container">
              <input
                type="text"
                id="name"
                onChange={(event) => setFirstName(event.target.value)}
                required
              />
              <label htmlFor="name">Name</label>
            </div>

            <div className="input__container">
              <input
                type="text"
                id="lastname"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                required
              />
              <label htmlFor="lastname">Last Name</label>
            </div>

            <input
              type="date"
              name="date"
              required
              onChange={(event) => setBirthday(event.target.value)}
            />

            {unCorrectBirthday && (
              <p style={{ marginTop: "1rem" }}>Uncorrect birthday</p>
            )}
          </form>

          {picture !== "" &&
          firstName !== "" &&
          lastName !== "" &&
          birthday !== "" &&
          !unCorrectBirthday ? (
            <Link
              className="continue__button"
              to="/datingapp/signup/registration/gender"
            >
              Confirm
            </Link>
          ) : (
            <div className="continue__button" style={{ opacity: 0.8 }}>
              Confirm
            </div>
          )}
        </div>
      ) : (
        <div className="details__error">
          <p>Sorry, but you don`t verify your email adress</p>
          <div style={{ marginTop: "3rem" }}>
            <Link
              className="detailt__back-link"
              to="/datingapp/signup/registration"
            >
              Go back
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
