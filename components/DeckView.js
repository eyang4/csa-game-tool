import React, { useEffect, useState } from 'react';

export const DeckView = (props) => {

  return (
    <div className='outline'>
      {props.decks.map((deck, index) => {
      return (<div key={deck[0]}>
        <div>
          {deck[0]}
          {/* <button type='button' id={index} onClick={removeDeck}>x</button> */}
        </div>
        <div>
          {deck[1].map((cardID, index) => {
            return (<div>
              {props.cardsArray[cardID - 1]["union"]} {props.cardsArray[cardID - 1]["name"]}
              </div>);
          })}
        </div>
      </div>)})}
    </div>
  );
};
