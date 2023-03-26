import { useEffect, useState } from "react";
import Select from "react-select";
import { checkFilter } from "../arrays/filterArray";
import { list } from "../arrays/filmArray";
import {
  store,
  addNewFilm,
  addCount,
  switchFilter,
  initialState,
  switchYear,
} from "../store/store";

export const optionFilter = [
  { value: "Популярные по возрастанию", label: "Популярные по возрастанию" },
  { value: "Популярные по убыванию", label: "Популярные по убыванию" },
  { value: "Рейтинг по возрастанию", label: "Рейтинг по возрастанию" },
  { value: "Рейтинг по убыванию", label: "Рейтинг по убыванию" },
];

const year = [];

for (let x = 2010; x < 2024; x++) {
  year.push({ value: x, label: x });
}

const RESULT = [];

for (let i = 0; i < list.length; i++) {
  RESULT.push(list[i]);
}
let pageNumber = 1;
let count = 5;

const Pagination = () => {
  const maxPage = Math.ceil(list.length / 6);

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
      console.log(result);
      store.dispatch(addNewFilm(result));
      store.dispatch(addCount(count));
      console.log(count);
    }
  };

  const pageBack = () => {
    let start = 6;
    let finish = 12;
    if (pageNumber == 2) {
      pageNumber = 1;

      finish = 6;
      start = finish - 6;

      store.dispatch(addCount(1));

      return;
    } else if (pageNumber == 1) {
      return;
    } else {
      pageNumber = pageNumber - 1;
      count = count - 1;
      console.log(count);
      finish = (pageNumber - 1) * 6;
      start = finish - 6;

      const result = RESULT.slice(start, finish);
      store.dispatch(addNewFilm(result));
      store.dispatch(addCount(count));
      console.log(count);
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
  const handleChangeFilter = (selectedItem) => {
    store.dispatch(switchFilter(selectedItem));
  };

  const handleYear = (selectedItem) => {
    store.dispatch(switchYear(selectedItem));
  };
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
          <Check key={id} name={name} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};
