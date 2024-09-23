import React from 'react';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import './App.css';

export function App() {

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw />
    </div>
  );
}

export default App;
