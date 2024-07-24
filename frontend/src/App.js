import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Formulario, Home, PreguntasLinea } from "./pages/AllPages";
import Header from "./components/home/HeaderHome";
import NotFound from './components/NotFound';
import Footer from "./components/home/FooterHome";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
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