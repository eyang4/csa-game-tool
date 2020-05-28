import React from 'react';
import { useDrag } from 'react-dnd';

export const Card = ({ index, card, itemType, removeCard, setDeck }) => {

  const [, drag] = useDrag({
    item: { type: itemType, index },
    // collect: (monitor) => ({ // collector functions bundle up information using monitors
    //   isDragging: monitor.isDragging(), // monitors expose the state of the current drag operation
    // }),
    // begin: (monitor) => console.log('begin drag. monitor: ', monitor),
    // end: (item, monitor) => console.log('end drag. item: ', item, ', monitor: ', monitor),
  });

  return (
    <div ref={drag} className='highlight tooltip'>
      {card.union} {card.name}
      {(removeCard !== undefined)
      ? <button type='button' onClick={() => {removeCard(index, setDeck)}}>x</button>
      : ''}
      <span className='tooltipText'>
        <b>Name:</b> {card.name}
        <br /><b>Union:</b> {card.union}
        <br /><b>Cost:</b> {(Object.keys(card.cost).length > 0)
        ? (Object.keys(card.cost).length === 1)
          ? <span>{Object.entries(card.cost)[0][1]} {Object.entries(card.cost)[0][0]}<br /></span>
          : <ul>
              {Object.entries(card.cost).map((colorCost) => {
                return <li>{colorCost[1]} {colorCost[0]}</li>;
              })}
            </ul>
        : '-'}
        <b>Ability:</b> {card.ability}
        <br /><b>Power:</b> {card.power}
        <br /><b>Rarity:</b> {card.rarity}
      </span>
    </div>
  );
};
