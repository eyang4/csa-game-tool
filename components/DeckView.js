import React, { useEffect, useState } from 'react';
import { Card } from './Card';

export const DeckView = ({ cardsArray, decks, setDecks, activeDeck }) => {
  const [importVisible, setImportVisible] = useState(false);
  const [exportVisible, setExportVisible] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState(false);

  // useEffect(() => {
  //   console.log('activeDeck: ', activeDeck);
  // }, [activeDeck])

  const removeDeck = (event) => {
    setDecks(decks.slice(0, event.target.getAttribute('index')).concat(decks.slice(event.target.getAttribute('index') + 1)));
  };

  const toggleImport = () => {
    if (exportVisible) setExportVisible(false);
    if (importVisible) setImportVisible(false);
    else setImportVisible(true);
  };

  const toggleExport = () => {
    if (importVisible) setImportVisible(false);
    if (exportVisible) setExportVisible(false);
    else setExportVisible(true);
  };

  const changeImportText = (event) => {
    setImportText(event.target.value);
  };

  const importDecks = (event) => {
    event.preventDefault();
    // console.log('importDecks: ', event, event.target.elements.importTextarea, event.target.elements.importTextarea.value);
    try {
      const importedData = JSON.parse(event.target.elements.importTextarea.value);
      validateImport(importedData);
    } catch (error) {
      setImportError(true);
    }
  };

  const validateImport = (importedData) => {
    if (!Array.isArray(importedData)) return invalidImport();
    for (let i = 0; i < importedData.length; i++) {
      if (!Array.isArray(importedData[i])) return invalidImport();
      if (importedData[i].length > 2) return invalidImport();
      if (typeof importedData[i][0] !== 'string') return invalidImport();
      // if (importedData[i][1].length > 11) return invalidImport();
      for (let j = 1; j < importedData[i][1].length; j++) {
        if (typeof importedData[i][1][j] !== 'number' ||
            importedData[i][1][j] < 1 ||
            importedData[i][1][j] > cardsArray.length) return invalidImport();
      }
    }
    setDecks(importedData);
    setImportText('');
    setImportVisible(false);
  };

  const invalidImport = () => {
    setImportError(true);
    return false;
  };

  const typedArrayToURL = (typedArray, mimeType) => {
    return URL.createObjectURL(new Blob([typedArray], {type: mimeType}));
  };

  return (
    <div>
      Decklist
      <button type='button' onClick={toggleImport}>Import</button>
      <button type='button' onClick={toggleExport}>Export</button>
      {(importVisible)
      ? <div>
          <form onSubmit={importDecks}>
            <p><textarea cols='30' wrap='hard' value={importText} onChange={changeImportText} name='importTextarea'></textarea></p>
            <p><input type='submit' /></p>
          </form>
          <p>- or -</p>
          <p><input type='file' onChange={(event) => {
            const fileList = event.target.files;

            const fileReader = new FileReader();
            fileReader.addEventListener('load', event => {
              validateImport(JSON.parse(fileReader.result));
            });
            fileReader.readAsText(fileList[0]);
          }} /></p>
          {(importError)
          ? <p>There was an import error. Please try again.</p>
          : ''}
        </div>
      : ''}
      {(exportVisible)
      ? <div>
          <p><textarea readOnly cols='30' wrap='hard' value={JSON.stringify(decks)}></textarea></p>
          <p>- or -</p>
          <p>
            {(decks)
              ? <a href={typedArrayToURL(JSON.stringify(decks), 'text/plain')} download='csa-decks'>Download</a>
              : 'Preparing download...'}
          </p>
        </div>
      : ''}
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
                  <Card key={`card-deckview-${cardsArray[cardID - 1].name}`} index={index} card={cardsArray[cardID - 1]} />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
