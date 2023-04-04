import { store } from "../store/store";
import { togglePopUp } from "../store/store";
import { useSelector } from "react-redux";
import { getFavoriteFilm, getWatchLater } from "../storage/storage";
import { Link, useNavigate } from "react-router-dom";

export const FilmCard = ({ id, img, title, raiting, favorite, later }) => {
  let toggle = useSelector((state) => state.currentToggle);
  let isOpen = toggle;

  const navigate = useNavigate();

  const handleDeatiles = () => {
    navigate("/detailes");
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    favorite(isOpen, id);
  };

  const handleLater = (e) => {
    e.preventDefault();
    later(isOpen, id);
  };

  let favoriteSrc = `src\\assets\\favorite.png`;

  if (getFavoriteFilm() && getFavoriteFilm().includes(id)) {
    favoriteSrc = `src\\assets\\golden_favorite.png`;
  }

  let laterSrc = `src\\assets\\later.jpg`;

  if (getWatchLater() && getWatchLater().includes(id)) {
    laterSrc = `src\\assets\\grey_later.jpg`;
  }

  return (
    <div className="filmCard">
      <img src={img}></img>
      <div className="detailesBox">
        <Link to={`/detailes/${id}`} state={id}>
          <button className="detailes" onClick={handleDeatiles}>
            Подробнее
          </button>
        </Link>
      </div>
      <div className="description">
        <div className="cardHead">
          <p className="raiting">Рейтинг: {raiting}</p>
          <input
            type="image"
            src={favoriteSrc}
            className="favoriteButton"
            onClick={handleFavorite}
          ></input>
          <input
            type="image"
            src={laterSrc}
            className="laterButton"
            onClick={handleLater}
          ></input>
        </div>

        <p className="filmName">{title}</p>
      </div>
    </div>
  );
};
