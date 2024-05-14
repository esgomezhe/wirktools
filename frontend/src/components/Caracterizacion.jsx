import React, { useState } from 'react';
import '../stylesheets/caracterizacion.css';
import figure from '../img/svg/formulario_figure.svg'
import home from '../img/svg/home.svg'
import arrow from '../img/svg/arrow.svg'
import { Link } from 'react-router-dom';

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
    dataConsent: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
    validateField(name, type === 'checkbox' ? checked : value);
  };

  const validateField = (name, value) => {
    let tempErrors = { ...errors };
    const currentDate = new Date();

    switch (name) {
      case 'email':
        tempErrors[name] = /\S+@\S+\.\S+/.test(value) ? '' : 'Correo electrónico no válido';
        break;
      case 'identificationNumber':
      case 'phoneNumber':
      case 'companyNIT':
        // Solo permite números, guiones y espacios
        tempErrors[name] = /^[0-9\- ]+$/.test(value) ? '' : 'Solo se permiten caracteres numéricos y símbolos específicos';
        break;
      case 'birthDate':
      case 'operationStartYear':
        // Verifica que la fecha no sea futura
        const inputDate = new Date(value);
        tempErrors[name] = (inputDate <= currentDate) ? '' : 'La fecha no puede ser futura';
        break;
      default:
        // Validación para campos obligatorios generales
        tempErrors[name] = value ? '' : 'Este campo es obligatorio';
        break;
    }
    setErrors(tempErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm() && formData.dataConsent) {
      onFormSubmit(formData);
    } else {
      console.error("Validation errors", errors);
      if (!formData.dataConsent) {
        alert('Debe autorizar el tratamiento de los datos personales para continuar.');
      }
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    const currentDate = new Date();

    Object.keys(formData).forEach(key => {
      // Validación para campos vacíos, excepto 'dataConsent'
      if (!formData[key] && key !== 'dataConsent') {
        tempErrors[key] = 'Este campo es obligatorio';
      }

      // Validación específica para email
      if (key === 'email' && formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        tempErrors.email = 'Correo electrónico no válido';
      }

      // Validación para campos que deben ser numéricos (incluidos ciertos símbolos)
      if ((key === 'identificationNumber' || key === 'phoneNumber' || key === 'companyNIT') &&
        !/^[0-9\- ]+$/.test(formData[key])) {
        tempErrors[key] = 'Solo se permiten caracteres numéricos y símbolos específicos';
      }

      // Validación de fechas para no permitir fechas futuras
      if ((key === 'birthDate' || key === 'operationStartYear') && formData[key]) {
        const inputDate = new Date(formData[key]);
        if (inputDate > currentDate) {
          tempErrors[key] = 'La fecha no puede ser futura';
        }
      }
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  return (
    <>
      <div className='notice__container'>
        <div className="figure">
          <img src={figure} alt="figure" width={205} />
        </div>
        <div className="notice__options">
          <Link to={'/'}><img src={home} alt="home" /> </Link>
          <img src={arrow} alt="arrow" />
          <p className='notice__options--text'>Formulario de caracterización</p>
        </div>

        <div className="notice__title--container">
          <h4 className='notice__title'>Es necesario que completes los siguientes datos antes de realizar el autodiagnóstico</h4>
        </div>
      </div>

      <div className="form-container">
        <p className='form__requirement'>Campos marcados con * son obligatorios</p>
        <form onSubmit={handleSubmit} noValidate className='wirk__form'>

          <div className="options__information--container">
            <h5 className='options__information--title'>información personal</h5>

            <div className="options__information--fields">

              <div className="options__information--labels">
                <div className='options__information--label'>
                  <label htmlFor="userName" className="form-label">
                    Nombre del emprendedor/empresario * {errors.userName && <span className="error-message">{errors.userName}</span>}
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    placeholder="Ingresar nombre completo"
                    required
                    className="form-input"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </div>

                <div className='options__information--label'>
                  <label htmlFor="identificationNumber" className="form-label">
                    Número de identificación * {errors.identificationNumber && <span className="error-message">{errors.identificationNumber}</span>}
                  </label>
                  <input
                    type='text'
                    id="identificationNumber"
                    name="identificationNumber"
                    placeholder="Ingresar número de identificación"
                    required
                    className="form-input"
                    value={formData.identificationNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className='options__information--label'>
                  <label htmlFor="ethnicGroup" className="form-label">
                    Se autorreconoce o pertenece a alguno de estos grupos étnicos * {errors.ethnicGroup && <span className="error-message">{errors.ethnicGroup}</span>}
                  </label>
                  <select
                    id="ethnicGroup"
                    name="ethnicGroup"
                    required
                    className="form-select"
                    value={formData.ethnicGroup}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione grupo étnico</option>
                    <option value="otro">Otro</option>
                    <option value="afrodescendiente">Afrodescendiente</option>
                    <option value="indígena">Indígena</option>
                    <option value="mestizo_blanco">Mestizo/Blanco</option>
                    <option value="palanquero_san_brasilio">Palanquero de San Basilio</option>
                    <option value="raizal_san_andrés">Raizal del Archipiélago de San Andrés</option>
                  </select>
                </div>

                <div className='options__information--label'>
                  <label htmlFor="phoneNumber" className="form-label">
                    Teléfono/celular de contacto * {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Ingresar número de contacto"
                    required
                    className="form-input"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="options__information--labels">

                <div className='options__information--label'>
                  <label htmlFor="companyType" className="form-label">
                    Tipo de Empresa * {errors.companyType && <span className="error-message">{errors.companyType}</span>}
                  </label>
                  <select
                    id="companyType"
                    name="companyType"
                    required
                    className="form-select"
                    value={formData.companyType}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione tipo de empresa</option>
                    <option value="medianas_grandes">Medianas y Grandes Empresas</option>
                    <option value="micro_pequeñas">Micro y Pequeñas Empresas</option>
                    <option value="unidad_negocio_productivo">Unidades de Negocio Productivo</option>
                    <option value="excelencia_clinica">Excelencia Clínica</option>
                  </select>
                </div>

                <div className='options__information--label'>
                  <label htmlFor="birthDate" className="form-label">
                    Fecha de nacimiento * {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
                  </label>
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

                <div className='options__information--label'>
                  <label htmlFor="disability" className="form-label">
                    Tiene alguna clase de discapacidad * {errors.disability && <span className="error-message">{errors.disability}</span>}
                  </label>
                  <select
                    id="disability"
                    name="disability"
                    required
                    className="form-select"
                    value={formData.disability}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione si tiene alguna discapacidad</option>
                    <option value="cognitiva">Cognitiva</option>
                    <option value="mental">Mental</option>
                    <option value="múltiple">Múltiple</option>
                    <option value="sensorial_auditiva">Sensorial Auditiva</option>
                    <option value="sensorial_física">Sensorial Física</option>
                    <option value="sensorial_visual">Sensorial Visual</option>
                    <option value="ninguna">Ninguna</option>
                  </select>
                </div>

                <div className='options__information--label'>
                  <label htmlFor="highestEducationLevel" className="form-label">
                    Nivel educativo más alto que has completado * {errors.highestEducationLevel && <span className="error-message">{errors.highestEducationLevel}</span>}
                  </label>
                  <select
                    id="highestEducationLevel"
                    name="highestEducationLevel"
                    required
                    className="form-select"
                    value={formData.highestEducationLevel}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione nivel educativo</option>
                    <option value="primaria">Primaria</option>
                    <option value="secundaria">Secundaria</option>
                    <option value="técnico_tecnológico">Técnico o Tecnológico</option>
                    <option value="universitario_pregrado">Universitario (pregrado)</option>
                    <option value="especialización_maestría">Especialización o maestría</option>
                    <option value="doctorado_postdoctorado">Doctorado o postdoctorado</option>
                  </select>
                </div>
              </div>

              <div className="options__information--labels">

                <div className='options__information--label'>
                  <label htmlFor="identificationType" className="form-label">
                    Tipo de documento de identificación * {errors.identificationType && <span className="error-message">{errors.identificationType}</span>}
                  </label>
                  <select
                    id="identificationType"
                    name="identificationType"
                    required
                    className="form-select"
                    value={formData.identificationType}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione un tipo de documento</option>
                    <option value="cédula_ciudadanía">Cédula de Ciudadanía</option>
                    <option value="cédula_extranjería">Cédula de Extranjería</option>
                    <option value="pasaporte">Pasaporte</option>
                  </select>
                </div>

                <div className='options__information--label'>
                  <label htmlFor="gender" className="form-label">
                    Género * {errors.gender && <span className="error-message">{errors.gender}</span>}
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    required
                    className="form-select"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione género</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="no_identifico">No me identifico</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="email" className="form-label">
                    Correo electrónico * {errors.email && <span className="error-message">{errors.email}</span>}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@example.com"
                    required
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

              </div>
            </div>
          </div>

          <div className="options__information--container">
            <h5 className='options__information--title'>información de la empresa</h5>

            <div className="options__information--fields">

              <div className="options__information--labels">

                <div className='options__information--label'>
                  <label htmlFor="companyName" className="form-label">
                    Nombre de empresa * {errors.companyName && <span className="error-message">{errors.companyName}</span>}
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    placeholder="Ingrese el nombre de la empresa"
                    required
                    className="form-input"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>

                <div className='options__information--label'>
                  <label htmlFor="operationStartYear" className="form-label">
                    Año en el que inició operaciones * {errors.operationStartYear && <span className="error-message">{errors.operationStartYear}</span>}
                  </label>
                  <input
                    type="date"
                    id="operationStartYear"
                    name="operationStartYear"
                    required
                    className="form-input"
                    value={formData.operationStartYear}
                    onChange={handleChange}
                  />
                </div>

                <div className='options__information--label'>
                  <label htmlFor="mainOfficeMunicipality" className="form-label">
                    Municipio donde se ubica la sede principal de la empresa * {errors.mainOfficeMunicipality && <span className="error-message">{errors.mainOfficeMunicipality}</span>}
                  </label>
                  <input
                    type="text"
                    id="mainOfficeMunicipality"
                    name="mainOfficeMunicipality"
                    placeholder={errors.mainOfficeMunicipality || 'Ej: Cali'}
                    required
                    className="form-input"
                    value={formData.mainOfficeMunicipality}
                    onChange={handleChange}
                  />
                </div>

                <div className='options__information--label'>
                  <label htmlFor="marketReach" className="form-label">
                    ¿Cuál es el tipo de mercado al que llega actualmente tu emprendimiento? * {errors.marketReach && <span className="error-message">{errors.marketReach}</span>}
                  </label>
                  <select
                    id="marketReach"
                    name="marketReach"
                    required
                    className="form-select"
                    value={formData.marketReach}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione el alcance de mercado</option>
                    <option value="local">Local (ciudad/municipio)</option>
                    <option value="regional">Regional (departamento / región del país)</option>
                    <option value="nacional">Nacional</option>
                    <option value="nacional_internacional">Nacional e internacional</option>
                    <option value="solo_internacional">Solo internacional</option>
                  </select>
                </div>
              </div>

              <div className="options__information--labels">

                <div className='options__information--label'>
                  <label htmlFor="companyNIT" className="form-label">
                    NIT de empresa * {errors.companyNIT && <span className="error-message">{errors.companyNIT}</span>}
                  </label>
                  <input
                    type="text"
                    id="companyNIT"
                    name="companyNIT"
                    placeholder={errors.companyNIT || 'Ej: 51059231-9'}
                    required
                    className="form-input"
                    value={formData.companyNIT}
                    onChange={handleChange}
                  />
                </div>

                <div className='options__information--label'>
                  <label htmlFor="registeredInCCC" className="form-label">
                    Se encuentra matriculado en CCC * {errors.registeredInCCC && <span className="error-message">{errors.registeredInCCC}</span>}
                  </label>
                  <select
                    id="registeredInCCC"
                    name="registeredInCCC"
                    required
                    className="form-select"
                    value={formData.registeredInCCC}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className='options__information--label'>
                  <label htmlFor="businessSector" className="form-label">
                    ¿Cuál es el sector principal en el que se encuentra tu empresa? * {errors.businessSector && <span className="error-message">{errors.businessSector}</span>}
                  </label>
                  <select
                    id="businessSector"
                    name="businessSector"
                    required
                    className="form-select"
                    value={formData.businessSector}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione sector principal</option>
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

                <div className='options__information--label'>
                  <label htmlFor="businessSize" className="form-label">
                    ¿De qué tamaño es tu empresa? * {errors.businessSize && <span className="error-message">{errors.businessSize}</span>}
                  </label>
                  <select
                    id="businessSize"
                    name="businessSize"
                    required
                    className="form-select"
                    value={formData.businessSize}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione el tamaño de la empresa</option>
                    <option value="unidad_productiva">Unidad Productiva Ventas anuales entre $1 - $ 800.000.000</option>
                    <option value="micro_mediana">Micro y Mediana. Ventas anuales entre $801.000.000. - $14.000.000.000</option>
                    <option value="mediana_grande">Mediana y Grande $14.000.000.001- $74.000.000.000</option>
                  </select>
                </div>
              </div>

              <div className="options__information--labels">

                <div className='options__information--label'>
                  <label htmlFor="previousBusiness" className="form-label">
                    Antes de este emprendimiento/negocio/empresa, ¿Habías creado otra empresa? * {errors.previousBusiness && <span className="error-message">{errors.previousBusiness}</span>}
                  </label>
                  <select
                    id="previousBusiness"
                    name="previousBusiness"
                    required
                    className="form-select"
                    value={formData.previousBusiness}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className='options__information--label'>
                  <label htmlFor="mainOfficeDepartment" className="form-label">
                    Departamento donde se ubica la sede principal de la empresa * {errors.mainOfficeDepartment && <span className="error-message">{errors.mainOfficeDepartment}</span>}
                  </label>
                  <input
                    type="text"
                    id="mainOfficeDepartment"
                    name="mainOfficeDepartment"
                    placeholder="Ej: Valle del Cauca"
                    required
                    className="form-input"
                    value={formData.mainOfficeDepartment}
                    onChange={handleChange}
                  />
                </div>

                <div className='options__information--label'>
                  <label htmlFor="clientFocus" className="form-label">
                    ¿Cuál es el tipo de cliente en el que se enfoca tu empresa? * {errors.clientFocus && <span className="error-message">{errors.clientFocus}</span>}
                  </label>
                  <select
                    id="clientFocus"
                    name="clientFocus"
                    required
                    className="form-select"
                    value={formData.clientFocus}
                    onChange={handleChange}
                  >
                    <option value="" disabled>{errors.clientFocus || 'Seleccione el tipo de cliente'}</option>
                    <option value="B2B">Su principal cliente es otra empresa (B2B)</option>
                    <option value="B2C">Sus principales clientes son consumidores o el usuario final (B2C)</option>
                    <option value="B2G">Sus principales clientes son entes u organizaciones del gobierno (B2G)</option>
                  </select>
                </div>

                <div className='options__information--label'>
                  <label htmlFor="productType" className="form-label">
                    ¿Qué tipo de productos y/o servicios ofrece tu empresa? * {errors.productType && <span className="error-message">{errors.productType}</span>}
                  </label>
                  <select
                    id="productType"
                    name="productType"
                    required
                    className="form-select"
                    value={formData.productType}
                    onChange={handleChange}
                  >
                    <option value="" disabled>{errors.productType || 'Seleccione el tipo de producto o servicio'}</option>
                    <option value="productos_bienes_fisicos">Productos o bienes físicos (Ej: Carteras, artesanías, zapatos, etc.)</option>
                    <option value="productos_bienes_no_fisicos">Productos o bienes no físicos (Ej: Desarrollo de Software, contenido multimedia, etc.)</option>
                    <option value="servicios">Servicios (Ej: Servicios de publicidad, diseño, etc.)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='data__treatment'>
            <p className='data__treatment--text'>
              Autoriza a la Cámara de Comercio de Cali como responsable del tratamiento de los datos personales,
              para la recolección, almacenamiento, uso, transmisión y/o transferencia de los datos personales
              suministrados en este formulario, para las finalidades dispuestas en la
              política de tratamiento de datos personales que puede <a className='data__treatment--text' href="https://camaradecomerciodecali-my.sharepoint.com/personal/daocampo_ccc_org_co/_layouts/15/AccessDenied.aspx?Source=https%3A%2F%2Fcamaradecomerciodecali%2Dmy%2Esharepoint%2Ecom%2Fpersonal%2Fdaocampo%5Fccc%5Forg%5Fco%2F%5Flayouts%2F15%2Fonedrive%2Easpx%3Fid%3D%252Fpersonal%252Fdaocampo%255Fccc%255Forg%255Fco%252FDocuments%252FEscritorio%252FAUTORIZACION%2520TRATAMIENTO%2520PARA%2520ENCUESTA%2520DE%2520SATISFACCI%25C3%2593N%2520A%2520EXTERNOS%252Epdf%26parent%3D%252Fpersonal%252Fdaocampo%255Fccc%255Forg%255Fco%252FDocuments%252FEscritorio%26ga%3D1&correlation=e46b26a1%2D806d%2D5000%2D4107%2D345305f08660&Type=item&name=2a6cfacc%2D54a2%2D4177%2D8a9a%2Dac337a4db2d2&listItemId=2195&listItemUniqueId=1badd0e3%2D7fe5%2D4358%2Dabfc%2Da24c08bfe32b" target="noreferrer"> consultar aquí</a>.
            </p>
            <div className='data__treatment--check'>
              <input
                type="checkbox"
                id="dataConsent"
                name="dataConsent"
                checked={formData.dataConsent}
                onChange={handleChange}
              />
              <label htmlFor="dataConsent" style={{ paddingLeft: '5px' }}>
                Autorizo tratamiento de datos personales. {errors.dataConsent && <span className="error-message">{errors.dataConsent || ''}</span>}
              </label>
            </div>
          </div>
          <div className='button__container'>
            <button type="submit" className="form-submit-button" disabled={!formData.dataConsent}>Continuar con el autodiagnóstico</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Caracterizacion;