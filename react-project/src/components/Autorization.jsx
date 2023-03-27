import { useState } from "react";
import { store } from "../store/store";
import { togglePopUp } from "../store/store";

import { saveCurrentUser } from "../storage/storage";

export const Autorization = () => {
  let isOpen = true;
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const getLogin = (e) => {
    setLogin(e.target.value);
  };

  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  function entry() {
    if (login == "lol" && password == "123") {
      store.dispatch(togglePopUp(!isOpen));
      saveCurrentUser(JSON.stringify({ login: login, password: password }));
    } else alert("Данные введены неверно");
  }

  function close() {
    store.dispatch(togglePopUp(!isOpen));
  }

  return (
    <div className="popUp">
      <div className="autorizationPopUp">
        <button className="closeButton" onClick={close}>
          Закрыть
        </button>
        <div className="popUpContains">
          <input
            className="entry"
            placeholder="Логин"
            value={login}
            onChange={getLogin}
          ></input>
          <input
            className="entry"
            placeholder="Пароль"
            onChange={getPassword}
          ></input>
          <button className="entryButton" onClick={entry}>
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};
