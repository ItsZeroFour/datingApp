import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Preloader from "../../../components/preloader/Preloader";
import { dbcode } from "../../../firebase/firebase-config-codeverify";
import Delete from "../../../images/emailverify/Delete.svg";

const CheckEmail = () => {
  const [code, setCode] = useState({});
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [wait, setWait] = useState();
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");

  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();

  const checkEmailCollectionsRef = collection(dbcode, "checkEmail");
  const usersCollectionsRef = collection(dbcode, "datingusers");

  let typedCode = "";

  typedCode = `${input1}${input2}${input3}${input4}`;

  useEffect(() => {
    // Get firebase data
    const getCode = async () => {
      const data = await getDocs(checkEmailCollectionsRef);
      setData(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getCode();
  }, []);

  useEffect(() => {
    // Get firebase data
    const getUsers = async () => {
      const data = await getDocs(usersCollectionsRef);
      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getUsers();
  }, []);

  useEffect(() => {
    Object.keys(data).length !== 0 &&
      setCode(data.find((key) => key.code === +typedCode));
  }, [input4]);

  // Auto switch to next input
  inputRef1 && input1 !== "" && inputRef2.current.focus();
  inputRef2 && input2 !== "" && inputRef3.current.focus();
  inputRef3 && input3 !== "" && inputRef4.current.focus();

  // Check correct code
  useEffect(() => {
    if (
      code !== undefined &&
      Object.keys(code).length !== 0 &&
      code.email === localStorage.getItem("checkEmail")
    ) {
      // If User Array length !== 0
      if (users.length !== 0) {
        const searchUser = users.find(
          (user) => user.email === localStorage.getItem("checkEmail")
        );

        localStorage.setItem("user", JSON.stringify(searchUser));

        setError(false);
        setWait(false);

        window.location.href = "/datingapp/main";
        // If users Array length === 0
      } else {
        setWait(true);
      }
    } else {
      setError(true);
    }
  }, [code]);

  return (
    <div className="emailverify">
      <div className="goback__button">
        <Link to="/datingapp/signin">
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
      </div>

      {data.length !== 0 ? (
        <div className="emailverify__content">
          <div className="emailverify__text">
            <h1>Type code</h1>
            <p>Type the verification code we’ve sent you</p>
          </div>

          {wait === true && (
            <p style={{ marginTop: "1rem", fontSize: "1.5rem" }}>
              Please, wait...
            </p>
          )}

          <div className="emailverify__inputs">
            <input
              ref={inputRef1}
              type="number"
              placeholder="0"
              value={input1}
              onChange={(event) => setInput1(event.target.value)}
              style={
                input1 !== ""
                  ? { background: "#e94057", color: "#fff" }
                  : { background: "#fff" }
              }
            />
            <input
              ref={inputRef2}
              type="number"
              placeholder="0"
              value={input2}
              onChange={(event) => setInput2(event.target.value)}
              style={
                input2 !== ""
                  ? { background: "#e94057", color: "#fff" }
                  : { background: "#fff" }
              }
            />
            <input
              ref={inputRef3}
              type="number"
              placeholder="0"
              value={input3}
              onChange={(event) => setInput3(event.target.value)}
              style={
                input3 !== ""
                  ? { background: "#e94057", color: "#fff" }
                  : { background: "#fff" }
              }
            />
            <input
              ref={inputRef4}
              type="number"
              placeholder="0"
              value={input4}
              onChange={(event) => setInput4(event.target.value)}
              style={
                input4 !== ""
                  ? { background: "#e94057", color: "#fff" }
                  : { background: "#fff" }
              }
            />
          </div>

          <div className="emailverify__keyboard">
            <ul className="emailverify__keyboard-list">
              <div>
                <li
                  className="emailverify__keyboard-item"
                  value={1}
                  onClick={(event) =>
                    input1 === ""
                      ? setInput1(event.target.value)
                      : input2 === ""
                      ? setInput2(event.target.value)
                      : input3 === ""
                      ? setInput3(event.target.value)
                      : input4 === ""
                      ? setInput4(event.target.value)
                      : ""
                  }
                >
                  1
                </li>
                <li
                  className="emailverify__keyboard-item"
                  value={2}
                  onClick={(event) =>
                    input1 === ""
                      ? setInput1(event.target.value)
                      : input2 === ""
                      ? setInput2(event.target.value)
                      : input3 === ""
                      ? setInput3(event.target.value)
                      : input4 === ""
                      ? setInput4(event.target.value)
                      : ""
                  }
                >
                  2
                </li>
                <li
                  className="emailverify__keyboard-item"
                  value={3}
                  onClick={(event) =>
                    input1 === ""
                      ? setInput1(event.target.value)
                      : input2 === ""
                      ? setInput2(event.target.value)
                      : input3 === ""
                      ? setInput3(event.target.value)
                      : input4 === ""
                      ? setInput4(event.target.value)
                      : ""
                  }
                >
                  3
                </li>
              </div>

              <div>
                <li
                  className="emailverify__keyboard-item"
                  value={4}
                  onClick={(event) =>
                    input1 === ""
                      ? setInput1(event.target.value)
                      : input2 === ""
                      ? setInput2(event.target.value)
                      : input3 === ""
                      ? setInput3(event.target.value)
                      : input4 === ""
                      ? setInput4(event.target.value)
                      : ""
                  }
                >
                  4
                </li>
                <li
                  className="emailverify__keyboard-item"
                  value={5}
                  onClick={(event) =>
                    input1 === ""
                      ? setInput1(event.target.value)
                      : input2 === ""
                      ? setInput2(event.target.value)
                      : input3 === ""
                      ? setInput3(event.target.value)
                      : input4 === ""
                      ? setInput4(event.target.value)
                      : ""
                  }
                >
                  5
                </li>
                <li
                  className="emailverify__keyboard-item"
                  value={6}
                  onClick={(event) =>
                    input1 === ""
                      ? setInput1(event.target.value)
                      : input2 === ""
                      ? setInput2(event.target.value)
                      : input3 === ""
                      ? setInput3(event.target.value)
                      : input4 === ""
                      ? setInput4(event.target.value)
                      : ""
                  }
                >
                  6
                </li>
                <li
                  className="emailverify__keyboard-item"
                  value={0}
                  onClick={(event) =>
                    input1 === ""
                      ? setInput1(event.target.value)
                      : input2 === ""
                      ? setInput2(event.target.value)
                      : input3 === ""
                      ? setInput3(event.target.value)
                      : input4 === ""
                      ? setInput4(event.target.value)
                      : ""
                  }
                >
                  0
                </li>
              </div>

              <div>
                <li
                  className="emailverify__keyboard-item"
                  value={7}
                  onClick={(event) =>
                    input1 === ""
                      ? setInput1(event.target.value)
                      : input2 === ""
                      ? setInput2(event.target.value)
                      : input3 === ""
                      ? setInput3(event.target.value)
                      : input4 === ""
                      ? setInput4(event.target.value)
                      : ""
                  }
                >
                  7
                </li>
                <li
                  className="emailverify__keyboard-item"
                  value={8}
                  onClick={(event) =>
                    input1 === ""
                      ? setInput1(event.target.value)
                      : input2 === ""
                      ? setInput2(event.target.value)
                      : input3 === ""
                      ? setInput3(event.target.value)
                      : input4 === ""
                      ? setInput4(event.target.value)
                      : ""
                  }
                >
                  8
                </li>
                <li
                  className="emailverify__keyboard-item"
                  value={9}
                  onClick={(event) =>
                    input1 === ""
                      ? setInput1(event.target.value)
                      : input2 === ""
                      ? setInput2(event.target.value)
                      : input3 === ""
                      ? setInput3(event.target.value)
                      : input4 === ""
                      ? setInput4(event.target.value)
                      : ""
                  }
                >
                  9
                </li>
                <li
                  className="emailverify__keyboard-item"
                  onClick={() => {
                    setInput4("");
                    setInput3("");
                    setInput2("");
                    setInput1("");
                  }}
                >
                  <img src={Delete} alt="delete" />
                </li>
              </div>
            </ul>
          </div>

          {error && <p>Uncorrect code!</p>}
        </div>
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default CheckEmail;
