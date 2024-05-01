import React, { useState } from 'react';
import '../stylesheets/caracterizacion.css';
import figure from '../img/svg/formulario_figure.svg'
import home from '../img/svg/home.svg'
import arrow from '../img/svg/arrow.svg'
import { Link } from 'react-router-dom';

function Caracterizacion({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    userName: '',
    companyType: '', // micro_pequeñas o unidad_negocio_productivo
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
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(formData); // Llama al callback con los datos del formulario
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
                  <label htmlFor="userName" className="form-label">Nombre del emprendedor/empresario *</label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    placeholder='Ingresar nombre completo'
                    required
                    className="form-input"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </div>

                <div className='options__information--label'>
                  <label htmlFor="identificationNumber" className="form-label">Número de identificación *</label>
                  <input
                    type='text'
                    id="identificationNumber"
                    name="identificationNumber"
                    placeholder='Ingresar número de identificación'
                    required
                    className="form-input"
                    value={formData.identificationNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className='options__information--label'>
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

                <div className='options__information--label'>
                  <label htmlFor="phoneNumber" className="form-label">Teléfono/celular de contacto *</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder='Ingresar número de contacto'
                    required
                    className="form-input"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="options__information--labels">

                <div className='options__information--label'>
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
                    { /* <option value="medianas_grandes">Medianas y Grandes Empresas</option> */}
                    <option value="micro_pequeñas">Micro y Pequeñas Empresas</option>
                    <option value="unidad_negocio_productivo">Unidades de Negocio Productivo</option>
                    { /* <option value="excelencia_clinica">Excelencia Clínica</option> */}
                  </select>
                </div>

                <div className='options__information--label'>
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

                <div className='options__information--label'>
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

                <div className='options__information--label'>
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

              <div className="options__information--labels">

                <div className='options__information--label'>
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

                <div className='options__information--label'>
                  <label htmlFor="gender" className="form-label">Género *</label>
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

                <div>
                  <label htmlFor="email" className="form-label">Correo electrónico *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='example@example.com'
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
                  <label htmlFor="companyName" className="form-label">Nombre de empresa *</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    placeholder='Ingrese el nombre de la empresa'
                    required
                    className="form-input"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>

                <div className='options__information--label'>
                  <label htmlFor="operationStartYear" className="form-label">Año en el que inició operaciones *</label>
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
                  <label htmlFor="mainOfficeMunicipality" className="form-label">Municipio donde se ubica la sede principal de la empresa *</label>
                  <input
                    type="text"
                    id="mainOfficeMunicipality"
                    name="mainOfficeMunicipality"
                    placeholder='Ej: Cali'
                    required
                    className="form-input"
                    value={formData.mainOfficeMunicipality}
                    onChange={handleChange}
                  />
                </div>

                <div className='options__information--label'>
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

              <div className="options__information--labels">

                <div className='options__information--label'>
                  <label htmlFor="companyNIT" className="form-label">NIT de empresa *</label>
                  <input
                    type="text"
                    id="companyNIT"
                    name="companyNIT"
                    placeholder='Ej: 51059231-9'
                    required
                    className="form-input"
                    value={formData.companyNIT}
                    onChange={handleChange}
                  />
                </div>

                <div className='options__information--label'>
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

                <div className='options__information--label'>
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

                <div className='options__information--label'>
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

              <div className="options__information--labels">

                <div className='options__information--label'>
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

                <div className='options__information--label'>
                  <label htmlFor="mainOfficeDepartment" className="form-label">Departamento donde se ubica la sede principal de la empresa *</label>
                  <input
                    type="text"
                    id="mainOfficeDepartment"
                    name="mainOfficeDepartment"
                    placeholder='Ej: Valle del Cauca'
                    required
                    className="form-input"
                    value={formData.mainOfficeDepartment}
                    onChange={handleChange}
                  />
                </div>

                <div className='options__information--label'>
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
              </div>
            </div>

            <div className="form-row">
              <div>
                <fieldset>
                  <legend className="form-label">¿Qué tipo de productos y/o servicios ofrece tu empresa? *</legend>
                  <div>
                    <input
                      type="checkbox"
                      id="productos_bienes_fisicos"
                      name="productType"
                      value="productos_bienes_fisicos"
                      checked={formData.productType.includes("productos_bienes_fisicos")}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                    <label htmlFor="productos_bienes_fisicos" className="form-check-label">Productos o bienes físicos (Ej: carteras, artesanías, zapatos, etc.)</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="productos_bienes_no_fisicos"
                      name="productType"
                      value="productos_bienes_no_fisicos"
                      checked={formData.productType.includes("productos_bienes_no_fisicos")}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                    <label htmlFor="productos_bienes_no_fisicos" className="form-check-label">Productos o bienes no físicos (Ej: Desarrollo de Software, contenido multimedia, etc.)</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="servicios"
                      name="productType"
                      value="servicios"
                      checked={formData.productType.includes("servicios")}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                    <label htmlFor="servicios" className="form-check-label">Servicios (Ej: Servicios de publicidad, diseño, etc.)</label>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>



          <div className='data__treatment'>
            <p className='data__treatment--text'>Autoriza a la Cámara de Comercio de Cali como responsable del tratamiento de los datos personales, para la recolección, almacenamiento, uso, transmisión y/o transferencia de los datos personales suministrados en este formulario, para las finalidades dispuestas en la Política de tratamiento de datos personales que puede consultar aquí.</p>
          </div>

          <button type="submit" className="form-submit-button">Continuar con el autodiagnóstico</button>
        </form>
      </div>


    </>
  );
}

export default Caracterizacion;