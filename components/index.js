import React, { useEffect, useState } from 'react';
import { BuildDeck } from './BuildDeck';
import { DeckView } from './DeckView';
import { BattleView } from './BattleView';

export const App = () => {
  const [cardsArray, setCardsArray] = useState([]);
  const [cardsHash, setCardsHash] = useState([]);
  const [autocompleteSource, setAutocompleteSource] = useState([]);
  const [decks, setDecks] = useState([]);
  const [activeDeck, setActiveDeck] = useState(-1);

  // useEffect(() => {
  //   console.log('decks: ', decks);
  // }, [decks]);

  useEffect(() => {
    const cardsHash = {};
    const autocompleteSource = [];
    for (let i = 0; i < cardsArray.length; i++) {
      cardsHash[cardsArray[i]["name"]] = cardsArray[i]["id"];
      autocompleteSource.push(cardsArray[i]["name"]);
    }
    setCardsHash(cardsHash);
    setAutocompleteSource(autocompleteSource);

    console.log('cardsArray: ', cardsArray);
    console.log('cardsHash: ', cardsHash);
  }, [cardsArray]);

  return (
    <div>
      {(cardsArray.length === 0)
      ? <input type='file' onChange={(event) => {
          const fileList = event.target.files;
          // console.log('fileList: ', fileList);

          const fileReader = new FileReader();
          fileReader.addEventListener('load', event => {
            // console.log('fileReader loaded: ', event.target.result, ', parsed: ', JSON.parse(fileReader.result));
            setCardsArray(JSON.parse(fileReader.result));
          });
          fileReader.readAsText(fileList[0]);
        }} />
      : (Object.entries(cardsHash).length > 0 && autocompleteSource.length > 0)
        ? <div id='main'>
            <BuildDeck cardsArray={cardsArray} cardsHash={cardsHash} decks={decks} setDecks={setDecks} autocompleteSource={autocompleteSource} />
            <DeckView cardsArray={cardsArray} decks={decks} activeDeck={activeDeck} setDecks={setDecks} />
            <BattleView cardsArray={cardsArray} cardsHash={cardsHash} decks={decks} activeDeck={activeDeck} setActiveDeck={setActiveDeck} autocompleteSource={autocompleteSource} />
          </div>
        : 'Processing JSON...'}
    </div>
  );
};
