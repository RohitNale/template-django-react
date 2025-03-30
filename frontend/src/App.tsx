import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

interface Item {
  id: number;
  name: string;
  description: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const backendUrl = 'http://127.0.0.1:8000/api/items/'; // Backend API endpoint

  useEffect(() => {
    fetch(backendUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + TypeScript</h1>
      <h2>Items from Django Backend:</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;