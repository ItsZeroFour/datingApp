import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { dbcode } from "../../firebase/firebase-config-codeverify";
import Preloader from "../../components/preloader/Preloader";
import Cross from "../../images/main/Cross.svg";
import Like from "../../images/main/Like.svg";
import Star from "../../images/main/Star.svg";
import send from "../../images/account/send.svg";
import checks from "../../images/account/checks.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const User = () => {
  const [users, setUsers] = useState([]);
  const [getUser, setGetUser] = useState([]);

  const { id } = useParams();
  const usersCollectionRef = collection(dbcode, "datingusers");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  useEffect(() => {
    setGetUser(users.filter((item) => item.id == id));
  }, [users]);

  const year = new Date().getFullYear();

  return (
    <div className="user">
      {getUser.length !== 0 ? (
        <div className="user__container">
          {getUser.map((data) => (
            <div className="user__conetent" key={data.id}>
              <div
                className="user__avatar"
                style={{ backgroundImage: `url(${data.picture})` }}
              >
                <div className="user__back">
                  <Link to="/datingapp/main">
                    <FontAwesomeIcon icon={faAngleLeft} />
                  </Link>
                </div>

                <div className="user__controls">
                  <ul className="user__controls-list">
                    {[Cross, Like, Star].map((item) => (
                      <li className="user__controls-item">
                        <img src={item} alt="control item" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="user__info">
                <div className="user__text-info">
                  <div className="user__name">
                    <h2>
                      {data.firstName} {data.lastName}, {year - +data.birthyear}
                    </h2>

                    <img src={send} alt="send" />
                  </div>

                  <div className="user__about">
                    <h3>About</h3>
                    <p>{data.about}</p>
                  </div>

                  <div className="user__interests">
                    <h3>Interests</h3>
                    <ul className="user__interests-list">
                      {[data.interest1, data.interest2, data.interest3].map(
                        (item) => (
                          <li className="user__iterests-item">
                            <img src={checks} alt="choose" />
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default User;
