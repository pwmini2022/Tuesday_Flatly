import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginHeader from './components/LoginHeader';
import LoggedHeader from './components/LoggedHeader';
import HomeScreen from './components/HomeScreen';
import FlatScreen from './components/FlatsScreen';
import LoginForm from './components/LoginForm';
import FlatViewScreen from './components/FlatViewScreen';
import BookingsScreen from './components/BookingsScreen';
import BookingItem from './components/BookingItem';
import BookingViewScreen from './components/BookingViewScreen';
import AddFlat from './components/AddFlat';

function App() {
  const [log, setLog] = useState(false);

  return (
    <div>
      <BookingsScreen/>
      <BookingViewScreen/>
      <FlatViewScreen/>
      <FlatScreen/>
      <AddFlat/>
    </div>
  );
}

export default App;