import React, { useState } from 'react';
import '../stylesheets/lineabase.css';

function LineaBase({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    estadoEmpresa: '',
    ventas2023: '',
    ventasDigitales: false,
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
    otroHito: false,
    mencionarHito: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onFormSubmit(formData);
    } else {
      console.error("Validation errors", errors);
    }
  };

  const validateForm = () => {
    let tempErrors = {};

    // Add validation logic here

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  return (
    <div className="lineabase">
      <div className="form-container">
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
                      required
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
                        }}
                        className="form-check-input"
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
                    Incluyéndose a usted, por favor indique cuántos empleados (número) tiene actualmente en las siguientes categorías de empleo por sexo:*
                  </label>
                  <div className="empleados-container">
                    <div className="empleados-column">
                      <h6>Mujeres</h6>
                      {['nomina', 'temporales', 'servicios', 'practicantes', 'voluntarios'].map(category => (
                        <div key={category} className="options__information--label">
                          <label className="form-label">
                            {category.charAt(0).toUpperCase() + category.slice(1)} {errors[`empleados.mujeres.${category}`] && <span className="error-message">{errors[`empleados.mujeres.${category}`]}</span>}
                          </label>
                          <input
                            type="text"
                            name={`empleados.mujeres.${category}`}
                            placeholder={`Número de ${category}`}
                            className="form-input"
                            value={formData.empleados.mujeres[category]}
                            onChange={handleChange}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="empleados-column">
                      <h6>Hombres</h6>
                      {['nomina', 'temporales', 'servicios', 'practicantes', 'voluntarios'].map(category => (
                        <div key={category} className="options__information--label">
                          <label className="form-label">
                            {category.charAt(0).toUpperCase() + category.slice(1)} {errors[`empleados.hombres.${category}`] && <span className="error-message">{errors[`empleados.hombres.${category}`]}</span>}
                          </label>
                          <input
                            type="text"
                            name={`empleados.hombres.${category}`}
                            placeholder={`Número de ${category}`}
                            className="form-input"
                            value={formData.empleados.hombres[category]}
                            onChange={handleChange}
                          />
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
                            <input
                              type="text"
                              name={`indicadores.${idx}.nombre`}
                              className="form-input"
                              value={indicador.nombre}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name={`indicadores.${idx}.antes`}
                              className="form-input"
                              value={indicador.antes}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name={`indicadores.${idx}.despues`}
                              className="form-input"
                              value={indicador.despues}
                              onChange={handleChange}
                            />
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
                    <input
                      type="text"
                      id="mencionarHito"
                      name="mencionarHito"
                      placeholder="Menciónelo aquí"
                      className="form-input"
                      value={formData.mencionarHito}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='button__container'>
            <button type="submit" className="form-submit-button">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LineaBase;