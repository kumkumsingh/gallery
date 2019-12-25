import React from 'react';
import './App.css';
import * as request from "superagent";
import { url }from './constants'

function App() {
  request
  .get(url)
  .then(photos => {
    console.log("results",photos.body)
  })

  return (
    <div className="App">
      My Gallery
    </div>
  );
}

export default App;
