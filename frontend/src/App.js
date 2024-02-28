import "./App.css"
import { Routes, Route } from 'react-router-dom'
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import WhyUsSection from "./components/WhyUsSection";
import FeacturesSection from "./components/FeaturesSection";
// import Formulario from './pages/Formulario';
// import Home from './pages/Home';
// import Services from "./pages/Services";
import { Blog, Formulario, Home, Portfolio, Services, Team, About } from "./pages/AllPages";


function App() {

  return (
    <div>
      <Header />
      <HeroSection />

      <main id="main">
        <ServicesSection />
        <WhyUsSection />
        <FeacturesSection />
      </main>

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
    </div>
  );
}

export default App;
