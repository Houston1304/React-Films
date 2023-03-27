import { store } from "../store/store";
import { togglePopUp } from "../store/store";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../storage/storage";

export const FilmCard = ({ img, title, raiting }) => {
  let toggle = useSelector((state) => state.currentToggle);
  let isOpen = toggle;

  const popUp = () => {
    if (!getCurrentUser()) {
      isOpen = true;

      store.dispatch(togglePopUp(isOpen));
    }
  };
  return (
    <div className="filmCard">
      <img src={img}></img>
      <div className="detailesBox">
        <button className="detailes">Подробнее</button>
      </div>
      <div className="description">
        <div className="cardHead">
          <p className="raiting">Рейтинг: {raiting}</p>
          <input
            type="image"
            src="src\assets\favorite.png"
            className="favoriteButton"
            onClick={popUp}
          ></input>
          <input
            type="image"
            src="src\assets\later.jpg"
            className="laterButton"
            onClick={popUp}
          ></input>
        </div>

        <p className="filmName">{title}</p>
      </div>
    </div>
  );
};
