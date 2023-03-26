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
  let filmYear = useSelector((state) => state.currentYear);

  const [newList, setList] = useState(filmList);
  const [count, setCount] = useState(1);
  const [filter, setFilter] = useState("");
  const [year, setYear] = useState("");

  function filterFilms() {
    if (filmYear) {
      setList(
        list.filter(
          (film) =>
            String(new Date(String(film.release_date)).getFullYear()) ==
            filmYear.value
        )
      );
    }

    if (count == 1) {
      switch (filmFilter.value) {
        case "Популярные по возрастанию":
          initialState.sort((a, b) => b.popularity - a.popularity);
          break;
      }
      switch (filmFilter.value) {
        case "Популярные по убыванию":
          initialState.sort((a, b) => a.popularity - b.popularity);
          break;
      }
      switch (filmFilter.value) {
        case "Рейтинг по возрастанию":
          initialState.sort((a, b) => b.raiting - a.raiting);
          break;
      }
      switch (filmFilter.value) {
        case "Рейтинг по убыванию":
          initialState.sort((a, b) => a.raiting - b.raiting);
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
    setYear(filmYear);
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
          <FilmList filmList={initialState} />
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
