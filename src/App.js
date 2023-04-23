import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./container/Home/Home";
import Registration from "./container/Registration/Registration";
import Details from "./container/Registration/Details/Details";
import Error from "./components/Error/Error";
import SignIn from "./container/SignIn/SignIn";
import SignUp from "./container/SignUp/SignUp";
import EmailVerify from "./container/Registration/EmailVerify/EmailVerify";
import { dbcode } from "./firebase/firebase-config-codeverify";
import { addDoc, collection } from "firebase/firestore";
import Gender from "./container/Registration/Gender/Gender";
import Interests from "./container/Registration/Interests/Interests";
import About from "./container/Registration/About/About";
import Main from "./container/Main/Main";
import Liked from "./components/BottomMenu/Liked/Liked";
import Account from "./components/BottomMenu/Account/Account";
import User from "./container/User/User";
import Chat from "./components/Chat/Chat";
import UserChat from "./components/Chat/UserChat/UserChat";
import CheckEmail from "./container/SignIn/CheckEmail/CheckEmail";
import Terms from "./container/SignUp/Terms/Terms";
import PrivicePolicy from "./container/SignUp/PrivacyPolicy/PrivacyPolicy";
import { gapi } from "gapi-script";

function App() {
  const [inputValue, setInputValue] = useState(() => {
    const getSavedEmail = localStorage.getItem("savedEmail");
    const initialValue = getSavedEmail;
    return initialValue || "";
  });

  const [picture, setPicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [interest1, setInterest1] = useState("");
  const [interest2, setInterest2] = useState("");
  const [interest3, setInterest3] = useState("");
  const [location, setLocation] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  const [unCorrectBirthday, setUnCorrectBirthday] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [onClicked, setOnClicked] = useState(false);
  const [continueWithGoogle, setContinueWithGoogle] = useState(false);

  const usersCollectionsRef = collection(dbcode, "datingusers");
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    localStorage.setItem("savedEmail", inputValue);
  }, [inputValue]);

  const getBirthday = new Date(birthday);
  const today = new Date();

  // Set type for date
  const year = {
    year: "numeric",
  };

  const day = {
    day: "numeric",
  };

  const month = {
    month: "long",
  };

  // Birthday
  const getYear = getBirthday.toLocaleDateString("en-US", year);
  const getDay = getBirthday.toLocaleDateString("en-US", day);
  const getMonth = getBirthday.toLocaleDateString("en-US", month);

  const getCurrentYear = today.toLocaleDateString("en-US", year);
  useEffect(() => {
    if (+getCurrentYear <= +getYear + 16) {
      setUnCorrectBirthday(true);
    } else {
      setUnCorrectBirthday(false);
    }
  }, [getYear]);

  const createUser = async (event) => {
    event.preventDefault();
    setOnClicked(true);

    await addDoc(usersCollectionsRef, {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      location: location,
      birthday: getDay,
      birthmonth: getMonth,
      birthyear: getYear,
      email: inputValue,
      interest1: interest1,
      interest2: interest2,
      interest3: interest3,
      picture: picture,
      about: aboutMe,
    });

    localStorage.setItem(
      "user",
      JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        location: location,
        birthday: getDay,
        birthmonth: getMonth,
        birthyear: getYear,
        email: inputValue,
        interest1: interest1,
        interest2: interest2,
        interest3: interest3,
        picture: picture,
        about: aboutMe,
      })
    );

    setIsRegistered(true);
  };

  // Google Auth
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  const onSuccess = (res) => {
    setFirstName(res.profileObj.givenName);
    setLastName(res.profileObj.familyName);
    setInputValue(res.profileObj.email);
    setPicture(res.profileObj.imageUrl);
    setContinueWithGoogle(true);
  };

  const onFailure = (res) => {
    console.log(res);
  };

  return (
    <div className="App">
      <div className="app">
        <div className="app__content">
          <Routes>
            <Route path="/datingapp/" element={<Home />} />
            <Route
              path="/datingapp/signup"
              element={<SignUp onSuccess={onSuccess} onFailure={onFailure} />}
            />
            <Route
              path="/datingapp/signup/registration"
              element={
                <Registration
                  setInputValue={setInputValue}
                  inputValue={inputValue}
                />
              }
            />
            <Route
              path="/datingapp/signup/registration/securecode"
              element={<EmailVerify inputValue={inputValue} />}
            />
            <Route
              path="/datingapp/signup/registration/details"
              element={
                <Details
                  setFirstName={setFirstName}
                  setLastName={setLastName}
                  setBirthday={setBirthday}
                  unCorrectBirthday={unCorrectBirthday}
                  setPicture={setPicture}
                  picture={picture}
                  firstName={firstName}
                  lastName={lastName}
                  birthday={birthday}
                />
              }
            />
            <Route
              path="/datingapp/signup/registration/gender"
              element={
                <Gender
                  setGender={setGender}
                  gender={gender}
                  picture={picture}
                  firstName={firstName}
                  lastName={lastName}
                  birthday={birthday}
                />
              }
            />
            <Route
              path="/datingapp/signup/registration/interests"
              element={
                <Interests
                  gender={gender}
                  picture={picture}
                  firstName={firstName}
                  lastName={lastName}
                  birthday={birthday}
                  setInterest1={setInterest1}
                  setInterest2={setInterest2}
                  setInterest3={setInterest3}
                  interest1={interest1}
                  interest2={interest2}
                  interest3={interest3}
                />
              }
            />
            <Route
              path="/datingapp/signup/registration/about"
              element={
                <About
                  setAboutMe={setAboutMe}
                  aboutMe={aboutMe}
                  gender={gender}
                  picture={picture}
                  firstName={firstName}
                  lastName={lastName}
                  birthday={birthday}
                  interest1={interest1}
                  interest2={interest2}
                  interest3={interest3}
                  createUser={createUser}
                  isRegistered={isRegistered}
                  onClicked={onClicked}
                />
              }
            />
            <Route path="/datingapp/main/user/:id" element={<User />} />
            <Route path="/datingapp/main/chat/:id" element={<UserChat />} />
            {/* Bottom menu */}
            <Route path="/datingapp/main" element={<Main />} />
            <Route path="/datingapp/main/liked" element={<Liked />} />
            <Route path="/datingapp/main/account" element={<Account />} />
            {/* SignIn */}
            <Route path="/datingapp/signin" element={<SignIn />} />
            <Route path="/datingapp/checkEmail" element={<CheckEmail />} />
            {/* SignUp */}
            <Route path="/datingapp/terms" element={<Terms />} />
            <Route
              path="/datingapp/privacy_policy"
              element={<PrivicePolicy />}
            />

            <Route path="*" element={<Error />} />
            <Route path="/datingapp/chat" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
