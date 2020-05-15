import React from 'react';
import {BuildDeck} from './BuildDeck';

export const App = (props) => {
  return (
    <BuildDeck className='outline' cardsArray={props.cardsArray} cardsHash={props.cardsHash} />
  );
};
