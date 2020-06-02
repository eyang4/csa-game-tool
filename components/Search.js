import React, { useEffect, useState } from 'react';

export const Search = ({ id, cardsHash, selectedDeck, setSelectedDeck, autocompleteSource }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    $(`#${id}-search-term`).autocomplete({
      source: autocompleteSource,
      autoFocus: true,
      response: (event, ui) => {
        // console.log('response. event, ui: ', event, ui);
        const term = event.target.defaultValue;
        if (ui.content.length > 0) { // unnecessary to trim when no matches are returned
          let searchResult = ui.content[ui.content.length - 1];
          while (searchResult.value.slice(0, term.length).toLowerCase() !== term.toLowerCase()) {
            ui.content.pop(); // must modify ui.content directly, cannot replace
            searchResult = ui.content[ui.content.length - 1];
          }
        }
      },
      minLength: 0,
      delay: 0,
      select: (event, ui) => {
        event.preventDefault();
        // console.log('selected. id, event, ui: ', id, event, ui);
        // console.log(ui.item.value, cardsHash, cardsHash[ui.item.value]);
        update(ui);
      },
    });
  }, []);

  // useEffect(() => {
  //   console.log('searchTerm: ', searchTerm);
  // }, [searchTerm]);

  const changeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const update = (ui) => {
    if (cardsHash[ui.item.value] !== undefined) {
      setSelectedDeck(
        selectedDeck.concat([ cardsHash[ui.item.value] ])
      ); // do not mutate
    }
    setSearchTerm('');
  }

  const search = (event) => {
    event.preventDefault();
    // console.log('event.target:', event.target[`${id}-search-term`].value);
    const searchTerm = event.target[`${id}-search-term`].value; // autocomplete does not trigger onChange
    // console.log('submitted: ', searchTerm);
    const formatted = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();
    // console.log('cleaned: ', formatted);
    if (cardsHash[formatted] !== undefined) {
      setSelectedDeck(
        selectedDeck.concat([ cardsHash[formatted] ])
      ); // do not mutate
    }
    setSearchTerm('');
  };

  return (
    <form onSubmit={search}>
      <label htmlFor={`${id}-search-term`}>Search: </label>
      <input type='text' className='searchTerm' id={`${id}-search-term`} value={searchTerm} onChange={changeSearchTerm} />
      <input type='submit' />
    </form>
  );
};
