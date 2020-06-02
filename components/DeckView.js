import React, { useEffect } from 'react';

export const DeckView = ({ cardsArray, decks, setDecks, activeDeck }) => {

  useEffect(() => {
    console.log(activeDeck);
  }, [activeDeck])

  const removeDeck = (event) => {
    setDecks(decks.slice(0, event.target.getAttribute('index')).concat(decks.slice(event.target.getAttribute('index') + 1)));
  }

  return (
    <div>
      Decklist
      {decks.map((deck, index) => {
        return (
          <div key={`deckView-${deck[0]}-${index}`}>
            <div>
              {deck[0]}
              {(index !== activeDeck)
              ? <button type='button' index={index} onClick={removeDeck}>x</button>
              : ''}
            </div>
            <div>
              {deck[1].map((cardID, index) => {
                return (
                  <div key={index}>
                    {cardsArray[cardID - 1]["union"]} {cardsArray[cardID - 1]["name"]}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
