import { useNavigate, useLocation } from "react-router-dom";

import { list } from "../arrays/filmArray";

export const Detailes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const film = list.find((film) => film.id == location.state);

  return (
    <div className="mainBox">
      <button
        className="backMain"
        onClick={() => {
          navigate("/");
        }}
      >
        Назад
      </button>
      <div
        className="mainDetailes"
        style={{ backgroundImage: `url(${film.img})` }}
      >
        <div className="blur">
          <div className="blurDetailes">
            <img className="detailesImage" src={film.img}></img>
            <div className="filmLabel">
              <label className="blurLabel" id="mainLabel">
                {film.title}
              </label>
              <label className="blurLabel">Рейтинг {film.raiting}</label>
              <label className="blurLabel">{film.overview}</label>
            </div>
          </div>
        </div>
      </div>
      <div className="detailesDescription">
        <label>Детали</label>
        <div className="allDetailes">
          <div className="detailesLabel">
            <label className="titleDeatiles">Дата выходы</label>
            <label className="titleDeatiles">Язык</label>
            <label className="titleDeatiles">Оригинальное название</label>
          </div>
          <div className="detailesInfo">
            <label className="titleDeatiles">{film.release_date}</label>
            <label className="titleDeatiles">{film.original_language}</label>
            <label className="titleDeatiles">{film.original_title}</label>
          </div>
        </div>
      </div>
    </div>
  );
};
