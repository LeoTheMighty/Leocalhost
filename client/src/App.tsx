import React, { useEffect, useState } from 'react';
import logo from './logo.svg';

import './App.css';

function App() {
  const [buttons, setButtons] = useState<JSX.Element[]>([]);

  useEffect(() => {
    fetch('./pallets').then((r) => r.text()).then((text) => {
      const pallets = text.split(',');
      const b = [];
      for (let i = 0; i < pallets.length; i++) {
        b.push(
          <button onClick={() => fetch(`upload?param=${pallets[i]}`)}>
            { pallets[i] }
          </button>
        );
      }
      setButtons(b);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'flex' }}>
        { buttons }
        </div>
      </header>
    </div>
  );
}

export default App;
