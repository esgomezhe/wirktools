import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Formulario, Home, NewHome } from "./pages/AllPages";
import Header from "./components/components_home/Header"

function App() {
  const location = useLocation();
  const showHeader = ['/', '/formulario'].includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/formulario' element={<Formulario />} />
        <Route path='/newhome' element={<NewHome />} />
      </Routes>
    </>
  );
}

export default App;




