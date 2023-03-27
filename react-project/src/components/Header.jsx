import { Autorization } from "./autorization";
import { useEffect, useState } from "react";
import { store } from "../store/store";
import { togglePopUp } from "../store/store";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../storage/storage";

export const Header = () => {
  let toggle = useSelector((state) => state.currentToggle);
  let isOpen = toggle;

  const popUp = () => {
    isOpen = true;

    store.dispatch(togglePopUp(isOpen));
  };

  const exit = () => {
    localStorage.clear();
    isOpen = true;
    store.dispatch(togglePopUp(isOpen));
  };

  return (
    <div className="mainHeader">
      <p className="homeHead">Home</p>
      {getCurrentUser() && (
        <button className="login" onClick={exit}>
          Выйти
        </button>
      )}
      {!getCurrentUser() && (
        <button className="login" onClick={popUp}>
          Войти
        </button>
      )}
      {toggle && <Autorization />}
    </div>
  );
};
