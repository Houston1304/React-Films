import { useEffect, useState } from "react";
import { list } from "../arrays/filmArray";
import { useSelector, useDispatch } from "react-redux";

import {
  store,
  addNewFilm,
  chengeNumberPage,
  initialState,
} from "../store/store";

export function selectYear() {
  let filmYear = store.getState().currentYear;

  let newList = [];

  for (let film of list)
    newList.push(
      list.filter(
        (film) =>
          String(new Date(String(film.release_date)).getFullYear()) ==
          filmYear.value
      )
    );
  return newList;
}

export function selectGenre(filmGenre) {
  let newList = [];

  for (let film of list) {
    if (film.genre_ids.includes(Number(filmGenre))) newList.push(film);
  }

  return newList;
}

let count = 5;

export const Pagination = () => {
  const [RESULT, setResult] = useState(initialState);

  const [maxPage, setMaxPage] = useState(1);

  const filmYear = useSelector((state) => state.currentYear);
  const filmGenre = useSelector((state) => state.currentGenre);

  useEffect(() => {
    setMaxPage(Math.ceil(list.length / 6) - 2);
    if (filmYear) {
      setResult(selectYear()[0]);
      setMaxPage(Math.ceil(selectYear()[0].length / 6) - 1);
    }
  }, [filmYear]);
  useEffect(() => {
    if (filmGenre) {
      setResult(selectGenre(filmGenre));
      setMaxPage(Math.ceil(selectGenre(filmGenre).length / 6) - 1);
    }
  }, [filmGenre]);

  const defaultPage = 1;

  const page = useSelector((state) => state.pageSwitch.currentPage);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(defaultPage);

  useEffect(() => {
    dispatch(chengeNumberPage(currentPage));
  }, [currentPage]);

  useEffect(() => {
    dispatch(addNewFilm(RESULT));
  }, [RESULT]);

  const pageForward = () => {
    if (page != maxPage) {
      setCurrentPage(page + 1);

      setResult(list.slice((page - 1) * 6, (page - 1) * 6 + 6));
    } else {
      return;
    }
  };

  const pageBack = () => {
    if (page == 1) {
      return;
    } else {
      setCurrentPage(page - 1);

      setResult(list.slice((page - 1) * 6, (page - 1) * 6 + 6));
    }
  };

  return (
    <div>
      <div className="backForward">
        <button className="back" onClick={pageBack}>
          Назад
        </button>
        <button className="forward" onClick={pageForward}>
          Вперед
        </button>
      </div>

      <p>
        {page} of {maxPage}
      </p>
    </div>
  );
};
