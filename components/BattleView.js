import React, { useEffect, useState } from 'react';
import { Search } from './Search';

import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import ItemTypes from './ItemTypes';
import { Card } from './Card';
import { DiscardList } from './DiscardList';

export const BattleView = ({ cardsArray, cardsHash, decks, setDecks }) => {
  const [activeDeck, setActiveDeck] = useState(-1);
  const [playerDeck, setPlayerDeck] = useState([]);
  const [playerDiscard, setPlayerDiscard] = useState([]);
  const [opponentDeck, setOpponentDeck] = useState([]);
  const [opponentDiscard, setOpponentDiscard] = useState([]);

  useEffect(() => {
    // console.log('activeDeck: ', activeDeck);
    if (activeDeck !== -1) setPlayerDeck(decks[activeDeck][1]);
  }, [activeDeck]);

  // useEffect(() => {
  //   console.log('playerDeck: ', playerDeck);
  // }, [playerDeck]);

  // useEffect(() => {
  //   console.log('playerDiscard: ', playerDiscard);
  // }, [playerDiscard]);

  // useEffect(() => {
  //   console.log('opponentDeck: ', opponentDeck);
  // }, [opponentDeck]);

  // useEffect(() => {
  //   console.log('opponentDiscard: ', opponentDiscard);
  // }, [opponentDiscard]);

  const selectDeck = (event) => {
    setActiveDeck(event.target.id);
  }

  const removeCard = (index, setDeck) => {
    setDeck(
      opponentDeck
        .slice(0, index)
        .concat(opponentDeck.slice(parseInt(index) + 1))
      );
  }

  return (
    <div>
      <div className='outline'>
        Select player deck
        {decks.map((deck, index) => {
          return (<div key={deck[0]}>
            {deck[0]}
            <button type='button' id={index} onClick={selectDeck}>Select</button>
          </div>);
        })}
        <br />
        Selected deck: {(activeDeck !== -1) ? decks[activeDeck][0] : ''}
      </div>
      <div className='outline'>
        Add opponent cards
        <Search cardsArray={cardsArray} cardsHash={cardsHash} decks={decks} setDecks={setDecks} getter={opponentDeck} setter={setOpponentDeck} />
      </div>
      <DndProvider backend={Backend}>
        <div className='outline'>
          <div className='outline'>
            Opponent deck
            {(opponentDeck.length > 0)
            ? opponentDeck.map((cardID, index) => {
                return (<Card key={cardID} cardID={cardID} index={index} union={cardsArray[cardID - 1]["union"]} name={cardsArray[cardID - 1]["name"]} itemType={ItemTypes.OPPONENTCARD} removeCard={removeCard} setDeck={setOpponentDeck} />);
              })
            : ''}
          </div>
          <div className='outline'>
            Opponent discard
            <DiscardList cardsArray={cardsArray} deck={opponentDeck} setDeck={setOpponentDeck} discard={opponentDiscard} setDiscard={setOpponentDiscard} itemType={ItemTypes.OPPONENTCARD} />
          </div>
        </div>
      </DndProvider>

      <DndProvider backend={Backend}>
        <div className='outline'>
          <div className='outline'>
            Player deck
            {(activeDeck !== -1)
            ? playerDeck.map((cardID, index) => {
                return (<Card key={cardID} cardID={cardID} index={index} union={cardsArray[cardID - 1]["union"]} name={cardsArray[cardID - 1]["name"]} itemType={ItemTypes.PLAYERCARD} />
                );
              })
            : ''}
          </div>
          <div className='outline'>
            Player discard
            <DiscardList cardsArray={cardsArray} deck={playerDeck} setDeck={setPlayerDeck} discard={playerDiscard} setDiscard={setPlayerDiscard} itemType={ItemTypes.PLAYERCARD} />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};
