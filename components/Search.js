import React, { useEffect, useState } from 'react';

export const Search = ({ id, cardsHash, selectedDeck, setSelectedDeck }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    $(`#${id}-search-term`).on('autocompleteselect', (event, ui) => {
      event.preventDefault();
      // console.log('selected. id, event, ui: ', id, event, ui);
      // console.log(ui.item.value, cardsHash, cardsHash[ui.item.value]);
      if (cardsHash[ui.item.value] !== undefined) {
        setSelectedDeck(
          selectedDeck.concat([ cardsHash[ui.item.value] ])
        ); // do not mutate
        console.log('lag?');
      }
      setSearchTerm('');
    });
  }, [cardsHash, selectedDeck]); // cardsHash is initialized as an empty object and selectedDeck values change

  // useEffect(() => {
  //   console.log('searchTerm: ', searchTerm);
  // }, [searchTerm]);

  const changeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

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
