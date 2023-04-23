import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import deleteImg from "../../../images/liked/close.svg";
import messageImg from "../../../images/liked/message.svg";
import BottomMenu from "../BottomMenu";

const Liked = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    users ? setIsEmpty(false) : setIsEmpty(true);
  }, [users]);

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

  useEffect(() => {
    const getLiked = localStorage.getItem("liked")
      ? JSON.parse(localStorage.getItem("liked"))
      : [];

    const removed = removeDuplicates(getLiked);
    setUsers(removed);
  }, []);

  const removed = (id) => {
    const newArr = users.filter((item) => item.id !== id);
    localStorage.setItem("liked", JSON.stringify(newArr));

    setUsers(newArr);
  };

  const year = new Date().getFullYear();

  return (
    <div className="liked">
      <div className="liked__container">
        <div className="liked__content">
          <div className="liked__header">
            <h1>Liked</h1>
            <p>Here are all the people you've ever liked.</p>
          </div>

          <ul className="liked__list">
            {!isEmpty ? (
              users.map((data) => (
                <div
                  className="liked__item"
                  style={{ backgroundImage: `url(${data.picture})` }}
                  key={data.id}
                >
                  <div className="liked__item-container">
                    <Link
                      className="liked__item-info"
                      to={`/datingapp/main/user/${data.id}`}
                    >
                      <h2>
                        {data.firstName} {data.lastName},{" "}
                        {year - data.birthyear}
                      </h2>
                    </Link>

                    <div className="liked__item-control-panel">
                      <div
                        className="liked__item-delete"
                        onClick={() => removed(data.id)}
                      >
                        <img src={deleteImg} alt="delete" />
                      </div>
                      <div className="liked__item-message">
                        <Link to={`/datingapp/main/chat/:${data.id}`}>
                          <img src={messageImg} alt="message" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="liked__empty">Array is empry :(</div>
            )}
          </ul>
        </div>
      </div>

      <div className="liked__bottom-menu">
        <BottomMenu />
      </div>
    </div>
  );
};

export default Liked;
