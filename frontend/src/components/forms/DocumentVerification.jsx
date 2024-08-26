import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkDocument, fetchCategoryAverages } from '../../utils/apiServices';
import home from '../../img/svg/home.svg';
import arrow from '../../img/svg/arrow.svg';
import figure from '../../img/svg/formulario_figure.svg';
import '../../stylesheets/formCompletion.css';

const DocumentVerification = ({ setUserData, setCategoryData, setIsDocumentVerified }) => {
  const [documentNumber, setDocumentNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let tempErrors = { ...errors };

    switch (name) {
      case 'documentNumber':
        tempErrors[name] = /^[0-9\- ]+$/.test(value) ? '' : 'Solo se permiten caracteres numéricos y símbolos específicos';
        break;
      default:
        tempErrors[name] = value ? '' : 'Este campo es obligatorio';
        break;
    }
    setErrors(tempErrors);
  };

  const handleDocumentChange = (event) => {
    const { name, value } = event.target;
    setDocumentNumber(value);
    validateField(name, value);
  };

  const handleDocumentSubmit = async (event) => {
    event.preventDefault();
    if (Object.values(errors).some(error => error !== '')) {
      return; // Si hay errores de validación, no envíes el formulario
    }
    setIsSubmitting(true);
    try {
      const response = await checkDocument(documentNumber);
      console.log('API Response:', response);

      // Verificamos si el documento existe
      if (response.exists) {
        setUserData({ ...response.data, id: response.id, createdAt: response.data.created_at });

        // Tratamos de obtener los promedios de categorías
        const categoryResponse = await fetchCategoryAverages(documentNumber);

        // Verificamos que la respuesta de la API para las categorías también sea correcta
        if (categoryResponse.exists) {
          setCategoryData(categoryResponse.category_averages);
        }

        setIsDocumentVerified(true);
        setErrors({});
      } else {
        setErrors({ document: 'No has realizado el autodiagnóstico.' });
      }
    } catch (error) {
      console.error('Error al verificar el documento:', error);

      // Capturamos el error si la respuesta no es JSON válido
      if (error.message.includes('Unexpected token')) {
        setErrors({ document: 'La respuesta del servidor no es válida. Por favor, intente nuevamente más tarde.' });
      } else {
        setErrors({ document: 'Error al verificar el documento.' });
      }
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
          <img src={figure} alt="figure" height={155} />
        </div>
        <div className="notice__options">
          <Link to={'/'}><img src={home} alt="home" /> </Link>
          <img src={arrow} alt="arrow" />
          <p className='notice__options--text'>Formulario de línea base</p>
        </div>
        <div className="notice__title--container">
          <h4 className='notice__title'>Ingrese su número de documento para consultar los resultados</h4>
        </div>
      </div>

      <div className="document-check">
        <form onSubmit={handleDocumentSubmit} className="document-check-form">
          <label htmlFor="documentNumber" className="form-label">
            Ingrese su número de documento {errors.documentNumber && <span className="error-message">{errors.documentNumber}</span>}
          </label>
          <input
            type="text"
            id="documentNumber"
            name="documentNumber"
            value={documentNumber}
            onChange={handleDocumentChange}
            required
            className="form-input"
          />
          {errors.document && (
            <div className="error-container">
              <p className="error-message">{errors.document}</p>
              <button type="button" className="autodiagnostico-button" onClick={handleAutodiagnosticoClick}>
                Realizar Autodiagnóstico
              </button>
            </div>
          )}
          <button type="submit" className="form-submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Verificando...' : 'Verificar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentVerification;