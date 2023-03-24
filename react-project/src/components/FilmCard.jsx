export const FilmCard = ({ img, title, raiting }) => {
  return (
    <div className="filmCard">
      <img src={img}></img>
      <div className="detailesBox">
        <button className="detailes">Подробнее</button>
      </div>
      <div className="description">
        <div className="cardHead">
          <p className="raiting">Рейтинг: {raiting}</p>
          <input
            type="image"
            src="src\assets\favorite.png"
            className="favoriteButton"
          ></input>
          <input
            type="image"
            src="src\assets\later.jpg"
            className="laterButton"
          ></input>
        </div>

        <p className="filmName">{title}</p>
      </div>
    </div>
  );
};
