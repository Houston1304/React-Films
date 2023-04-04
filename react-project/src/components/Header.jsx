import { Autorization } from "./autorization";
import { useNavigate } from "react-router-dom";
import { store } from "../store/store";
import { togglePopUp } from "../store/store";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../storage/storage";

export const Header = () => {
  const toggle = useSelector((state) => state.currentToggle);
  let isOpen = toggle;

  const navigate = useNavigate();

  const popUp = () => {
    isOpen = true;

    store.dispatch(togglePopUp(isOpen));
  };

  const exit = () => {
    localStorage.clear();
    isOpen = true;
    store.dispatch(togglePopUp(isOpen));
  };

  const handleSearch = () => {
    navigate("/search");
  };

  return (
    <div className="mainHeader">
      <button className="homeSearch" onClick={handleSearch}>
        Поиск
        <img className="searchIcon" src="src\assets\magnifying-glass.png"></img>
      </button>

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
