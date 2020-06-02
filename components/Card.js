import React from 'react';
import { useDrag } from 'react-dnd';

export const Card = ({ index, card, itemType, removeCard, setDeck }) => {

  const [, drag] = (!!itemType)
    ? useDrag({
      item: { type: itemType, index },
      // collect: (monitor) => ({ // collector functions bundle up information using monitors
      //   isDragging: monitor.isDragging(), // monitors expose the state of the current drag operation
      // }),
      // begin: (monitor) => console.log('begin drag. monitor: ', monitor),
      // end: (item, monitor) => console.log('end drag. item: ', item, ', monitor: ', monitor),
    })
    : [,];

  return (
    <div className='highlight tooltip'>
      <span ref={drag}>
        {card.union} {card.name}
      </span>
      {(removeCard !== undefined)
      ? <button type='button' onClick={() => {removeCard(index, setDeck)}}>x</button>
      : ''}
      <span className='tooltipText'>
        <p><b>Name:</b> {card.name}</p>
        <p><b>Union:</b> {card.union}</p>
        <p><b>Ability:</b> {card.ability}</p>
        <p><b>Cost:</b> {(Object.keys(card.cost).length > 0)
        ? (Object.keys(card.cost).length === 1)
          ? <span>{Object.entries(card.cost)[0][1]} {Object.entries(card.cost)[0][0]}</span>
          : <ul>
              {Object.entries(card.cost).map((colorCost) => {
                return <li>{colorCost[1]} {colorCost[0]}</li>;
              })}
            </ul>
        : '-'}</p>
        <p><b>Power:</b> {card.power}</p>
        <p><b>Rarity:</b> {card.rarity}</p>
      </span>
    </div>
  );
};
