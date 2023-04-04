import { useEffect } from "react";
import Select from "react-select";
import { checkFilter } from "../arrays/filterArray";
import { selectGenre, selectYear } from "./Pagination";
import { Pagination } from "./Pagination";
import { store, switchFilter, switchYear, switchGenre } from "../store/store";

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
