import React, { useEffect, useState } from 'react';
import { BuildDeck } from './BuildDeck';
import { DeckView } from './DeckView';
import { BattleView } from './BattleView';

export const App = () => {
  const [cardsArray, setCardsArray] = useState([]);
  const [cardsHash, setCardsHash] = useState([]);
  const [decks, setDecks] = useState([]);

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

    $('.searchTerm').autocomplete({
      source: autocompleteSource,
      autoFocus: true,
      response: (event, ui) => {
        // console.log('response. event, ui: ', event, ui);
        const term = event.target.defaultValue;
        let searchResult = ui.content[ui.content.length - 1];
        while (searchResult.value.slice(0, term.length).toLowerCase() !== term.toLowerCase()) {
          ui.content.pop(); // must modify ui.content directly, cannot replace
          searchResult = ui.content[ui.content.length - 1];
        }
      },
      minLength: 0,
      delay: 0,
    });

    console.log('cardsArray: ', cardsArray);
    console.log('cardsHash: ', cardsHash);
  }, [cardsArray]);

  const autocompleteSelected = () => {};

  return (
    <div>
      {(cardsArray.length === 0)
      ? <input type='file' id='file-selector' onChange={(event) => {
          const fileList = event.target.files;
          // console.log('fileList: ', fileList);

          const fileReader = new FileReader();
          fileReader.addEventListener('load', event => {
            // console.log('fileReader loaded: ', event.target.result, ', parsed: ', JSON.parse(fileReader.result));
            setCardsArray(JSON.parse(fileReader.result));
          });
          fileReader.readAsText(fileList[0]);
        }} />
      : <div>
          <BuildDeck cardsArray={cardsArray} cardsHash={cardsHash} decks={decks} setDecks={setDecks} />
          <DeckView cardsArray={cardsArray} cardsHash={cardsHash} decks={decks} setDecks={setDecks} />
          <BattleView cardsArray={cardsArray} cardsHash={cardsHash} decks={decks} setDecks={setDecks} />
        </div>}
    </div>
  );
};
