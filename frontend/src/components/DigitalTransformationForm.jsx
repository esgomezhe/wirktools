import React, { useState } from 'react';
import '../stylesheets/caracterizacion.css';

function DigitalTransformationForm({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    entrepreneurName: '',
    companyType: '',
    identificationType: '',
    identificationNumber: '',
    birthDate: '',
    gender: '',
    ethnicGroup: '',
    disability: '',
    email: '',
    phoneNumber: '',
    highestEducationLevel: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>RUTA DE TRANSFORMACIÓN DIGITAL</h1>
        <p>#DIGITALIZATE</p>
        <h2>Formulario de Caracterización</h2>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div>
            <label htmlFor="entrepreneurName" className="form-label">Nombre del emprendedor/empresario *</label>
            <input
              type="text"
              id="entrepreneurName"
              name="entrepreneurName"
              required
              className="form-input"
              value={formData.entrepreneurName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="companyType" className="form-label">Tipo de Empresa *</label>
            <select
              id="companyType"
              name="companyType"
              required
              className="form-select"
              value={formData.companyType}
              onChange={handleChange}
            >
              <option value="">Seleccione tipo de empresa</option>
              <option value="medianas_grandes">Medianas y Grandes Empresas</option>
              <option value="micro_pequeñas">Micro y Pequeñas Empresas</option>
              <option value="unidad_negocio_productivo">Unidades de Negocio Productivo</option>
              <option value="excelencia_clinica">Excelencia Clínica</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="identificationType" className="form-label">Tipo de documento de identificación *</label>
            <select
              id="identificationType"
              name="identificationType"
              required
              className="form-select"
              value={formData.identificationType}
              onChange={handleChange}
            >
              <option value="">Seleccione un documento</option>
              <option value="cédula_ciudadanía">Cédula de Ciudadanía</option>
              <option value="cédula_extranjería">Cédula de Extranjería</option>
              <option value="pasaporte">Pasaporte</option>
            </select>
          </div>
          <div>
            <label htmlFor="identificationNumber" className="form-label">Número de identificación *</label>
            <input
              type="text" // Changed to text to allow leading zeros, adjust validation accordingly
              id="identificationNumber"
              name="identificationNumber"
              required
              className="form-input"
              value={formData.identificationNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="birthDate" className="form-label">Fecha de nacimiento *</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              required
              className="form-input"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="gender" className="form-label">Genero *</label>
            <select
              id="gender"
              name="gender"
              required
              className="form-select"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Seleccione género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="no_identifico">No me identifico</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="ethnicGroup" className="form-label">Se autorreconoce o pertenece a alguno de estos grupos étnicos *</label>
            <select
              id="ethnicGroup"
              name="ethnicGroup"
              required
              className="form-select"
              value={formData.ethnicGroup}
              onChange={handleChange}
            >
              <option value="">Seleccione grupo étnico</option>
              <option value="otro">Otro</option>
              <option value="afrodescendiente">Afrodescendiente</option>
              <option value="indígena">Indígena</option>
              <option value="mestizo_blanco">Mestizo/Blanco</option>
              <option value="palanquero_san_brasilio">Palanquero de San Basilio</option>
              <option value="raizal_san_andrés">Raizal del Archipiélago de San Andrés</option>
            </select>
          </div>
          <div>
            <label htmlFor="disability" className="form-label">Tiene alguna clase de discapacidad *</label>
            <select
              id="disability"
              name="disability"
              required
              className="form-select"
              value={formData.disability}
              onChange={handleChange}
            >
              <option value="">Seleccione si tiene alguna discapacidad</option>
              <option value="cognitiva">Cognitiva</option>
              <option value="mental">Mental</option>
              <option value="múltiple">Múltiple</option>
              <option value="sensorial_auditiva">Sensorial Auditiva</option>
              <option value="sensorial_física">Sensorial Física</option>
              <option value="sensorial_visual">Sensorial Visual</option>
              <option value="ninguna">Ninguna</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="email" className="form-label">Correo electrónico *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="form-input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="form-label">Teléfono/celular de contacto *</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              className="form-input"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="highestEducationLevel" className="form-label">Nivel educativo más alto que has completado *</label>
            <select
              id="highestEducationLevel"
              name="highestEducationLevel"
              required
              className="form-select"
              value={formData.highestEducationLevel}
              onChange={handleChange}
            >
              <option value="">Seleccione nivel educativo</option>
              <option value="primaria">Primaria</option>
              <option value="secundaria">Secundaria</option>
              <option value="técnico_tecnológico">Técnico o Tecnológico</option>
              <option value="universitario_pregrado">Universitario (pregrado)</option>
              <option value="especialización_maestría">Especialización o maestría</option>
              <option value="doctorado_postdoctorado">Doctorado o postdoctorado</option>
            </select>
          </div>
        </div>

        <button type="submit" className="form-submit-button">Enviar</button>
      </form>
    </div>
  );
}

export default DigitalTransformationForm;