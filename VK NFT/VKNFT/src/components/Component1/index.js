import React from 'react';
import ReactDOM from 'react-dom';
import CreateNFT from './components/CreateNFT';
import DisplayNFT from './components/DisplayNFT';

ReactDOM.render(
  <React.StrictMode>
    <CreateNFT />
    <DisplayNFT />
  </React.StrictMode>,
  document.getElementById('root')
);
