import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Formulario, Home } from "./pages/AllPages";

function App() {
  const location = useLocation();
  const showHeader = ['/', '/formulario'].includes(location.pathname);

  return (
    <>
      {/* {showHeader && <Header />} */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/formulario' element={<Formulario />} />
      </Routes>
    </>
  );
}

export default App;




