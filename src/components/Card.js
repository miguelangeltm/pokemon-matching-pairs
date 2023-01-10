import React, { useState } from "react";
import "./card.css";

const Card = ({ image, id, value, onClickHandler, isMatched, disabled }) => {
  const [flipFlag, setFlipFlag] = useState(true);

  const flipHandler = () => {
    if (!disabled) {
      onClickHandler(id, value, isMatched);
      setFlipFlag(!flipFlag);
      if (!isMatched) {
        setTimeout(() => {
          setFlipFlag((prevState) => {
            setFlipFlag(!prevState);
          });
        }, 1000);
      }
    }
  };

  return (
    <div className="scene">
      <div className={`card ${flipFlag && !isMatched && "is-flipped"}`}>
        <div className="card__face card__face--front">
          <img className="pokemon" src={image} alt="PokemonSprite"></img>
        </div>
        <div className="card__face card__face--back" onClick={flipHandler}>
          <div className="backcover" />
        </div>
      </div>
    </div>
  );
};

export default Card;
