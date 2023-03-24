import { useEffect, useState } from "react";
import Select from "react-select";
import { checkFilter } from "../arrays/filterArray";
import { list } from "../arrays/filmArray";
import { combineReducers, createStore } from "redux";

const optionFilter = [
  { value: "Популярные по возрастанию", label: "Популярные по возрастанию" },
  { value: "Популярные по убыванию", label: "Популярные по убыванию" },
  { value: "Рейтинг по возрастанию", label: "Рейтинг по возрастанию" },
  { value: "Рейтинг по убыванию", label: "Рейтинг по убыванию" },
];

const ADD_FILM = "ADD_FILM";
const ADD_COUNT = "ADD_COUNT";

function addNewFilm(film) {
  return {
    type: ADD_FILM,
    film,
  };
}

function addCount(count) {
  return {
    type: ADD_COUNT,
    count,
  };
}

export const initialState = list.slice(0, 6);

export function addFilmArray(state = initialState, action) {
  if (action.type === ADD_FILM) {
    const newState = [...state];
    newState.push(action.film);
    return newState;
  }

  return state;
}

function currentCount(state = 1, action) {
  switch (action.type) {
    case ADD_COUNT:
      return action.count;
    default:
      return state;
  }
}

const filmAction = combineReducers({
  addFilmArray,
  currentCount,
});

export const store = createStore(filmAction);

const year = [];

for (let x = 2010; x < 2024; x++) {
  year.push({ value: x, label: x });
}

const RESULT = [];

for (let i = 0; i < list.length; i++) {
  RESULT.push(list[i]);
}

const Pagination = () => {
  const [pageNumber, setPage] = useState(1);

  const maxPage = Math.ceil(list.length / 6);

  const [start, setStart] = useState(7);
  const [finish, setFinish] = useState(13);
  const [count, setCount] = useState(6);

  const pageForward = (e) => {
    e.preventDefault();
    if (pageNumber == maxPage) {
      return;
    } else {
      setPage(pageNumber + 1);
      setCount(count + 1);

      setStart((start) => start + 6);
      setFinish((finish) => finish + 6);
      console.log(start);
      console.log(finish);

      const result = RESULT.slice(start, finish);

      store.dispatch(addNewFilm(result));
      store.dispatch(addCount(count));
    }
  };

  const pageBack = (e) => {
    e.preventDefault();
    if (pageNumber > 2) {
      setPage(pageNumber - 1);
      setCount(count - 1);

      setStart((start) => start - 6);
      setFinish((finish) => finish - 6);
      console.log(start);
      console.log(finish);

      const result = RESULT.slice(start, finish);

      store.dispatch(addNewFilm(result));
      store.dispatch(addCount(count));
    } else {
      setPage(1);
      setStart((start) => start - 6);
      setFinish((finish) => finish - 6);
      store.dispatch(addNewFilm(RESULT.slice(0, 6)));
      store.dispatch(addCount(1));
      return;
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
        {pageNumber} of {maxPage}
      </p>
    </div>
  );
};

const Check = ({ name }) => {
  return (
    <div>
      <input type="checkbox" />
      <span>{name}</span>
    </div>
  );
};

export const Filter = () => {
  return (
    <div className="mainFilter">
      <div>
        <p className="filterHead">Фильтры:</p>
        <button className="reset">Сбросить все филтры</button>
      </div>

      <div className="optionBox">
        <Select
          className="select"
          options={optionFilter}
          placeholder={<div>Популярные по возрастанию</div>}
        />
        <Select
          className="select"
          options={year}
          placeholder={<div>Выберите год</div>}
        ></Select>
      </div>

      <div className="checkBox">
        {checkFilter.map(({ id, name }) => (
          <Check key={id} name={name} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};
