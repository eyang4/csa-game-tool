import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';

export const Card = ({ cardID, index, union, name }) => {

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, index },
    collect: (monitor) => ({ // collector functions bundle up information using monitors
      isDragging: monitor.isDragging(), // monitors expose the state of the current drag operation
    }),
    begin: (monitor) => console.log('begin drag. monitor: ', monitor),
    end: (item, monitor) => console.log('end drag. item: ', item, ', monitor: ', monitor),
  });

  return (
    <div ref={drag} className='wrap' key={cardID}>{union} {name}</div>
  );
};
