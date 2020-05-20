import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes'

export const Card = ({ cardID, union, name }) => {

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, cardID },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div ref={drag} className='wrap' key={cardID}>{union} {name}</div>
  );
};
