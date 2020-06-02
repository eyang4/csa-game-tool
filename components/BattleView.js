import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import ItemTypes from './ItemTypes';
import { Search } from './Search';
import { Card } from './Card';
import { DiscardList } from './DiscardList';

export const BattleView = ({ cardsArray, cardsHash, decks, activeDeck, setActiveDeck, autocompleteSource }) => {
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
    setActiveDeck(parseInt(event.target.getAttribute('index')));
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
      <div>
        Select player deck
        {decks.map((deck, index) => {
          return (<div key={`battleDeck-${deck[0]}-${index}`}>
            {deck[0]}
            <button type='button' index={index} onClick={selectDeck}>Select</button>
          </div>);
        })}
        <br />
        Selected deck: {(activeDeck !== -1) ? decks[activeDeck][0] : ''}
      </div>
      <div>
        Add opponent cards
        <Search id='addOpponentCards' cardsHash={cardsHash} selectedDeck={opponentDeck} setSelectedDeck={setOpponentDeck} autocompleteSource={autocompleteSource} />
      </div>
      <DndProvider backend={Backend}>
        <div>
          <div>
            Opponent deck
            {(opponentDeck.length > 0)
            ? opponentDeck.map((cardID, index) => {
                return (<Card key={`card-${ItemTypes.OPPONENTCARD}-${cardsArray[cardID - 1].name}`} index={index} card={cardsArray[cardID - 1]} itemType={ItemTypes.OPPONENTCARD} removeCard={removeCard} setDeck={setOpponentDeck} />);
              })
            : ''}
          </div>
          <div>
            Opponent discard
            <DiscardList cardsArray={cardsArray} deck={opponentDeck} setDeck={setOpponentDeck} discard={opponentDiscard} setDiscard={setOpponentDiscard} itemType={ItemTypes.OPPONENTCARD} />
          </div>
        </div>
      </DndProvider>

      <DndProvider backend={Backend}>
        <div>
          <div>
            Player deck
            {(activeDeck !== -1)
            ? playerDeck.map((cardID, index) => {
                return (<Card key={`card-${ItemTypes.PLAYERCARD}-${cardsArray[cardID - 1].name}`} index={index} card={cardsArray[cardID - 1]} itemType={ItemTypes.PLAYERCARD} setDeck={setOpponentDeck} />);
              })
            : ''}
          </div>
          <div>
            Player discard
            <DiscardList cardsArray={cardsArray} deck={playerDeck} setDeck={setPlayerDeck} discard={playerDiscard} setDiscard={setPlayerDiscard} itemType={ItemTypes.PLAYERCARD} />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};
