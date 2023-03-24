import { FilmCard } from "./FilmCard";
import { list } from "../arrays/filmArray";
import { useEffect } from "react";

export const FilmList = ({ filmList }) => {
  return (
    <div className="filmList">
      {filmList.map(({ id, img, title, raiting }) => (
        <FilmCard key={id} img={img} title={title} raiting={raiting}></FilmCard>
      ))}
    </div>
  );
};
