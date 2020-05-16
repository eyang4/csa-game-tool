import React, { useEffect, useState } from 'react';
import {BuildDeck} from './BuildDeck';
import {DeckView} from './DeckView';
import {BattleView} from './BattleView';

export const App = (props) => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    console.log('decks: ', decks);
  }, [decks]);

  return (
    <div>
      <BuildDeck cardsArray={props.cardsArray} cardsHash={props.cardsHash} decks={decks} setDecks={setDecks} />
      <DeckView cardsArray={props.cardsArray} cardsHash={props.cardsHash} decks={decks} setDecks={setDecks} />
      <BattleView cardsArray={props.cardsArray} cardsHash={props.cardsHash} decks={decks} setDecks={setDecks} />
    </div>
  );
};
