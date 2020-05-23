import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export const DiscardList = ({ cardsArray, deck, setDeck, discard, setDiscard, itemType }) => {

  const [, drop] = useDrop({
    accept: itemType,
    drop(item, monitor) {
      // console.log('dropped item: ', item);
      update(item.index);
    },
  });

  const update = (index) => {
    console.log('discarding');
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

  return (
    <div ref={drop}>
      {(discard.length > 0)
      ? discard.map((cardID, index) => {
          return (<div key={cardID}>{cardsArray[cardID - 1]["union"]} {cardsArray[cardID - 1]["name"]}</div>);
        })
      : 'Drag here'}
    </div>
  );
};
