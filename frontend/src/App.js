import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HomeWirk, Formulario, Services, Portfolio, Team, Blog, Home, FormularioQ } from "./pages/AllPages";
import Header from "./components/Header";

function App() {
  const location = useLocation();
  const showHeader = ['/', '/formularioQ', '/formulario'].includes(location.pathname);

  return (
    <>
      {/* {showHeader && <Header />} */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/formulario' element={<Formulario />} />
        <Route path='/formularioQ' element={<FormularioQ />} />
        <Route path='/services' element={<Services />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/team' element={<Team />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/about' element={<HomeWirk />} />
      </Routes>
    </>
  );
}

export default App;




