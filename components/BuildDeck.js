import React, { useEffect, useState } from 'react';
import { Search } from './Search';

export const BuildDeck = ({ cardsArray, cardsHash, decks, setDecks }) => {
  const [deckName, setDeckName] = useState('');
  const [currentDeck, setCurrentDeck] = useState([]);

  // useEffect(() => {
  //   console.log('cardsArray: ', cardsArray);
  //   console.log('cardsHash: ', cardsHash);
  // }, []);

  // useEffect(() => {
  //   console.log('deckName: ', deckName);
  // }, [deckName]);

  // useEffect(() => {
  //   console.log('currentDeck: ', currentDeck);
  // }, [currentDeck]);

  const changeDeckName = (event) => {
    setDeckName(event.target.value);
  };

  const saveDeck = (event) => {
    event.preventDefault();
    // console.log('currentDeck: ', currentDeck);
    // if (currentDeck.length === 9 || currentDeck.length === 10) {
      setDecks(
        decks.concat([ [deckName, currentDeck] ])
      );
      setDeckName('');
      setCurrentDeck([]);
    // }
  }

  const removeCard = (event) => {
    setCurrentDeck(
      currentDeck
        .slice(0, parseInt(event.target.id))
        .concat(currentDeck.slice(parseInt(event.target.id) + 1))
    );
  }

  return (
    <div className='outline'>
      <Search cardsArray={cardsArray} cardsHash={cardsHash} decks={decks} setDecks={setDecks} getter={currentDeck} setter={setCurrentDeck} />
      <form onSubmit={saveDeck}>
        <label htmlFor='deck-name'>Deck Name: </label>
        <input type='text' id='deck-name' value={deckName} onChange={changeDeckName} />
        <input type='submit' />
      </form>
      <div>Card count: {currentDeck.length}</div>
      {currentDeck.map((cardID, index) => {
        return (
          <div key={cardID}>
            {cardsArray[cardID - 1]["union"]} {cardsArray[cardID - 1]["name"]}
            <button type='button' id={index} onClick={removeCard}>x</button>
          </div>
        );
      })}
    </div>
  );
};
