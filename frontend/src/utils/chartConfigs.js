// Función para calcular el puntaje de Intensidad Digital
export const calculateIntensidadDigitalScore = (categoryAverages) => {
  const categories = ['Capacidades Digitales', 'Experiencia del Cliente', 'Resultados', 'Tecnologías Digitales Emergentes'];
  const filteredAverages = categoryAverages.filter(cat => categories.includes(cat.category.name));
  const total = filteredAverages.reduce((acc, curr) => acc + curr.average, 0);
  return filteredAverages.length > 0 ? total / filteredAverages.length : 0;
};

// Función para calcular el puntaje de Gestión Transformacional
export const calculateGestionTransformacionalScore = (categoryAverages) => {
  const categories = ['Estrategia Digital', 'Cultura Digital', 'Innovación y Colaboración', 'Gobierno Digital'];
  const filteredAverages = categoryAverages.filter(cat => categories.includes(cat.category.name));
  const total = filteredAverages.reduce((acc, curr) => acc + curr.average, 0);
  return filteredAverages.length > 0 ? total / filteredAverages.length : 0;
};

// Flecha derecha del slide
export function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`arrow ${className}`}
      style={{ ...style, display: "flex", width: "40px", height: "40px", justifyContent: "center", alignItems: "center", boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "50%", marginRight: '-2px', backgroundColor: 'white' }}
      onClick={onClick}
    />
  );
}

// Flecha izquierda del slide
export function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`arrow ${className}`}
      style={{ ...style, display: "flex", width: "40px", height: "40px", justifyContent: "center", alignItems: "center", boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "50%", marginLeft: '-2px', backgroundColor: 'white' }}
      onClick={onClick}
    />
  );
}

// Configuración del slider
export const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};