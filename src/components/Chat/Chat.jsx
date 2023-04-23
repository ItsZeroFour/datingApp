import React from "react";
import search from "../../images/chat/search.svg";
import logo from "../../images/chat/logo.png";
import { Link } from "react-router-dom";
import BottomMenu from "../BottomMenu/BottomMenu";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat__back-link">
        <Link to="/datingapp/main">
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
      </div>

      <div className="chat__container">
        <h1>Messages</h1>
        <div className="chat__search">
          <img src={search} alt="search img" />
          <input type="text" placeholder="Search" />
        </div>

        <ul className="chat__list">
          <li className="chat__item">
            {/* <Link to={`/datingapp/chat/user/${data.id}`}></Link> */}
            <img src={logo} alt="picture" />

            <div className="chat__item--content">
              <h1>DatingApp</h1>
              <p>Hello!</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="chat__bottom-menu">
        <BottomMenu />
      </div>
    </div>
  );
};

export default Chat;
