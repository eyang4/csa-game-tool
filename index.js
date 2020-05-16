import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components';

// import * as cardsJSON from '../cards.json';
// const cardsArray = cardsJSON["default"]; // side effect of import
import {cardsArray} from './cardsArray.js';
const cardsHash = {};
const autocompleteSource = [];
for (let i = 0; i < cardsArray.length; i++) {
  cardsHash[cardsArray[i]["name"]] = cardsArray[i]["id"];
  autocompleteSource.push(cardsArray[i]["name"]);
}

ReactDOM.render(
  <App cardsArray={cardsArray} cardsHash={cardsHash} />,
  document.getElementById('app')
);

$('.searchTerm').autocomplete({
  source: autocompleteSource,
  autoFocus: true
});
