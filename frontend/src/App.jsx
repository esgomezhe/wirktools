import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Form, Home, CheckResults, LoginRegister, Mentoring } from "./pages/AllPages";
import { AuthProvider } from './contexts/AuthContext';
import Header from "./components/Header";
import NotFound from './components/NotFound';
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/autodiagnostico/' element={<Form />} />
          <Route path='/resultados/' element={<CheckResults />} />
          <Route path='/login/' element={<LoginRegister />} />
          <Route path='/mentorias/' element={<Mentoring />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
        <div id="popup-root"></div> {/* Contenedor para los popups */}
      </>
    </AuthProvider>
  );
}

export default App;