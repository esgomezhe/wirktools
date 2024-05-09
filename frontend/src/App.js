import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Formulario, NewHome } from "./pages/AllPages";
import Header from "./components/componentes_new_home/HeaderHome"

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<NewHome />} />
        <Route path='/autodiagnostico/' element={<Formulario />} />
      </Routes>
    </>
  );
}

export default App;




