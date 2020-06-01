import React, { useEffect, useState } from 'react';
import { Search } from './Search';
import { Card } from './Card';

export const BuildDeck = ({ cardsArray, cardsHash, decks, setDecks }) => {
  const [deckName, setDeckName] = useState('');
  const [currentDeck, setCurrentDeck] = useState([]);

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

  const removeCard = (index, setDeck) => {
    setDeck(
      currentDeck
        .slice(0, index)
        .concat(currentDeck.slice(index + 1))
    );
  }

  return (
    <div>
      <Search id='addPlayerCards' cardsHash={cardsHash} selectedDeck={currentDeck} setSelectedDeck={setCurrentDeck} />
      <form onSubmit={saveDeck}>
        <label htmlFor='deck-name'>Deck Name: </label>
        <input type='text' id='deck-name' value={deckName} onChange={changeDeckName} />
        <input type='submit' />
      </form>
      <div>Card count: {currentDeck.length}</div>
      {currentDeck.map((cardID, index) => {
        return (
          <Card key={`card-builder-${cardsArray[cardID - 1].name}`} index={index} card={cardsArray[cardID - 1]} removeCard={removeCard} setDeck={setCurrentDeck} />
        );
      })}
    </div>
  );
};
