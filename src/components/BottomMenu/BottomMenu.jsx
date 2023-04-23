import React from "react";
import { Link } from "react-router-dom";
import cards from "../../images/bottomMenu/Cards.svg";
import like from "../../images/bottomMenu/Like.svg";
import message from "../../images/bottomMenu/message.svg";
import people from "../../images/bottomMenu/people.svg";

const BottomMenu = () => {
  return (
    <div className="bottom-menu">
      <div className="bottom-menu__container">
        <ul className="bottom-menu__list">
          <li className="bottom-menu__item">
            <Link to="/datingapp/main/">
              <img src={cards} alt="Cards" />
            </Link>
          </li>

          <li className="bottom-menu__item">
            <Link to="/datingapp/main/liked">
              <img src={like} alt="Liked" />
            </Link>
          </li>

          <li className="bottom-menu__item">
            <Link to="/datingapp/chat">
              <img src={message} alt="Messages" />
            </Link>
          </li>

          <li className="bottom-menu__item">
            <Link to="/datingapp/main/account">
              <img src={people} alt="Account" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BottomMenu;
