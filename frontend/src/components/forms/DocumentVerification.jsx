import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkDocument, fetchCategoryAverages } from '../../utils/apiServices';
import home from '../../img/svg/home.svg';
import arrow from '../../img/svg/arrow.svg';
import figure from '../../img/svg/formulario_figure.svg';
import '../../stylesheets/results.css';

const DocumentVerification = ({ setUserData, setCategoryData, setIsDocumentVerified }) => {
  const [documentNumber, setDocumentNumber] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleDocumentChange = (event) => {
    setDocumentNumber(event.target.value);
  };

  const handleDocumentSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await checkDocument(documentNumber);
      console.log(response); // Verifica la respuesta de la API
      if (response.exists) {
        setUserData({ ...response.data, id: response.id, createdAt: response.data.created_at });
        const categoryResponse = await fetchCategoryAverages(documentNumber);
        if (categoryResponse.exists) {
          setCategoryData(categoryResponse.category_averages);
        }
        setIsDocumentVerified(true);
        setErrors({});
      } else {
        setErrors({ document: 'No has realizado el autodiagnóstico.' });
      }
    } catch (error) {
      setErrors({ document: 'Error al verificar el documento.' });
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
          <label htmlFor="documentNumber" className="form-label">Ingrese su número de documento</label>
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
          <button type="submit" className="form-submit-button">Verificar</button>
        </form>
      </div>
    </div>
  );
};

export default DocumentVerification;