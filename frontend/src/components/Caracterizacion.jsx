import React, { useState } from 'react';
import '../stylesheets/caracterizacion.css';

function Caracterizacion({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    userName: '',
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
    companyName: '',
    companyNIT: '',
    previousBusiness: '',
    operationStartYear: '',
    registeredInCCC: '',
    mainOfficeDepartment: '',
    mainOfficeMunicipality: '',
    businessSector: '',
    productType: '',
    clientFocus: '',
    marketReach: '',
    businessSize: '',
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
            <label htmlFor="userName" className="form-label">Nombre del emprendedor/empresario *</label>
            <input
              type="text"
              id="userName"
              name="userName"
              required
              className="form-input"
              value={formData.userName}
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

        <div className="form-row">
          <div>
            <label htmlFor="companyName" className="form-label">Nombre de empresa *</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              required
              className="form-input"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="companyNIT" className="form-label">NIT de empresa *</label>
            <input
              type="text"
              id="companyNIT"
              name="companyNIT"
              required
              className="form-input"
              value={formData.companyNIT}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="previousBusiness" className="form-label">Antes de este emprendimiento/negocio/empresa, ¿Habías creado otra empresa? *</label>
            <select
              id="previousBusiness"
              name="previousBusiness"
              required
              className="form-select"
              value={formData.previousBusiness}
              onChange={handleChange}
            >
              <option value="">Seleccione una opción</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="registeredInCCC" className="form-label">Se encuentra matriculado en CCC *</label>
            <select
              id="registeredInCCC"
              name="registeredInCCC"
              required
              className="form-select"
              value={formData.registeredInCCC}
              onChange={handleChange}
            >
              <option value="">Seleccione una opción</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="businessSector" className="form-label">¿Cuál es el sector principal en el que se encuentra tu empresa? *</label>
            <select
              id="businessSector"
              name="businessSector"
              required
              className="form-select"
              value={formData.businessSector}
              onChange={handleChange}
            >
              <option value="">Seleccione sector principal</option>
              <option value="agricultura">Agricultura</option>
              <option value="arte">Arte</option>
              <option value="entretenimiento">Entretenimiento</option>
              <option value="comunicacion_informacion">Comunicación e información</option>
              <option value="construccion">Construcción</option>
              <option value="alimentos_empacados">Alimentos empacados listos para consumir y bebidas no alcohólicas</option>
              <option value="comercio_mayorista_minorista">Comercio al por mayor y al por menor de mercancías</option>
              <option value="proteina_blanca">Proteína blanca (productoras de pollo, cerdo y huevo)</option>
              <option value="energia">Energía</option>
              <option value="otros_servicios">Otros servicios</option>
              <option value="servicios_financieros_empresariales">Servicios financieros y empresariales</option>
              <option value="software_hardware">Software y hardware</option>
              <option value="transporte">Transporte</option>
              <option value="x_tech">X-Tech</option>
              <option value="salud">Salud</option>
              <option value="belleza_cuidado_personal">Belleza y cuidado personal</option>
              <option value="sistema_moda">Sistema moda (Confección, Marroquinería)</option>
              <option value="hoteles_servicios_hosteleria">Hoteles y servicios de hostelería y operadores turísticos</option>
              <option value="restaurantes">Restaurantes</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="productType" className="form-label">¿Qué tipo de productos y/o servicios ofrece tu empresa? *</label>
            <select
              id="productType"
              name="productType"
              required
              className="form-select"
              value={formData.productType}
              onChange={handleChange}
            >
              <option value="productos_bienes_fisicos">Productos o bienes físicos (Ej: carteras, artesanías, zapatos, etc.)</option>
              <option value="productos_bienes_no_fisicos">Productos o bienes no físicos (Ej: Desarrollo de Software, contenido multimedia, etc.)</option>
              <option value="servicios">Servicios (Ej: Servicios de publicidad, diseño, etc.)</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="clientFocus" className="form-label">¿Cuál es el tipo de cliente en el que se enfoca tu empresa? *</label>
            <select
              id="clientFocus"
              name="clientFocus"
              required
              className="form-select"
              value={formData.clientFocus}
              onChange={handleChange}
            >
              <option value="">Seleccione el tipo de cliente</option>
              <option value="B2B">Su principal cliente es otra empresa (B2B)</option>
              <option value="B2C">Sus principales clientes son consumidores o el usuario final (B2C)</option>
              <option value="B2G">Sus principales clientes son entes u organizaciones del gobierno (B2G)</option>
            </select>
          </div>
          <div>
            <label htmlFor="marketReach" className="form-label">¿Cuál es el tipo de mercado al que llega actualmente tu emprendimiento? *</label>
            <select
              id="marketReach"
              name="marketReach"
              required
              className="form-select"
              value={formData.marketReach}
              onChange={handleChange}
            >
              <option value="">Seleccione el alcance de mercado</option>
              <option value="local">Local (ciudad/municipio)</option>
              <option value="regional">Regional (departamento / región del país)</option>
              <option value="nacional">Nacional</option>
              <option value="nacional_internacional">Nacional e internacional</option>
              <option value="solo_internacional">Solo internacional</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="businessSize" className="form-label">¿De qué tamaño es tu empresa? *</label>
            <select
              id="businessSize"
              name="businessSize"
              required
              className="form-select"
              value={formData.businessSize}
              onChange={handleChange}
            >
              <option value="">Seleccione el tamaño de la empresa</option>
              <option value="unidad_productiva">Unidad Productiva Ventas anuales entre $1 - $ 800.000.000</option>
              <option value="micro_mediana">Micro y Mediana. Ventas anuales entre $801.000.000. - $14.000.000.000</option>
              <option value="mediana_grande">Mediana y Grande $14.000.000.001- $74.000.000.000</option>
            </select>
          </div>
        </div>

        <button type="submit" className="form-submit-button">Enviar</button>
      </form>
    </div>
  );
}

export default Caracterizacion;