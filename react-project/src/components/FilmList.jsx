import { FilmCard } from "./FilmCard";
import { Link } from "react-router-dom";

export const FilmList = ({ filmList, favorite, later }) => {
  return (
    <div className="filmList">
      {filmList.map(({ id, img, title, raiting }) => (
        <FilmCard
          key={id}
          id={id}
          img={img}
          title={title}
          raiting={raiting}
          favorite={favorite}
          later={later}
        ></FilmCard>
      ))}
    </div>
  );
};
