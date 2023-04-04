import { useNavigate } from "react-router-dom";
import { checkFilter } from "../arrays/filterArray";
import { useSelector } from "react-redux";
import {
  store,
  switchGenre,
  switchGrade,
  switchPopularity,
} from "../store/store";
import { list } from "../arrays/filmArray";
import { Link } from "react-router-dom";

const array = [];

function findFilm(filmGenre, findGrade, findPopularity) {
  array.splice(0, array.length);

  let newList = [];
  if (findGrade == "Высокая" && findPopularity == "Популярный") {
    newList = list.filter(
      (film) =>
        film.raiting > 5 && film.popularity > 100 && film.vote_count > 200
    );
  } else if (findGrade == "Низкая" && findPopularity == "Неизвестный") {
    newList = list.filter(
      (film) =>
        film.raiting < 5 && film.popularity < 100 && film.vote_count < 200
    );
  } else if (findGrade == "Высокая" && findPopularity == "Неизвестный") {
    newList = list.filter(
      (film) =>
        film.raiting > 5 && film.popularity < 100 && film.vote_count < 200
    );
  } else if (findGrade == "Низкая" && findPopularity == "Популярный") {
    newList = list.filter(
      (film) =>
        film.raiting < 5 && film.popularity > 100 && film.vote_count > 200
    );
  }

  for (let film of newList) {
    if (film.genre_ids.includes(Number(filmGenre)) && !array.includes(film)) {
      array.push(film);
    }
  }
}

export const Search = () => {
  const navigate = useNavigate();

  const handleSearchButton = () => {
    navigate("/search/film");
  };

  const handleChangeFilter = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");

    store.dispatch(switchGenre(option));
  };

  const handleChangeGrade = (e) => {
    store.dispatch(switchGrade(e.target.value));
  };

  const handleChangePopularity = (e) => {
    store.dispatch(switchPopularity(e.target.value));
  };

  const filmGenre = useSelector((state) => state.currentGenre);
  const filmGrade = useSelector((state) => state.currentGrade);
  const findPopularity = useSelector((state) => state.currentPopularity);

  findFilm(filmGenre, filmGrade, findPopularity);

  return (
    <div className="mainBox">
      <button
        className="backMain"
        onClick={() => {
          navigate(-1);
        }}
      >
        Назад
      </button>
      <label className="searchHead">Поиск фильма по параметрам:</label>
      <form className="searchForm">
        <div className="searchLabel">
          <label className="titleSearch">Выберите жанр</label>
          <label className="titleSearch">Оценка фильма</label>
          <label className="titleSearch">Популярность фильма</label>
        </div>
        <div className="searchSelect">
          <select className="selectOption" onChange={handleChangeFilter}>
            {checkFilter.map(({ id, name }) => (
              <option key={id} id={id}>
                {name}
              </option>
            ))}
          </select>
          <select className="selectOption" onChange={handleChangeGrade}>
            <option>Высокая</option>
            <option>Низкая</option>
          </select>
          <select className="selectOption" onChange={handleChangePopularity}>
            <option>Популярный</option>
            <option>Неизвестный</option>
          </select>
        </div>
      </form>
      <Link to={`/search/film`} state={array}>
        <button className="searchFilm" onClick={handleSearchButton}>
          Подобрать фильм
        </button>
      </Link>
    </div>
  );
};
