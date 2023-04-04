import { useLocation, useNavigate } from "react-router-dom";
import { list } from "../arrays/filmArray";
import { Link } from "react-router-dom";
import { useState } from "react";

export const FoundFilm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const array = location.state;

  const [film, setFilm] = useState(array[0]);
  const [number, setNumber] = useState(1);

  function nextFilm() {
    if (!array[number]) {
      alert("Кина не будет");
      return;
    } else {
      setNumber(number + 1);
      setFilm(array[number]);
    }
  }

  return (
    <div className="mainBox">
      <button
        className="backMain"
        onClick={() => {
          navigate(-2);
        }}
      >
        Назад
      </button>
      <div className="foundDetails">
        <img src={film.img}></img>
        <label className="foundTitle">Фильм {film.title}</label>
        <label className="foundLabel">{film.overview}</label>
      </div>
      <div className="foundButtons">
        <Link to={`/detailes/${film.id}`} state={film.id}>
          <button id="foundAccept">Подходит</button>
        </Link>

        <button id="foundNegative" onClick={nextFilm}>
          Не подходит
        </button>
      </div>
    </div>
  );
};
