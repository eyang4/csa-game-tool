import React, { useEffect, useState } from 'react';

export const BattleView = (props) => {
  const [activeDeck, setActiveDeck] = useState(-1);
  const [playerDeck, setPlayerDeck] = useState([]);
  const [playerDiscard, setPlayerDiscard] = useState([]);

  useEffect(() => {
    console.log('activeDeck: ', activeDeck);
    if (activeDeck !== -1) setPlayerDeck(props.decks[activeDeck][1]);
  }, [activeDeck]);

  const selectDeck = (event) => {
    setActiveDeck(event.target.id);
  }

  return (
    <div>
      <div className='outline'>
        Select player deck
        {props.decks.map((deck, index) => {
        return (<div key={deck[0]}>
          {deck[0]}
          <button type='button' id={index} onClick={selectDeck}>Select</button>
        </div>)})}
        Selected deck: {(activeDeck !== -1) ? props.decks[activeDeck][0] : ''}
      </div>
      <div className='outline'>
        Add opponent cards
      </div>
      <div className='outline'>
        <span className='outline'>
          Opponent deck
        </span>
        <span className='outline'>
          Opponent discard
        </span>
      </div>
      <div className='outline'>
        <span className='outline'>
          Player deck
          {(activeDeck !== -1)
          ? playerDeck.map((cardID, index) => {
              return (<div>
                {props.cardsArray[cardID - 1]["union"]} {props.cardsArray[cardID - 1]["name"]}
                </div>);
            })
          : ''}
        </span>
        <span className='outline'>
          Player discard
          {(playerDiscard.length > 0)
          ? playerDiscard.map((cardID, index) => {
              return (<div>
                {props.cardsArray[cardID - 1]["union"]} {props.cardsArray[cardID - 1]["name"]}
                </div>);
            })
          : ''}
        </span>
      </div>
    </div>
  );
};
