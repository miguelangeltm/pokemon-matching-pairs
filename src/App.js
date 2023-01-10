import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import CardContainer from "./components/CardContainer";

function App() {
  const [Sprites, setSprites] = useState([]);
  const [mistakes, setMistake] = useState(0);
  const [card1, setCard1] = useState(null);
  const [card2, setCard2] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //fetch Pokemons from pokeapis
  useEffect(() => {
    fetchPokemons();
    // eslint-disable-next-line
  }, []);

  //Compare the cards when card 1 and card 2 has value
  useEffect(() => {
    if (card1 && card2) {
      setDisabled(true);
      // console.log(card1);
      // console.log(card2);
      if (card1.id === card2.id) {
        console.log("its a Match");
        setSprites((prevSprites) => {
          return prevSprites.map((sprite) => {
            if (sprite.id === card1.id) {
              return { ...sprite, match: true };
            } else {
              return sprite;
            }
          });
        });
        endCompare();
      } else {
        console.log("it's not match");
        setTimeout(()=> endCompare(), 1000) 
      }
    }
    // eslint-disable-next-line
  }, [card1, card2]);

  function randomArray(number) {
    let RArray = [];
    while (RArray.length < number) {
      let RandomNumber = Math.ceil(Math.random() * number);
      let exist = false;
      for (let i = 0; i < RArray.length; i++) {
        if (RArray[i] === RandomNumber) {
          exist = true;
          break;
        }
      }
      if (!exist) {
        RArray[RArray.length] = RandomNumber;
      }
    }
    //console.log(RArray);
    return RArray;
  }

  function shuffleSprites(array) {
    let shuffleLength = array.length * 2;
    let pointerForShuffle = randomArray(shuffleLength);
    let shuffleCards = [];
    for (let i = 0; i < array.length; i++) {
      let pointer1 = pointerForShuffle[i];
      shuffleCards[pointer1] = array[i];
    }

    for (let k = array.length; k < shuffleLength; k++) {
      let pointer2 = pointerForShuffle[k];
      shuffleCards[pointer2] = array[k - array.length];
    }
    return shuffleCards;
  }

  async function fetchPokemons() {
    const pokeArray = await fetch("https://pokeapi.co/api/v2/pokemon?limit=60");
    const pokedata = await pokeArray.json();
    let urlsPokemon = pokedata.results.map((a) => a.url); //object with only Pokemon's URLs
    let pokemonSprites = []; // Array that will stored the Sprites Urls

    let myRandomArray = randomArray(60);
    for (let i = 0; i <= 11; i++) {
      let pointer = myRandomArray[i];
      const pokemonQuery = await fetch(urlsPokemon[pointer]);
      const pokemon = await pokemonQuery.json();
      pokemonSprites.push({
        id: i,
        sprite: pokemon.sprites.other.dream_world.front_default,
        match: false,
      });
    }
    let ShuffledSprites = shuffleSprites(pokemonSprites);
    //console.log(ShuffledSprites);
    setSprites(ShuffledSprites);
    setCard1(null);
    setCard2(null);
    setMistake(0);
  }

  const compareCards = (id, value) => {
    card1
      ? setCard2({ value: +value, id: +id })
      : setCard1({ value: +value, id: +id });
  };

  const endCompare = () => {
    setCard1(null);
    setCard2(null);
    setMistake((prevState) => prevState + 1);
    setDisabled(false);
  };

  return (
    <div>
      <p>
        A Pokemon Memory Game using React and PokéApi (
        <a href="https://pokeapi.co/">pokeapi.co</a>) Author: Miguel Angel
        Torres
      </p>
      <h1>Pokemon Gotta Catch ‘Em All!</h1>

      <h2>Attemps: {mistakes}</h2>

      <button onClick={fetchPokemons}>Reset Game</button>

      <CardContainer>
        {Sprites.map((pokemon, index) => (
          <Card
            key={index}
            value={index}
            image={pokemon.sprite}
            id={pokemon.id}
            isMatched={pokemon.match}
            onClickHandler={compareCards}
            disabled={disabled}
          />
        ))}
      </CardContainer>
    </div>
  );
}

export default App;
