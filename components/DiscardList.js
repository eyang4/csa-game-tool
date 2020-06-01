import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';

export const DiscardList = ({ cardsArray, deck, setDeck, discard, setDiscard, itemType }) => {
  const [lastState, setLastState] = useState([]);
  const [currentState, setCurrentState] = useState([]);

  const equals = (arr1, arr2) => {
    const arr1Exists = !!arr1;
    const arr2Exists = !!arr2;
    if ((arr1Exists || arr2Exists) && !(arr1Exists && arr2Exists)) return false;
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  useEffect(() => {
    setCurrentState([deck, discard]);
  }, []);

  useEffect(() => {
    // console.log('deck: ', deck, 'currentState[0]: ', currentState[0], 'discard: ', discard, 'currentState[1]: ', currentState[1]);
    if (!equals(deck, currentState[0])) {
      setLastState([]); // disable undo if deck changes outside of DiscardList
      setCurrentState([deck, discard]);
    }
  }, [deck]);

  const [, drop] = useDrop({
    accept: itemType,
    drop(item, monitor) {
      // console.log('dropped item: ', item);
      update(item.index);
    },
  });

  const update = (index) => {
    // console.log('discarding');
    setLastState([deck, discard]);
    if (discard.length === 3) {
      const moveToDiscard = deck[index];
      const returnToDeck = discard[0];
      setCurrentState([[returnToDeck].concat(deck.slice(0,index).concat(deck.slice(index + 1))), discard.slice(1).concat([moveToDiscard])]);
      setDiscard(discard.slice(1).concat([moveToDiscard]));
      setDeck([returnToDeck].concat(deck.slice(0,index).concat(deck.slice(index + 1))));
    }
    else {
      setCurrentState([deck.slice(0,index).concat(deck.slice(index + 1)), discard.concat([deck[index]])]);
      setDiscard(discard.concat([deck[index]]));
      setDeck(deck.slice(0,index).concat(deck.slice(index + 1)));
    }
  };

  const undo = (event) => {
    setDeck(lastState[0]);
    setDiscard(lastState[1]);
    setCurrentState(lastState);
    setLastState([]);
  };

  return (
    <div ref={drop}>
      {(discard.length > 0)
      ? discard.map((cardID, index) => {
          return (<div key={`discard-${itemType}-${cardID}`}>{cardsArray[cardID - 1]["union"]} {cardsArray[cardID - 1]["name"]}</div>);
        })
      : 'Drag here'}
      {(lastState.length > 0)
      ? <div><button type='button' onClick={undo}>Undo</button></div>
      : ''}
    </div>
  );
};
