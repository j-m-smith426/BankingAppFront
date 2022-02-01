import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './screens/Login/Login';
import { useSelector } from 'react-redux';
import { IStoreState } from './redux/Store';
import Navigation from './Navigation/Navigation';

function App()
{
  const path = useSelector((state: IStoreState) => state.redirect.redirectTo) 


  return (
    <div className="App">
      <Navigation />
      
    </div>
  );
}

export default App;
