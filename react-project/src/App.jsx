import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { FilmList } from "./components/FilmList";
import { Filter } from "./components/Filter";
import { optionFilter } from "./components/Filter";
import { list } from "./arrays/filmArray";
import { useSelector } from "react-redux";
import { initialState } from "./store/store";

function App() {
  let filmList = useSelector((state) => state.addFilmArray);
  let filmCount = useSelector((state) => state.currentCount);
  let filmFilter = useSelector((state) => state.currentFilter);

  const [newList, setList] = useState(filmList);
  const [count, setCount] = useState(1);
  const [filter, setFilter] = useState("");

  function filterFilms() {
    if (count == 1) {
      switch (filmFilter.value) {
        case "Популярные по возрастанию":
          newList.sort((a, b) => b.popularity - a.popularity);
          break;
      }
      switch (filmFilter.value) {
        case "Популярные по убыванию":
          newList.sort((a, b) => a.popularity - b.popularity);
          break;
      }
      switch (filmFilter.value) {
        case "Рейтинг по возрастанию":
          newList.sort((a, b) => b.raiting - a.raiting);
          break;
      }
      switch (filmFilter.value) {
        case "Рейтинг по убыванию":
          newList.sort((a, b) => a.raiting - b.raiting);
          break;
      }
      return newList;
    } else {
      switch (filmFilter.value) {
        case "Популярные по возрастанию":
          newList[count].sort((a, b) => b.popularity - a.popularity);
          break;
      }
      switch (filmFilter.value) {
        case "Популярные по убыванию":
          newList[count].sort((a, b) => a.popularity - b.popularity);
          break;
      }
      switch (filmFilter.value) {
        case "Рейтинг по возрастанию":
          newList[count].sort((a, b) => b.raiting - a.raiting);
          break;
      }
      switch (filmFilter.value) {
        case "Рейтинг по убыванию":
          newList[count].sort((a, b) => a.raiting - b.raiting);
          break;
      }
      return newList[count];
    }
  }

  useEffect(() => {
    setList(filmList);
    setCount(filmCount);

    setFilter(filmFilter);
  });

  useEffect(() => {
    filterFilms();
  });

  if (count == 1) {
    return (
      <div className="mainBox">
        <Header />

        <div className="mainPage">
          <Filter />
          <FilmList filmList={newList.slice(0, 6)} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="mainBox">
        <Header />

        <div className="mainPage">
          <Filter />
          <FilmList filmList={newList[count]} />
        </div>
      </div>
    );
  }
}

export default App;
