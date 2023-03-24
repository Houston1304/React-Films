import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { FilmList } from "./components/FilmList";
import { Filter } from "./components/Filter";
import { store } from "./components/Filter";
import { useSelector } from "react-redux";

function App() {
  let filmList = useSelector((state) => state.addFilmArray);
  let filmCount = useSelector((state) => state.currentCount);

  const [list, setList] = useState(filmList);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setList(filmList);
    setCount(filmCount);
  });

  if (count == 1) {
    return (
      <div className="mainBox">
        <Header />

        <div className="mainPage">
          <Filter />
          <FilmList filmList={list} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="mainBox">
        <Header />

        <div className="mainPage">
          <Filter />
          <FilmList filmList={list[count]} />
        </div>
      </div>
    );
  }
}

export default App;
