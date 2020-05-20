// TODO: modularize into components

import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { Card } from './Card';

export const BattleView = (props) => {
  const [activeDeck, setActiveDeck] = useState(-1);
  const [playerDeck, setPlayerDeck] = useState([]);
  const [playerDiscard, setPlayerDiscard] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [opponentDeck, setOpponentDeck] = useState([]);
  const [opponentDiscard, setOpponentDiscard] = useState([]);

  useEffect(() => {
    console.log('activeDeck: ', activeDeck);
    if (activeDeck !== -1) setPlayerDeck(props.decks[activeDeck][1]);
  }, [activeDeck]);

  useEffect(() => {
    console.log('opponentDeck: ', opponentDeck);
  }, [opponentDeck]);

  const selectDeck = (event) => {
    setActiveDeck(event.target.id);
  }

  const changeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const search = (event) => {
    event.preventDefault();
    console.log('event.target:', event.target['search-term'].value);
    const searchTerm = event.target['search-term'].value; // autocomplete does not trigger onChange
    console.log('submitted: ', searchTerm);
    const formatted = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();
    console.log('cleaned: ', formatted);
    if (props.cardsHash[formatted] !== undefined) {
      setOpponentDeck(opponentDeck.concat([props.cardsHash[formatted]])) // do not mutate
    }
    setSearchTerm('');
  };

  const removeCard = (event) => {
    setOpponentDeck(
      opponentDeck
        .slice(0, parseInt(event.target.id))
        .concat(opponentDeck.slice(parseInt(event.target.id) + 1))
      );
  }

  return (
    <div>
      <div className='outline'>
        Select player deck
        {props.decks.map((deck, index) => {
        return (<div key={deck[0]}>
          {deck[0]}
          <button type='button' id={index} onClick={selectDeck}>Select</button>
        </div>)})}
        Selected deck: {(activeDeck !== -1) ? props.decks[activeDeck][0] : ''}
      </div>
      <div className='outline'>
        Add opponent cards
        <form onSubmit={search}>
          <label htmlFor='search-term'>Search: </label>
          <input type='text' className='searchTerm' id='search-term' value={searchTerm} onChange={changeSearchTerm} />
          <input type='submit' />
        </form>
      </div>
      <DndProvider backend={Backend}>
        <div className='outline'>
          <div className='outline'>
            Opponent deck
            {(opponentDeck.length > 0)
            ? opponentDeck.map((cardID, index) => {
                return (<Card cardID={cardID} union={props.cardsArray[cardID - 1]["union"]} name={props.cardsArray[cardID - 1]["name"]} />);
              })
            : ''}
          </div>
          <div className='outline'>
            Opponent discard
            {(opponentDiscard.length > 0)
            ? opponentDiscard.map((cardID, index) => {
                return (<Card cardID={cardID} union={props.cardsArray[cardID - 1]["union"]} name={props.cardsArray[cardID - 1]["name"]} />);
              })
            : ''}
          </div>
        </div>
      </DndProvider>
      <div className='outline'>
        <div className='outline'>
          Player deck
          {(activeDeck !== -1)
          ? playerDeck.map((cardID, index) => {
              return (<div key={cardID}>
                {props.cardsArray[cardID - 1]["union"]} {props.cardsArray[cardID - 1]["name"]}
                </div>);
            })
          : ''}
        </div>
        <div className='outline'>
          Player discard
          {(playerDiscard.length > 0)
          ? playerDiscard.map((cardID, index) => {
              return (<div key={cardID}>
                {props.cardsArray[cardID - 1]["union"]} {props.cardsArray[cardID - 1]["name"]}
                </div>);
            })
          : ''}
        </div>
      </div>
    </div>
  );
};
