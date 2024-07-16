import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Formulario, NewHome, PreguntasLinea } from "./pages/AllPages";
import Header from "./components/componentes_new_home/HeaderHome";
import NotFound from './components/NotFound';
import Footer from "./components/componentes_new_home/FooterHome";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<NewHome />} />
        <Route path='/autodiagnostico/' element={<Formulario />} />
        <Route path='/lineabase/' element={<PreguntasLinea />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      <div id="popup-root"></div> {/* Contenedor para los popups */}
    </>
  );
}

export default App;