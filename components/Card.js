import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';

export const Card = ({ cardID, index, union, name, card, itemType, removeCard, setDeck }) => {

  const [{ isDragging }, drag] = useDrag({
    item: { type: itemType, index },
    collect: (monitor) => ({ // collector functions bundle up information using monitors
      isDragging: monitor.isDragging(), // monitors expose the state of the current drag operation
    }),
    // begin: (monitor) => console.log('begin drag. monitor: ', monitor),
    // end: (item, monitor) => console.log('end drag. item: ', item, ', monitor: ', monitor),
  });

  return (
    <div ref={drag} className='wrap tooltip' key={cardID}>
      {union} {name}
      {(removeCard !== undefined)
      ? <button type='button' index={index} onClick={() => {removeCard(index, setDeck)}}>x</button>
      : ''}
      <span className='tooltipText'>
        <b>Name:</b> {card.name}<br />
        <b>Union:</b> {card.union}<br />
        <b>Cost:</b> {(Object.keys(card.cost).length > 0)
        ? Object.entries(card.cost).map((colorCost) => {
            return colorCost[0] + colorCost[1];
          })
        : 'none'}<br />
        <b>Ability:</b> {card.ability}<br />
        <b>Power:</b> {card.power}<br />
        <b>Rarity:</b> {card.rarity}<br />
      </span>
    </div>
  );
};
