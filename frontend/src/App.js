import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Formulario, NewHome } from "./pages/AllPages";
import Header from "./components/componentes_new_home/HeaderHome"

function App() {
  const location = useLocation();
  const showHeader = ['/', '/formulario'].includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path='/' element={<NewHome />} />
        <Route path='/formulario' element={<Formulario />} />
        <Route path='/new_home' element={<NewHome />} />
      </Routes>
    </>
  );
}

export default App;




