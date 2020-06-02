import React, { useEffect, useState } from 'react';

export const Search = ({ id, cardsHash, selectedDeck, setSelectedDeck, autocompleteSource }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [autocompleteTerm, setAutocompleteTerm] = useState('');

  useEffect(() => {
    $(`#${id}-search-term`).autocomplete({
      source: autocompleteSource,
      autoFocus: true,
      response: (event, ui) => {
        // console.log('response. event, ui: ', event, ui);
        const term = event.target.defaultValue.toLowerCase();
        if (ui.content.length > 0) { // unnecessary to trim when no matches are returned
          for (let i = ui.content.length - 1; i >= 0; i--) {
            if (term !== ui.content[i].value.slice(0, term.length).toLowerCase()) {
              ui.content.splice(i, 1);
            }
          }
        }
      },
      minLength: 0,
      delay: 0,
      select: (event, ui) => {
        event.preventDefault();
        // console.log('selected. id, event, ui: ', id, event, ui);
        // console.log(ui.item.value, cardsHash, cardsHash[ui.item.value]);
        setAutocompleteTerm(ui.item.value);
        // selectedDeck from props does not keep in sync
        // likely due to being set at time of select function definition
      },
    });
  }, []);

  // useEffect(() => {
  //   console.log('searchTerm: ', searchTerm);
  // }, [searchTerm]);

  // useEffect(() => {
  //   console.log('selectedDeck, useEffect: ', selectedDeck);
  // }, [selectedDeck]);

  useEffect(() => {
    update(autocompleteTerm);
  }, [autocompleteTerm]);

  const changeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const update = (autocompleteTerm) => {
    // console.log('selectedDeck, update: ', getSelectedDeck());
    if (cardsHash[autocompleteTerm] !== undefined) {
      setSelectedDeck(
        selectedDeck.concat([ cardsHash[autocompleteTerm] ])
      ); // do not mutate
    }
    setSearchTerm('');
  }

  // const getSelectedDeck = () => {
  //   return selectedDeck;
  // }

  const search = (event) => {
    // console.log('selectedDeck, search: ', getSelectedDeck());
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
