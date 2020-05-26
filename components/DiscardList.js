import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export const DiscardList = ({ cardsArray, deck, setDeck, discard, setDiscard, itemType }) => {
  const [lastState, setLastState] = useState([]);

  const [, drop] = useDrop({
    accept: itemType,
    drop(item, monitor) {
      // console.log('dropped item: ', item);
      update(item.index);
    },
  });

  const update = (index) => {
    console.log('discarding');
    setLastState([deck, discard]);
    if (discard.length === 3) {
      const moveToDiscard = deck[index];
      const returnToDeck = discard[0];
      setDiscard(discard.slice(1).concat([moveToDiscard]));
      setDeck([returnToDeck].concat(deck.slice(0,index).concat(deck.slice(index + 1))));
    }
    else {
      setDiscard(discard.concat([deck[index]]));
      setDeck(deck.slice(0,index).concat(deck.slice(index + 1)));
    }
  }

  const undo = (event) => {
    setDeck(lastState[0]);
    setDiscard(lastState[1]);
    setLastState([]);
  }

  return (
    <div ref={drop}>
      {(discard.length > 0)
      ? discard.map((cardID, index) => {
          return (<div key={cardID}>{cardsArray[cardID - 1]["union"]} {cardsArray[cardID - 1]["name"]}</div>);
        })
      : 'Drag here'}
      {(lastState.length > 0)
      ? <div><button type='button' onClick={undo}>Undo</button></div>
      : ''}
    </div>
  );
};
