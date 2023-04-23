import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import BottomMenu from "../../components/BottomMenu/BottomMenu";
import { dbcode } from "../../firebase/firebase-config-codeverify";
import cross from "../../images/main/Cross.svg";
import like from "../../images/main/Like.svg";
import star from "../../images/main/Star.svg";

const Main = () => {
  const [users, setUsers] = useState([]);
  const [shuffledUsers, setShuffledUsers] = useState([]);
  const [newUsersList, setNewUsersList] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);

  const usersCollectionRef = collection(dbcode, "datingusers");
  const year = new Date().getFullYear();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!localStorage.getItem("user")) {
    window.location.href = "/datingapp/datingApp/";
  }

  // Check if the localStorege is empty - add new Item
  useEffect(() => {
    if (!localStorage.getItem("liked")) {
      localStorage.setItem("liked", JSON.stringify([]));
    }

    if (!localStorage.getItem("disliked")) {
      localStorage.setItem("disliked", JSON.stringify([]));
    }
  }, []);

  // Working when only swiped
  const swiped = (data, dir) => {
    // Check swipe direction and push in the current array
    if (dir === "right") {
      const getLikedItems = JSON.parse(localStorage.getItem("liked"));
      getLikedItems.push(data);
      localStorage.setItem("liked", JSON.stringify(getLikedItems));
    } else if (dir === "left") {
      const getDislikedItems = JSON.parse(localStorage.getItem("disliked"));
      getDislikedItems.push(data);
      localStorage.setItem("disliked", JSON.stringify(getDislikedItems));
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  // ========= Shuffle array =========
  useEffect(() => {
    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; --i) {
        const pos = Math.floor(Math.random() * (i + 1));
        const t = arr[pos];
        arr[pos] = arr[i];
        arr[i] = t;
      }
      return arr;
    }

    const newArr = shuffle(users.slice());
    setShuffledUsers(newArr);
  }, [users]);

  // ==================== remove Duplicates ====================
  function removeDuplicates(arr) {
    const result = [];
    const duplicatesIndices = [];

    // Перебираем каждый элемент в исходном массиве
    arr.forEach((current, index) => {
      if (duplicatesIndices.includes(index)) return;

      result.push(current);

      // Сравниваем каждый элемент в массиве после текущего
      for (
        let comparisonIndex = index + 1;
        comparisonIndex < arr.length;
        comparisonIndex++
      ) {
        const comparison = arr[comparisonIndex];
        const currentKeys = Object.keys(current);
        const comparisonKeys = Object.keys(comparison);

        // Проверяем длину массивов
        if (currentKeys.length !== comparisonKeys.length) continue;

        // Проверяем значение ключей
        const currentKeysString = currentKeys.sort().join("").toLowerCase();
        const comparisonKeysString = comparisonKeys
          .sort()
          .join("")
          .toLowerCase();
        if (currentKeysString !== comparisonKeysString) continue;

        // Проверяем индексы ключей
        let valuesEqual = true;
        for (let i = 0; i < currentKeys.length; i++) {
          const key = currentKeys[i];
          if (current[key] !== comparison[key]) {
            valuesEqual = false;
            break;
          }
        }
        if (valuesEqual) duplicatesIndices.push(comparisonIndex);
      } // Конец цикла
    });
    return result;
  }

  // ==================== Get array without liked or disliked users ====================
  useEffect(() => {
    // Get liked and disliked users
    const getLikedAndDislikedUsers = removeDuplicates(
      JSON.parse(localStorage.getItem("liked")).concat(
        JSON.parse(localStorage.getItem("disliked"))
      )
    );

    const getUniqueValues = users.filter(
      (o1) => !getLikedAndDislikedUsers.some((o2) => o1.email === o2.email)
    );

    setNewUsersList(getUniqueValues);
  }, [shuffledUsers]);

  // =================================== Filtered users on gender ===================================
  useEffect(() => {
    const getUserGender = user.gender;
    const filteredArray = newUsersList.filter(
      (item) => item.gender !== getUserGender
    );

    setFilteredArray(filteredArray);
  }, [newUsersList]);

  // Liked (button click)
  const likedUserOnClick = (id) => {
    const newArr = filteredArray.filter((item) => item.id !== id);
    const getLikedUser = filteredArray.filter((item) => item.id === id);

    if (getLikedUser.length !== 0) {
      // Get likedUsers, push new item to array and update localStorage
      const getLikedItems = JSON.parse(localStorage.getItem("liked"));
      getLikedItems.push(...getLikedUser);
      localStorage.setItem("liked", JSON.stringify(getLikedItems));
    }

    setFilteredArray(newArr);
  };

  // Disliked (button click)
  const dislikedUserOnClick = (id) => {
    const newArr = filteredArray.filter((item) => item.id !== id);
    const getDislikedUser = filteredArray.filter((item) => item.id === id);

    if (getDislikedUser.length !== 0) {
      const getDislikedItems = JSON.parse(localStorage.getItem("disliked"));
      getDislikedItems.push(...getDislikedUser);
      localStorage.setItem("disliked", JSON.stringify(getDislikedItems));
    }

    setFilteredArray(newArr);
  };

  return (
    <div className="main">
      <div className="main__container">
        {filteredArray.length !== 0 ? (
          <div className="main__content">
            <div className="users__cards">
              {filteredArray.map((data, index) => (
                <TinderCard
                  className="users__card"
                  key={index}
                  preventSwipe={["up", "down"]}
                  onSwipe={(dir) => swiped(data, dir)}
                >
                  <div className="users__info">
                    <div className="users__text-info">
                      <h3>
                        {data.firstName} {data.lastName},{" "}
                        {year - +data.birthyear}
                      </h3>

                      <p>
                        {data.about.length > 65
                          ? `${data.about.substring(0, 65)} ...`
                          : data.about}
                      </p>
                    </div>

                    <img
                      className="users__picture"
                      src={data.picture}
                      alt={data.lastName + " img"}
                    />
                  </div>
                </TinderCard>
              ))}
            </div>

            <div className="main__menu">
              <div
                className="main__menu-item menu__cross"
                onClick={() =>
                  dislikedUserOnClick(
                    filteredArray[filteredArray.length - 1].id
                  )
                }
              >
                <img src={cross} alt="dislike" />
              </div>

              <div
                className="main__menu-item menu__like"
                onClick={() =>
                  likedUserOnClick(filteredArray[filteredArray.length - 1].id)
                }
              >
                <img src={like} alt="like" />
              </div>

              <div className="main__menu-item menu__star">
                <img src={star} alt="favorites" />
              </div>
            </div>

            <div className="main__bottom--menu">
              <BottomMenu />
            </div>
          </div>
        ) : (
          <div className="user__loading">
            <div className="user__loading--text">
              <p>
                It looks like you've scrolled to the end of the :) Try again
                later
              </p>
              <h3>Or wait for the page to load...</h3>
            </div>

            <div className="main__bottom-menu">
              <BottomMenu />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
