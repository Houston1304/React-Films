import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { FilmList } from "./components/FilmList";
import { Filter } from "./components/Filter";
import { initialState, store, togglePopUp } from "./store/store";
import {
  getCurrentUser,
  saveFavoriteFilm,
  getFavoriteFilm,
  saveWatchLater,
  getWatchLater,
} from "./storage/storage";
import { useSelector } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
import { Detailes } from "./components/Deatiles";
import { Search } from "./components/Search";
import { FoundFilm } from "./components/FoundFilm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/detailes/:id",
    element: <Detailes />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/search/film",
    element: <FoundFilm />,
  },
]);

function App() {
  const filmFilter = useSelector((state) => state.currentFilter);

  const filmList = useSelector((state) => state.addFilmArray.film);

  const [newList, setList] = useState(initialState);

  const [filter, setFilter] = useState("");

  const [favoriteList, setFavorite] = useState(getFavoriteFilm() || []);
  const [letList, setLater] = useState(getWatchLater() || []);

  const favorite = (isOpen, id) => {
    if (!getCurrentUser()) {
      isOpen = true;

      store.dispatch(togglePopUp(isOpen));
    } else if (getFavoriteFilm().includes(id)) {
      saveFavoriteFilm(favoriteList.includes(!id));
    } else {
      setFavorite([...favoriteList, id]);
      saveFavoriteFilm(JSON.stringify([...favoriteList, id]));
    }
  };

  const later = (isOpen, id) => {
    if (!getCurrentUser()) {
      isOpen = true;

      store.dispatch(togglePopUp(isOpen));
    } else if (getWatchLater().includes(id)) {
      saveWatchLater(letList.includes(!id));
    } else {
      setLater([...letList, id]);
      saveWatchLater([...letList, id]);
    }
  };

  function filterFilms() {
    switch (filmFilter.value) {
      case "Популярные по возрастанию":
        filmList.sort((a, b) => b.popularity - a.popularity);
        break;
    }
    switch (filmFilter.value) {
      case "Популярные по убыванию":
        filmList.sort((a, b) => a.popularity - b.popularity);
        break;
    }
    switch (filmFilter.value) {
      case "Рейтинг по возрастанию":
        filmList.sort((a, b) => b.raiting - a.raiting);
        break;
    }
    switch (filmFilter.value) {
      case "Рейтинг по убыванию":
        filmList.sort((a, b) => a.raiting - b.raiting);
        break;
    }
    return filmList;
  }

  useEffect(() => {
    setList(filmList);

    setFilter(filmFilter);
  });

  useEffect(() => {
    filterFilms();
  });

  return (
    <div className="mainBox">
      <Header />

      <div className="mainPage">
        <Filter />
        <FilmList favorite={favorite} later={later} filmList={newList} />
      </div>
    </div>
  );
}

export default App;
