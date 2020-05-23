import React, { useEffect, useState } from 'react';
import { Search } from './Search';

export const BuildDeck = ({ cardsArray, cardsHash, decks, setDecks }) => {
  // const [searchTerm, setSearchTerm] = useState('');
  const [deckName, setDeckName] = useState('');
  const [currentDeck, setCurrentDeck] = useState([]);

  // useEffect(() => {
  //   console.log('cardsArray: ', cardsArray);
  //   console.log('cardsHash: ', cardsHash);
  // }, []);

  // useEffect(() => {
  //   console.log('searchTerm: ', searchTerm);
  // }, [searchTerm]);

  // useEffect(() => {
  //   console.log('deckName: ', deckName);
  // }, [deckName]);

  // useEffect(() => {
  //   console.log('currentDeck: ', currentDeck);
  // }, [currentDeck]);

  // const changeSearchTerm = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  const changeDeckName = (event) => {
    setDeckName(event.target.value);
  };

  // const search = (event) => {
  //   event.preventDefault();
  //   // console.log('event.target:', event.target['search-term'].value);
  //   const searchTerm = event.target['search-term'].value; // autocomplete does not trigger onChange
  //   // console.log('submitted: ', searchTerm);
  //   const formatted = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();
  //   // console.log('cleaned: ', formatted);
  //   if (cardsHash[formatted] !== undefined) {
  //     setCurrentDeck(
  //       currentDeck.concat([ cardsHash[formatted] ])
  //     ); // do not mutate
  //   }
  //   setSearchTerm('');
  // };

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
      {/* <form onSubmit={search}>
        <label htmlFor='search-term'>Search: </label>
        <input type='text' className='searchTerm' id='search-term' value={searchTerm} onChange={changeSearchTerm} />
        <input type='submit' />
      </form> */}
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
        )
      })}
    </div>
  );
};
