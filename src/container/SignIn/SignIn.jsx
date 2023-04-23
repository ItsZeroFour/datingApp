import React from "react";
import { dbcode } from "../../firebase/firebase-config-codeverify";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { figures } from "../../data/codeFigures.js";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  const [newCode, setNewCode] = useState(0);
  const [onClicked, setOnClicked] = useState(false);
  const [checkUniqueEmail, setCheckUniqueEmail] = useState(false);

  const form = useRef();

  const usersCollectionRef = collection(dbcode, "datingusers");
  const checkEmailCollectionRef = collection(dbcode, "checkEmail");

  const checkEmail = localStorage.getItem("checkEmail");

  // Get users collection
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  useEffect(() => {
    data.find((user) => user.email === email) === undefined
      ? setCheckUniqueEmail(true)
      : setCheckUniqueEmail(false);
  });

  // Create random code generator
  useEffect(() => {
    let randomCode = "";

    for (let i = 0; i < 4; i++) {
      const randomFigures = Math.floor(Math.random() * figures.length);
      randomCode += figures[randomFigures];
    }

    setNewCode(+randomCode);
  }, []);

  // Push all emails to Array
  useEffect(() => {
    data.map(({ email }) => {
      emails.push(email);
    });
  }, [data]);

  const sendButton = async (event) => {
    event.preventDefault();

    setOnClicked(true);

    // Check contains elem in arr
    function contains(arr, elem) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
          return true;
        }
      }
      return false;
    }

    // If contains === true:
    contains(emails, email) === true &&
      localStorage.setItem("checkEmail", email);
    contains(emails, email) === true &&
      (await addDoc(checkEmailCollectionRef, {
        code: newCode,
        email: checkEmail,
      }));
    contains(emails, email) === true &&
      (await emailjs
        .sendForm(
          "service_of6uxmc",
          "template_kcrn6mh",
          form.current,
          "Bte1EjapjDkuVt8Kb"
        )
        .then(
          () => {
            console.log("send");
          },
          (error) => {
            console.log(error.text);
          }
        ));
    contains(emails, email) === true && setOnClicked(false);
    contains(emails, email) === true &&
      (window.location.href = "/datingApp/datingapp/checkEmail");
  };

  return (
    <div className="signin">
      <div className="signin__container">
        <h1>My Email</h1>
        <p>
          Enter your email address, which was specified when registering the
          account
        </p>

        <form ref={form} style={{ display: "none" }}>
          <input type="number" value={newCode} name="code" />
          <input type="text" value={checkEmail} name="to_name" />
        </form>

        <form className="signin__form">
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Type your Email"
          />

          { data.length === 0 || email === "" ? (
            <button type="submit" disabled style={{ opacity: 0.8 }}>
              Continue
            </button>
          ) : (
            <div className="button__container">
              {onClicked ? (
                <button type="submit" disabled>
                  Loading...
                </button>
              ) : (
                <button type="submit" onClick={sendButton}>
                  Continue
                </button>
              )}
            </div>
          )}
        </form>

        {checkUniqueEmail === true && (
          <div className="registration__unique-email">
            <p>This email has not yet been registered</p>
            <Link to="/datingapp/signup">sign up</Link>
            <p>or waiting...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
