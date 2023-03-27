import { useEffect, useState } from "react";
import Select from "react-select";
import { checkFilter } from "../arrays/filterArray";
import { list } from "../arrays/filmArray";
import { useSelector } from "react-redux";
import {
  store,
  addNewFilm,
  addCount,
  switchFilter,
  switchYear,
  switchGenre,
} from "../store/store";

export const optionFilter = [
  { value: "Популярные по возрастанию", label: "Популярные по возрастанию" },
  { value: "Популярные по убыванию", label: "Популярные по убыванию" },
  { value: "Рейтинг по возрастанию", label: "Рейтинг по возрастанию" },
  { value: "Рейтинг по убыванию", label: "Рейтинг по убыванию" },
];

const year = [];

for (let x = 2016; x < 2021; x++) {
  year.push({ value: x, label: x });
}

let pageNumber = 1;
let count = 5;

function selectYear() {
  let filmYear = store.getState().currentYear;

  let newList = [];

  newList.push(
    list.filter(
      (film) =>
        String(new Date(String(film.release_date)).getFullYear()) ==
        filmYear.value
    )
  );
  return newList;
}

function selectGenre(filmGenre) {
  let newList = [];

  for (let film of list) {
    if (film.genre_ids.includes(Number(filmGenre))) newList.push(film);
  }

  return newList;
}

const Pagination = () => {
  let RESULT = [];
  const [maxPage, setMaxPage] = useState(1);

  let filmYear = useSelector((state) => state.currentYear);
  let filmGenre = useSelector((state) => state.currentGenre);

  useEffect(() => {
    if (!filmYear && !filmGenre) {
      for (let i = 0; i < list.length; i++) {
        RESULT.push(list[i]);
      }
      setMaxPage(Math.ceil(RESULT.length / 6) - 2);
    }

    if (filmYear) {
      for (let i = 0; i < selectYear()[0].length; i++) {
        RESULT.push(selectYear()[0][i]);
        setMaxPage(Math.ceil(RESULT.length / 6) - 1);
      }
    }
    if (filmGenre) {
      for (let i = 0; i < selectGenre(filmGenre).length; i++) {
        RESULT.push(selectGenre(filmGenre)[i]);
        setMaxPage(Math.ceil(RESULT.length / 6) - 1);
      }
    }
  });

  const pageForward = () => {
    let start = 6;
    let finish = 12;
    if (pageNumber == maxPage) {
      return;
    } else {
      pageNumber = pageNumber + 1;

      count = count + 1;

      finish = (pageNumber + 1) * 6;
      start = finish - 6;

      const result = RESULT.slice(start, finish);

      store.dispatch(addNewFilm(result));
      store.dispatch(addCount(count));
    }
  };

  const pageBack = () => {
    let start = 6;
    let finish = 12;
    if (pageNumber == 2) {
      pageNumber = 1;

      finish = 6;
      start = finish - 6;

      const result = RESULT.slice(0, 6);

      store.dispatch(addCount(1));
      store.dispatch(addNewFilm(result));
      return;
    } else if (pageNumber == 1) {
      return;
    } else {
      pageNumber = pageNumber - 1;
      count = count - 1;

      finish = (pageNumber - 1) * 6;
      start = finish - 6;

      const result = RESULT.slice(start, finish);

      store.dispatch(addNewFilm(result));
      store.dispatch(addCount(count));
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

const Check = ({ name, id }) => {
  const handleCheck = (e) => {
    store.dispatch(switchGenre(e.target.id));
  };
  useEffect(() => {
    selectGenre();
  });
  return (
    <div>
      <input type="checkbox" onChange={handleCheck} id={id}></input>
      <span>{name}</span>
    </div>
  );
};

export const Filter = () => {
  const handleChangeFilter = (selectedItem) => {
    store.dispatch(switchFilter(selectedItem));
  };

  const handleYear = (selectedItem) => {
    store.dispatch(switchYear(selectedItem));
  };

  useEffect(() => {
    selectYear();
  });

  return (
    <div className="mainFilter">
      <div>
        <p className="filterHead">Фильтры:</p>
        <button className="reset">Сбросить все филтры</button>
      </div>

      <div className="optionBox">
        <Select
          onChange={handleChangeFilter}
          className="select"
          options={optionFilter}
          placeholder={<div>Популярные по возрастанию</div>}
        />

        <Select
          onChange={handleYear}
          className="select"
          options={year}
          placeholder={<div>Выберите год</div>}
        ></Select>
      </div>

      <div className="checkBox">
        {checkFilter.map(({ id, name }) => (
          <Check type="checkbox" key={id} id={id} name={name} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};
