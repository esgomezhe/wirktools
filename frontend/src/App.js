import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HomeWirk, FormularioMicro, FormularioUnidades, Services, Portfolio, Team, Blog, Home } from "./pages/AllPages";
import Header from "./components/Header";

function App() {
  const location = useLocation();
  const showHeader = ['/', '/formulario'].includes(location.pathname);

  return (
    <>
      {/* {showHeader && <Header />} */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/formularioMicro' element={<FormularioMicro />} />
        <Route path='/formularioUnidades' element={<FormularioUnidades />} />
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




