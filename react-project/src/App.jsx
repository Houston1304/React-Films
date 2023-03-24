import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { FilmList } from "./components/FilmList";
import { Filter } from "./components/Filter";
import { store } from "./components/Filter";

function App() {
  let filmList = [];

  filmList = store.getState().addFilmArray;
  useEffect(() => {
    filmList = store.getState().addFilmArray;
  });

  if (filmList.length < 7) {
    return (
      <div className="mainBox">
        <Header />

        <div className="mainPage">
          <Filter />
          <FilmList filmList={filmList} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="mainBox">
        <Header />

        <div className="mainPage">
          <Filter />
          <FilmList filmList={filmList[store.getState().currentCount]} />
        </div>
      </div>
    );
  }
}

export default App;
