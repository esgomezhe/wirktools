import React, { useState, useEffect, useContext } from 'react';
import { checkDocument, submitForm } from '../../utils/apiServices';
import { useNavigate } from 'react-router-dom';
import '../../stylesheets/lineabase.css';
import figure from '../../img/svg/formulario_figure.svg';
import home from '../../img/svg/home.svg';
import arrow from '../../img/svg/arrow.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function LineaBase() {
  const { user } = useContext(AuthContext);
  const [isDocumentVerified, setIsDocumentVerified] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    estadoEmpresa: '',
    ventas2023: '',
    ventasDigitales: '',
    porcentajeVentasDigitales: '',
    empleados: {
      mujeres: {
        nomina: '',
        temporales: '',
        servicios: '',
        practicantes: '',
        voluntarios: ''
      },
      hombres: {
        nomina: '',
        temporales: '',
        servicios: '',
        practicantes: '',
        voluntarios: ''
      }
    },
    barrerasTD: [],
    indicadores: [
      { nombre: '', antes: '', despues: '' },
      { nombre: '', antes: '', despues: '' },
      { nombre: '', antes: '', despues: '' }
    ],
    otroHito: '',
    mencionarHito: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user && user.document) {
          const response = await checkDocument(user.document);
          console.log(response);
          if (response.exists) {
            setUserData({ ...response.data, id: response.id, createdAt: response.data.created_at });
            setIsDocumentVerified(true);
            setErrors({});
          } else {
            setErrors({ document: 'No has realizado el autodiagnóstico.' });
          }
        } else {
          setErrors({ document: 'Usuario no autenticado.' });
        }
      } catch (error) {
        setErrors({ document: 'Error al verificar el documento.' });
      }
    };

    fetchUserData();
  }, [user]);

  const validateField = (name, value) => {
    let tempErrors = { ...errors };

    switch (name) {
      case 'ventas2023':
      case 'indicadores.0.antes':
      case 'indicadores.0.despues':
      case 'indicadores.1.antes':
      case 'indicadores.1.despues':
      case 'indicadores.2.antes':
      case 'indicadores.2.despues':
        tempErrors[name] = /^[0-9]*$/.test(value) ? '' : 'Solo se permiten caracteres numéricos';
        break;
      default:
        tempErrors[name] = value ? '' : 'Este campo es obligatorio';
        break;
    }

    setErrors(tempErrors);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    validateField(name, type === 'checkbox' ? checked : value);

    if (name.startsWith('empleados')) {
      const [, gender, field] = name.split('.');
      setFormData(prevFormData => ({
        ...prevFormData,
        empleados: {
          ...prevFormData.empleados,
          [gender]: {
            ...prevFormData.empleados[gender],
            [field]: value
          }
        }
      }));
    } else if (name.startsWith('indicadores')) {
      const [, index, field] = name.split('.');
      const newIndicators = formData.indicadores.map((ind, idx) =>
        idx === parseInt(index) ? { ...ind, [field]: value } : ind
      );
      setFormData(prevFormData => ({
        ...prevFormData,
        indicadores: newIndicators
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};

    Object.keys(formData).forEach(key => {
      if (typeof formData[key] === 'object') {
        Object.keys(formData[key]).forEach(subKey => {
          if (typeof formData[key][subKey] === 'object') {
            Object.keys(formData[key][subKey]).forEach(subSubKey => {
              if (!formData[key][subKey][subSubKey]) {
                tempErrors[`${key}.${subKey}.${subSubKey}`] = 'Este campo es obligatorio';
              }
            });
          } else if (!formData[key][subKey]) {
            tempErrors[`${key}.${subKey}`] = 'Este campo es obligatorio';
          }
        });
      } else if (!formData[key] && key !== 'porcentajeVentasDigitales' && key !== 'mencionarHito') {
        tempErrors[key] = 'Este campo es obligatorio';
      }
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const completedFormData = {
        ...userData,  // Incluye la info existente
        lineaBase: formData,  // Incluye los datos de línea base
        created_at: userData.createdAt // Incluye la fecha del formulario anterior
      };

      await submitForm(userData.info.company_type, userData.info.full_name, userData.info.email, completedFormData);

      console.log('Form submitted successfully');
      setFormSubmitted(true); // Setea el estado para mostrar el mensaje de agradecimiento

    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Error submitting form' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAutodiagnosticoClick = () => {
    navigate('/autodiagnostico/');
  };

  return (
    <div className="lineabase">
      <div className="notice__container">
        <div className="figure">
          <img src={figure} alt="figure" width={205} />
        </div>
        <div className="notice__options">
          <Link to={'/'}><img src={home} alt="home" /> </Link>
          <img src={arrow} alt="arrow" />
          <p className='notice__options--text'>Formulario de línea base</p>
        </div>
        <div className="notice__title--container">
          <h4 className='notice__title'>
            {isDocumentVerified && userData ? `Bienvenido, ${userData.info?.full_name || 'Usuario'}!` : 'Cargando...'}
          </h4>
        </div>
      </div>

      {errors.document ? (
        <div className="error-container">
          <p className="error-message">{errors.document}</p>
          <button type="button" className="autodiagnostico-button" onClick={handleAutodiagnosticoClick}>
            Realizar Autodiagnóstico
          </button>
        </div>
      ) : !isDocumentVerified ? (
        <p>Cargando...</p>
      ) : !formSubmitted ? (
        <div className="form-container">
          <form onSubmit={handleSubmit} noValidate className='wirk__form'>
          <form onSubmit={handleSubmit} noValidate className='wirk__form'>
              <div className="options__information--container">
                <h5 className='options__information--title'>Seguimiento Ruta - Transformación Digital</h5>

                <div className="options__information--fields">
                  <div className="column preguntas-column">
                    <div className="options__information--label">
                      <label htmlFor="estadoEmpresa" className="form-label">
                        ¿Cuál de las siguientes frases se ajusta al estado actual en que se encuentra su empresa?* {errors.estadoEmpresa && <span className="error-message">{errors.estadoEmpresa}</span>}
                      </label>
                      <select
                        id="estadoEmpresa"
                        name="estadoEmpresa"
                        required
                        className="form-select"
                        value={formData.estadoEmpresa}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Seleccione una opción</option>
                        <option value="idea_negocio">Tengo una idea de negocio</option>
                        <option value="negocio_necesidades_basicas">Tengo un negocio que me permite obtener los ingresos diarios mínimos para pagar mis necesidades básicas. Sin embargo mis ingresos varían mucho en el día a día.</option>
                        <option value="negocio_enfocado_clientes_actuales">Tengo un negocio enfocado en atender a mis clientes actuales, busco reducir mis costos y mis clientes me conocen principalmente por medio de redes sociales y el voz a voz.</option>
                        <option value="empresa_establecida">Tengo una empresa establecida y bien conocida en el mercado en el que operamos. Nos enfocamos en mantener una posición sólida y financiera estable. Gestionamos eficientemente nuestros recursos y tenemos una reputación consolidada en la industria.</option>
                        <option value="empresa_crecimiento_rapido">Tengo una empresa que aunque ya está establecida sigue creciendo rápidamente en el mercado. Nos destacamos por invertir en innovación y adaptarnos ágilmente a las nuevas tendencias del mercado.</option>
                      </select>
                    </div>

                    <div className="options__information--label">
                      <label htmlFor="ventas2023" className="form-label">
                        ¿Cuál es el valor de las ventas de la empresa en los siguientes periodos? Ventas al cierre del año 2023* {errors.ventas2023 && <span className="error-message">{errors.ventas2023}</span>}
                      </label>
                      <input
                        type="text"
                        id="ventas2023"
                        name="ventas2023"
                        placeholder="Ingrese el valor de las ventas"
                        required
                        className="form-input"
                        value={formData.ventas2023}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="options__information--label">
                      <label htmlFor="ventasDigitales" className="form-label">
                        ¿Realiza ventas por medio de canales digitales?* {errors.ventasDigitales && <span className="error-message">{errors.ventasDigitales}</span>}
                      </label>
                      <select
                        id="ventasDigitales"
                        name="ventasDigitales"
                        required
                        className="form-select"
                        value={formData.ventasDigitales}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Seleccione una opción</option>
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    {formData.ventasDigitales === 'true' && (
                      <div className="options__information--label">
                        <label htmlFor="porcentajeVentasDigitales" className="form-label">
                          ¿Qué porcentaje de las ventas de la empresa en el año 2023 fue por canales digitales?* {errors.porcentajeVentasDigitales && <span className="error-message">{errors.porcentajeVentasDigitales}</span>}
                        </label>
                        <select
                          id="porcentajeVentasDigitales"
                          name="porcentajeVentasDigitales"
                          required={formData.ventasDigitales === 'true'}
                          className="form-select"
                          value={formData.porcentajeVentasDigitales}
                          onChange={handleChange}
                        >
                          <option value="" disabled>Seleccione un rango porcentual</option>
                          <option value="0-10%">0-10%</option>
                          <option value="11-20%">11-20%</option>
                          <option value="21-30%">21-30%</option>
                          <option value="31-40%">31-40%</option>
                          <option value="41-50%">41-50%</option>
                          <option value="51-60%">51-60%</option>
                          <option value="61-70%">61-70%</option>
                          <option value="71-80%">71-80%</option>
                          <option value="81-90%">81-90%</option>
                          <option value="91-100%">91-100%</option>
                        </select>
                      </div>
                    )}

                    <div className="options__information--label">
                      <label className="form-label">
                        Barreras para acceso a Transformación Digital* {errors.barrerasTD && <span className="error-message">{errors.barrerasTD}</span>}
                      </label>
                      {[
                        'Falta de acceso a financiación: para invertir en tecnología necesaria para la transformación digital.',
                        'Capacidades digitales insuficientes: Falta de habilidades tecnológicas y conocimientos digitales entre los empleados y la dirección.',
                        'Resistencia cultural al cambio: Dificultad para adoptar nuevas tecnologías debido a la resistencia al cambio por parte de los propietarios y trabajadores que prefieren métodos tradicionales.',
                        'Falta de visión estratégica: Carencia de una estrategia clara de transformación digital por parte de la dirección.',
                        'Soporte técnico y de mantenimiento: dificultad en el acceso a servicios de mantenimiento y soporte técnico para nuevas tecnologías.'
                      ].map((barrera, idx) => (
                        <div key={idx} className="form-check">
                          <input
                            type="checkbox"
                            id={`barrera-${idx}`}
                            name="barrerasTD"
                            value={barrera}
                            checked={formData.barrerasTD.includes(barrera)}
                            onChange={(e) => {
                              const newBarrerasTD = formData.barrerasTD.includes(barrera)
                                ? formData.barrerasTD.filter(b => b !== barrera)
                                : [...formData.barrerasTD, barrera];
                              setFormData(prevFormData => ({
                                ...prevFormData,
                                barrerasTD: newBarrerasTD
                              }));
                              setErrors(prevErrors => ({
                                ...prevErrors,
                                barrerasTD: newBarrerasTD.length === 0 ? 'Este campo es obligatorio' : ''
                              }));
                            }}
                            className="form-check-input"
                            required
                          />
                          <label htmlFor={`barrera-${idx}`} className="form-check-label">
                            {barrera}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="column respuestas-column">
                    <div className="options__information--label">
                      <label className="form-label">
                        Incluyéndose a usted, por favor indique cuántos empleados (número) tiene actualmente en las siguientes categorías de empleo por sexo:
                      </label>
                      <div className="empleados-container">
                        <div className="empleados-column">
                          <h6>Mujeres</h6>
                          {['nomina', 'temporales', 'servicios', 'practicantes', 'voluntarios'].map(category => (
                            <div key={category} className="options__information--label">
                              <label className="form-label">
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </label>
                              <input
                                type="text"
                                name={`empleados.mujeres.${category}`}
                                placeholder={`Número de ${category}`}
                                className="form-input"
                                value={formData.empleados.mujeres[category]}
                                onChange={handleChange}
                                onKeyPress={(e) => {
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                                required
                              />
                              {errors[`empleados.mujeres.${category}`] && <span className="error-message">{errors[`empleados.mujeres.${category}`]}</span>}
                            </div>
                          ))}
                        </div>
                        <div className="empleados-column">
                          <h6>Hombres</h6>
                          {['nomina', 'temporales', 'servicios', 'practicantes', 'voluntarios'].map(category => (
                            <div key={category} className="options__information--label">
                              <label className="form-label">
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </label>
                              <input
                                type="text"
                                name={`empleados.hombres.${category}`}
                                placeholder={`Número de ${category}`}
                                className="form-input"
                                value={formData.empleados.hombres[category]}
                                onChange={handleChange}
                                onKeyPress={(e) => {
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                                required
                              />
                              {errors[`empleados.hombres.${category}`] && <span className="error-message">{errors[`empleados.hombres.${category}`]}</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="options__information--label">
                      <label className="form-label">
                        Menciona 3 indicadores cuantitativos en los cuales obtuvo una mejora gracias al plan estratégico de transformación digital. Por favor sé explícito describiendo el cambio que obtuviste en el indicador.* {errors.indicadores && <span className="error-message">{errors.indicadores}</span>}
                      </label>
                      <table className="indicadores-table">
                        <thead>
                          <tr>
                            <th>Indicador que mejoró gracias a la Ruta TD</th>
                            <th>Valor del Indicador antes de la Ruta</th>
                            <th>Valor del Indicador después de la Ruta</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formData.indicadores.map((indicador, idx) => (
                            <tr key={idx}>
                              <td>
                                <select
                                  name={`indicadores.${idx}.nombre`}
                                  className="form-select"
                                  value={indicador.nombre}
                                  onChange={handleChange}
                                  required
                                >
                                  <option value="" disabled>Seleccione un indicador</option>
                                  <option value="Tecnologías Digitales Emergentes">Tecnologías Digitales Emergentes</option>
                                  <option value="Resultados">Resultados</option>
                                  <option value="Gobierno Digital">Gobierno Digital</option>
                                  <option value="Innovación y Colaboración">Innovación y Colaboración</option>
                                  <option value="Experiencia del Cliente">Experiencia del Cliente</option>
                                  <option value="Capacidades Digitales">Capacidades Digitales</option>
                                  <option value="Cultura Digital">Cultura Digital</option>
                                  <option value="Estrategia Digital">Estrategia Digital</option>
                                </select>
                                {errors[`indicadores.${idx}.nombre`] && <span className="error-message">{errors[`indicadores.${idx}.nombre`]}</span>}
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name={`indicadores.${idx}.antes`}
                                  className="form-input"
                                  value={indicador.antes}
                                  onChange={handleChange}
                                  onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                      e.preventDefault();
                                    }
                                  }}
                                  required
                                />
                                {errors[`indicadores.${idx}.antes`] && <span className="error-message">{errors[`indicadores.${idx}.antes`]}</span>}
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name={`indicadores.${idx}.despues`}
                                  className="form-input"
                                  value={indicador.despues}
                                  onChange={handleChange}
                                  onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                      e.preventDefault();
                                    }
                                  }}
                                  required
                                />
                                {errors[`indicadores.${idx}.despues`] && <span className="error-message">{errors[`indicadores.${idx}.despues`]}</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="options__information--label">
                      <label htmlFor="otroHito" className="form-label">
                        ¿Tienes otro hito o logro que desees mencionar?* {errors.otroHito && <span className="error-message">{errors.otroHito}</span>}
                      </label>
                      <select
                        id="otroHito"
                        name="otroHito"
                        required
                        className="form-select"
                        value={formData.otroHito}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Seleccione una opción</option>
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                      </select>
                      {formData.otroHito === 'true' && (
                        <>
                          <input
                            type="text"
                            id="mencionarHito"
                            name="mencionarHito"
                            placeholder="Menciónelo aquí"
                            className="form-input"
                            value={formData.mencionarHito}
                            onChange={handleChange}
                            required={formData.otroHito === 'true'}
                          />
                          {errors.mencionarHito && <span className="error-message">{errors.mencionarHito}</span>}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className='button__container'>
                <button type="submit" className="form-submit-button" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          </form>
        </div>
      ) : (
        <section className="thank_you">
          <div className='thank_you__image'>
            <img src={require('../../img/grow-you-business.png')} alt="Thank You"/>
          </div>
          <div className="thank_you__text">
            <h1>Gracias por enviar tus respuestas, {userData.info?.full_name || 'Usuario'}!</h1>
            <h3>Tu información ha sido enviada exitosamente.</h3>
            <p>Con estos nos ayudas a seguir creciendo y poder brindarte un mejor proceso que llevaran a mejores resultados</p>
            <p>Regresa a la página principal: <Link className='thank_you__link' to='/'>Home</Link></p>
            <p>Regresa a nuestra herramienta de autodiagnóstico: <Link className='thank_you__link' to='/autodiagnostico'>Autodiagnóstico</Link></p>
          </div>
        </section>
      )}
    </div>
  );
}

export default LineaBase;