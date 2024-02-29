import "./App.css"
import { Routes, Route } from 'react-router-dom'
// import Formulario from './pages/Formulario';
// import Home from './pages/Home';
// import Services from "./pages/Services";
import { Blog, Home, Formulario, Portfolio, Services, Team, About } from "./pages/AllPages";
import Header from "./components/Header";


function App() {

  return (

    <>
      <Header />
      {/* Renderiza el componente del navbar al dar clic */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/formulario' element={<Formulario />} />
        <Route path='/services' element={<Services />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/team' element={<Team />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </>
  );
}

export default App;


