import React, { useEffect, useState } from 'react';

export const Search = ({ cardsArray, cardsHash, decks, setDecks, getter, setter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => {
  //   console.log('searchTerm: ', searchTerm);
  // }, [searchTerm]);

  const changeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const search = (event) => {
    event.preventDefault();
    // console.log('event.target:', event.target['search-term'].value);
    const searchTerm = event.target['search-term'].value; // autocomplete does not trigger onChange
    // console.log('submitted: ', searchTerm);
    const formatted = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();
    // console.log('cleaned: ', formatted);
    if (cardsHash[formatted] !== undefined) {
      setter(
        getter.concat([ cardsHash[formatted] ])
      ); // do not mutate
    }
    setSearchTerm('');
  };

  return (
    <form onSubmit={search}>
      <label htmlFor='search-term'>Search: </label>
      <input type='text' className='searchTerm' id='search-term' value={searchTerm} onChange={changeSearchTerm} />
      <input type='submit' />
    </form>
  );
};
