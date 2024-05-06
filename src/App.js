import './scss/app.scss';

import Header from './components/header';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Notfound from './Pages/Notfound';

import { Routes, Route } from 'react-router-dom';

//import pizzaArray from './assets/pizza.json';
import React from 'react';

export const SearchContext = React.createContext('');

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  // console.log(searchValue);
  return (
    <div className="App">
      <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />

          <div className="content">
            {/* <Home /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  );
}

export default App;
