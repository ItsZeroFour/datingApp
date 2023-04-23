import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dbchat } from "../../../firebase/firebase-config-chat";
import BottomMenu from "../../BottomMenu/BottomMenu";
import { dbcode } from "../../../firebase/firebase-config-codeverify";

const UserChat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [getCurrentUser, setGetCurrentUser] = useState(null);

  const messagesRef = collection(dbchat, "chat");
  const usersCollectionRef = collection(dbcode, "datingusers");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const queryMessages = query(messagesRef, where("chatId", "==", id));
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let message = [];

      snapshot.forEach((doc) => {
        message.push({ ...doc.data(), id: doc.id });
      });
      setMessages(message);
    });

    return () => unsuscribe();
  }, []);

  const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: user.firstName,
      picture: user.picture,
      chatId: id,
    });

    setNewMessage("");
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  useEffect(() => {
    users.length !== 0 &&
      setGetCurrentUser(users.find((item) => item.id === id.slice(1)));
  }, [users]);

  return (
    <div className="user-chat">
      <div className="user-chat__container">
        <header className="user-chat__header">
          {getCurrentUser !== null ? (
            <div className="user_chat__header--content">
              <img src={getCurrentUser?.picture} />
              <h3>{`${getCurrentUser?.firstName}  ${getCurrentUser?.lastName}`}</h3>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </header>

        <ul className="user-chat__messages">
          {messages.map((message) => (
            <li className="user-chat__message" key={message.id}>
              <img src={message.picture} />
              <div className="user-chat__message--text">
                <span>{message.user}</span>
                <p>{message.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <form className="user-chat__form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your message"
            onChange={(event) => setNewMessage(event.target.value)}
            value={newMessage}
          />
          <button type="submit">Send</button>
        </form>

        <BottomMenu />
      </div>
    </div>
  );
};

export default UserChat;
