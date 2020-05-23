import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';

export const DiscardList = ({ cardsArray, opponentDiscard, discard }) => {

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop(item, monitor) {
      console.log('dropped item: ', item);
      discard(item.index);
    },
  });

  return (
    <div ref={drop}>
      {(opponentDiscard.length > 0)
      ? opponentDiscard.map((cardID, index) => {
          return (<div>{cardsArray[cardID - 1]["union"]} {cardsArray[cardID - 1]["name"]}</div>);
        })
      : 'Drag here'}
    </div>
  );
};
