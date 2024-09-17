import React, { useState, useContext, useEffect } from 'react';
import '../../stylesheets/caracterizacion.css';
import figure from '../../img/svg/formulario_figure.svg';
import home from '../../img/svg/home.svg';
import arrow from '../../img/svg/arrow.svg';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { updateUserProfile } from '../../utils/apiServices';

const departamentos = [
  'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'
];

const municipios = {
  'Amazonas': ['Leticia', 'Puerto Nariño', 'El Encanto', 'La Chorrera', 'La Pedrera', 'La Victoria', 'Miriti-Paraná', 'Puerto Alegría', 'Puerto Arica', 'Puerto Santander', 'Tarapacá'],
  'Antioquia': ['Medellín', 'Abejorral', 'Abriaquí', 'Alejandría', 'Amagá', 'Amalfi', 'Andes', 'Angelópolis', 'Angostura', 'Anorí', 'Santafé de Antioquia', 'Anza', 'Apartadó', 'Arboletes', 'Argelia', 'Armenia', 'Barbosa', 'Bello', 'Belmira', 'Betania', 'Betulia', 'Ciudad Bolívar', 'Briceño', 'Buriticá', 'Cáceres', 'Caicedo', 'Caldas', 'Campamento', 'Cañasgordas', 'Caracolí', 'Caramanta', 'Carepa', 'El Carmen de Viboral', 'Carolina', 'Caucasia', 'Chigorodó', 'Cisneros', 'Cocorná', 'Concepción', 'Concordia', 'Copacabana', 'Dabeiba', 'Donmatías', 'Ebéjico', 'El Bagre', 'Entrerríos', 'Envigado', 'Fredonia', 'Frontino', 'Giraldo', 'Girardota', 'Gómez Plata', 'Granada', 'Guadalupe', 'Guarne', 'Guatapé', 'Heliconia', 'Hispania', 'Itagüí', 'Ituango', 'Jardín', 'Jericó', 'La Ceja', 'La Estrella', 'La Pintada', 'La Unión', 'Liborina', 'Maceo', 'Marinilla', 'Montebello', 'Murindó', 'Mutatá', 'Nariño', 'Nechí', 'Necoclí', 'Olaya', 'Peque', 'Peñol', 'Pueblorrico', 'Puerto Berrío', 'Puerto Nare', 'Puerto Triunfo', 'Remedios', 'Retiro', 'Rionegro', 'Sabanalarga', 'Sabaneta', 'Salgar', 'San Andrés de Cuerquia', 'San Carlos', 'San Francisco', 'San Jerónimo', 'San José de la Montaña', 'San Juan de Urabá', 'San Luis', 'San Pedro de Urabá', 'San Pedro de los Milagros', 'San Rafael', 'San Roque', 'San Vicente', 'Santa Bárbara', 'Santa Rosa de Osos', 'Santo Domingo', 'El Santuario', 'Segovia', 'Sonsón', 'Sopetrán', 'Támesis', 'Tarazá', 'Tarso', 'Titiribí', 'Toledo', 'Turbo', 'Uramita', 'Urrao', 'Valdivia', 'Valparaíso', 'Vegachí', 'Venecia', 'Vigía del Fuerte', 'Yalí', 'Yarumal', 'Yolombó', 'Yondó', 'Zaragoza'],
  'Arauca': ['Arauca', 'Arauquita', 'Cravo Norte', 'Fortul', 'Puerto Rondón', 'Saravena', 'Tame'],
  'Atlántico': ['Barranquilla', 'Baranoa', 'Campo de la Cruz', 'Candelaria', 'Galapa', 'Juan de Acosta', 'Luruaco', 'Malambo', 'Manatí', 'Palmar de Varela', 'Piojó', 'Polonuevo', 'Ponedera', 'Puerto Colombia', 'Repelón', 'Sabanagrande', 'Sabanalarga', 'Santa Lucía', 'Santo Tomás', 'Soledad', 'Suan', 'Tubará', 'Usiacurí'],
  'Bolívar': ['Cartagena de Indias', 'Achí', 'Altos del Rosario', 'Arenal', 'Arjona', 'Arroyohondo', 'Barranco de Loba', 'Calamar', 'Cantagallo', 'Cicuco', 'Clemencia', 'Córdoba', 'El Carmen de Bolívar', 'El Guamo', 'El Peñón', 'Hatillo de Loba', 'Magangué', 'Mahates', 'Margarita', 'María la Baja', 'Montecristo', 'Mompós', 'Morales', 'Norosí', 'Pinillos', 'Regidor', 'Río Viejo', 'San Cristóbal', 'San Estanislao', 'San Fernando', 'San Jacinto', 'San Jacinto del Cauca', 'San Juan Nepomuceno', 'San Martín de Loba', 'San Pablo', 'Santa Catalina', 'Santa Rosa', 'Santa Rosa del Sur', 'Simití', 'Soplaviento', 'Talaigua Nuevo', 'Tiquisio', 'Turbaco', 'Turbaná', 'Villanueva', 'Zambrano'],
  'Boyacá': ['Tunja', 'Almeida', 'Aquitania', 'Arcabuco', 'Belén', 'Berbeo', 'Betéitiva', 'Boavita', 'Boyacá', 'Briceño', 'Buenavista', 'Busbanzá', 'Caldas', 'Campohermoso', 'Cerinza', 'Chinavita', 'Chiquinquirá', 'Chiscas', 'Chita', 'Chitaraque', 'Chivatá', 'Chivor', 'Ciénaga', 'Cómbita', 'Coper', 'Corrales', 'Covarachía', 'Cubará', 'Cucaita', 'Cuitiva', 'Chíquiza', 'Chivata', 'Duitama', 'El Cocuy', 'El Espino', 'Firavitoba', 'Floresta', 'Gachantivá', 'Gámeza', 'Garagoa', 'Guacamayas', 'Guateque', 'Guayatá', 'Güicán', 'Iza', 'Jenesano', 'Jericó', 'Labranzagrande', 'La Capilla', 'La Uvita', 'Villa de Leyva', 'Macanal', 'Maripí', 'Miraflores', 'Mongua', 'Monguí', 'Moniquirá', 'Motavita', 'Muzo', 'Nobsa', 'Nuevo Colón', 'Oicatá', 'Otanche', 'Pachavita', 'Páez', 'Paipa', 'Pajarito', 'Panqueba', 'Pauna', 'Paya', 'Paz de Río', 'Pesca', 'Pisba', 'Puerto Boyacá', 'Quípama', 'Ramiriquí', 'Ráquira', 'Rondón', 'Saboyá', 'Sáchica', 'Samacá', 'San Eduardo', 'San José de Pare', 'San Luis de Gaceno', 'San Mateo', 'San Miguel de Sema', 'San Pablo de Borbur', 'Santana', 'Santa María', 'Santa Rosa de Viterbo', 'Santa Sofía', 'Sativanorte', 'Sativasur', 'Siachoque', 'Soatá', 'Socotá', 'Socha', 'Sogamoso', 'Somondoco', 'Sora', 'Soracá', 'Sotaquirá', 'Susacón', 'Sutamarchán', 'Sutatenza', 'Tasco', 'Tenza', 'Tibaná', 'Tibasosa', 'Tinjacá', 'Tipacoque', 'Toca', 'Togüí', 'Tópaga', 'Tota', 'Tununguá', 'Turmequé', 'Tuta', 'Tutazá', 'Úmbita', 'Ventaquemada', 'Viracachá', 'Zetaquira'],
  'Caldas': ['Manizales', 'Aguadas', 'Anserma', 'Aranzazu', 'Belalcázar', 'Chinchiná', 'Filadelfia', 'La Dorada', 'La Merced', 'Manzanares', 'Marmato', 'Marquetalia', 'Marulanda', 'Neira', 'Norcasia', 'Pácora', 'Palestina', 'Pensilvania', 'Riosucio', 'Risaralda', 'Salamina', 'Samaná', 'San José', 'Supía', 'Victoria', 'Villamaría', 'Viterbo'],
  'Caquetá': ['Florencia', 'Albania', 'Belén de los Andaquíes', 'Cartagena del Chairá', 'Curillo', 'El Doncello', 'El Paujil', 'La Montañita', 'Milán', 'Morelia', 'Puerto Rico', 'San José del Fragua', 'San Vicente del Caguán', 'Solano', 'Solita', 'Valparaíso'],
  'Casanare': ['Yopal', 'Aguazul', 'Chámeza', 'Hato Corozal', 'La Salina', 'Maní', 'Monterrey', 'Nunchía', 'Orocué', 'Paz de Ariporo', 'Pore', 'Recetor', 'Sabanalarga', 'Sácama', 'San Luis de Palenque', 'Támara', 'Tauramena', 'Trinidad', 'Villanueva'],
  'Cauca': ['Popayán', 'Almaguer', 'Argelia', 'Balboa', 'Bolívar', 'Buenos Aires', 'Cajibío', 'Caldono', 'Caloto', 'Corinto', 'El Tambo', 'Florencia', 'Guachené', 'Guapí', 'Inzá', 'Jambaló', 'La Sierra', 'La Vega', 'López de Micay', 'Mercaderes', 'Miranda', 'Morales', 'Padilla', 'Páez', 'Patía', 'Piamonte', 'Piendamó', 'Puerto Tejada', 'Puracé', 'Rosas', 'San Sebastián', 'Santa Rosa', 'Santander de Quilichao', 'Silvia', 'Sotará', 'Suárez', 'Sucre', 'Timbío', 'Timbiquí', 'Toribío', 'Totoró', 'Villa Rica'],
  'Cesar': ['Valledupar', 'Aguachica', 'Agustín Codazzi', 'Astrea', 'Becerril', 'Bosconia', 'Chimichagua', 'Chiriguaná', 'Curumaní', 'El Copey', 'El Paso', 'Gamarra', 'González', 'La Gloria', 'La Jagua de Ibirico', 'Manaure Balcón del Cesar', 'Pailitas', 'Pelaya', 'Pueblo Bello', 'Río de Oro', 'San Alberto', 'San Diego', 'San Martín', 'Tamalameque'],
  'Chocó': ['Quibdó', 'Acandí', 'Alto Baudó', 'Atrato', 'Bagadó', 'Bahía Solano', 'Bajo Baudó', 'Bojayá', 'Cantón de San Pablo', 'Carmen del Darién', 'Cértegui', 'Condoto', 'El Carmen', 'Istmina', 'Juradó', 'Litoral del San Juan', 'Lloró', 'Medio Atrato', 'Medio Baudó', 'Medio San Juan', 'Nóvita', 'Nuquí', 'Río Iró', 'Río Quito', 'Riosucio', 'San José del Palmar', 'Sipí', 'Tadó', 'Unguía', 'Unión Panamericana'],
  'Córdoba': ['Montería', 'Ayapel', 'Buenavista', 'Canalete', 'Cereté', 'Chimá', 'Chinú', 'Ciénaga de Oro', 'Cotorra', 'La Apartada', 'Lorica', 'Los Córdobas', 'Momil', 'Montelíbano', 'Moñitos', 'Planeta Rica', 'Pueblo Nuevo', 'Puerto Escondido', 'Puerto Libertador', 'Purísima', 'Sahagún', 'San Andrés de Sotavento', 'San Antero', 'San Bernardo del Viento', 'San Carlos', 'San José de Uré', 'San Pelayo', 'Santa Cruz de Lorica', 'Tierralta', 'Tuchín', 'Valencia'],
  'Cundinamarca': ['Bogotá D.C.', 'Agua de Dios', 'Albán', 'Anapoima', 'Anolaima', 'Arbeláez', 'Beltrán', 'Bituima', 'Bojacá', 'Cabrera', 'Cachipay', 'Cajicá', 'Caparrapí', 'Cáqueza', 'Carmen de Carupa', 'Chaguaní', 'Chía', 'Chipaque', 'Choachí', 'Chocontá', 'Cogua', 'Cota', 'Cucunubá', 'El Colegio', 'El Peñón', 'El Rosal', 'Facatativá', 'Fómeque', 'Fosca', 'Funza', 'Fúquene', 'Fusagasugá', 'Gachalá', 'Gachancipá', 'Gachetá', 'Gama', 'Girardot', 'Granada', 'Guachetá', 'Guaduas', 'Guasca', 'Guataquí', 'Guatavita', 'Guayabal de Síquima', 'Guayabetal', 'Gutiérrez', 'Jerusalén', 'Junín', 'La Calera', 'La Mesa', 'La Palma', 'La Peña', 'La Vega', 'Lenguazaque', 'Machetá', 'Madrid', 'Manta', 'Medina', 'Mosquera', 'Nariño', 'Nemocón', 'Nilo', 'Nimaima', 'Nocaima', 'Venecia', 'Pacho', 'Paime', 'Pandi', 'Paratebueno', 'Pasca', 'Puerto Salgar', 'Pulí', 'Quebradanegra', 'Quetame', 'Quipile', 'Apulo', 'Ricaurte', 'San Antonio del Tequendama', 'San Bernardo', 'San Cayetano', 'San Francisco', 'San Juan de Río Seco', 'Sasaima', 'Sesquilé', 'Sibaté', 'Silvania', 'Simijaca', 'Soacha', 'Sopó', 'Subachoque', 'Suesca', 'Supatá', 'Susa', 'Sutatausa', 'Tabio', 'Tausa', 'Tena', 'Tenjo', 'Tibacuy', 'Tibirita', 'Tocaima', 'Tocancipá', 'Topaipí', 'Ubalá', 'Ubaque', 'Ubaté', 'Une', 'Útica', 'Vergara', 'Vianí', 'Villagómez', 'Villapinzón', 'Villeta', 'Viotá', 'Yacopí', 'Zipacón', 'Zipaquirá'],
  'Guainía': ['Inírida', 'Barranco Minas', 'Cacahual', 'La Guadalupe', 'Mapiripana', 'Morichal', 'Pana Pana', 'Puerto Colombia', 'San Felipe'],
  'Guaviare': ['San José del Guaviare', 'Calamar', 'El Retorno', 'Miraflores'],
  'Huila': ['Neiva', 'Acevedo', 'Agrado', 'Aipe', 'Algeciras', 'Altamira', 'Baraya', 'Campoalegre', 'Colombia', 'Elías', 'Garzón', 'Gigante', 'Guadalupe', 'Hobo', 'Iquira', 'Isnos', 'La Argentina', 'La Plata', 'Nátaga', 'Oporapa', 'Paicol', 'Palermo', 'Palestina', 'Pital', 'Pitalito', 'Rivera', 'Saladoblanco', 'San Agustín', 'Santa María', 'Suaza', 'Tarqui', 'Tello', 'Teruel', 'Tesalia', 'Timaná', 'Villavieja', 'Yaguará'],
  'La Guajira': ['Riohacha', 'Albania', 'Barrancas', 'Dibulla', 'Distracción', 'El Molino', 'Fonseca', 'Hatonuevo', 'La Jagua del Pilar', 'Maicao', 'Manaure', 'San Juan del Cesar', 'Uribia', 'Urumita', 'Villanueva'],
  'Magdalena': ['Santa Marta', 'Algarrobo', 'Aracataca', 'Ariguaní', 'Cerro de San Antonio', 'Chibolo', 'Ciénaga', 'Concordia', 'El Banco', 'El Piñón', 'El Retén', 'Fundación', 'Guamal', 'Nueva Granada', 'Pedraza', 'Pijiño del Carmen', 'Pivijay', 'Plato', 'Puebloviejo', 'Remolino', 'Sabanas de San Ángel', 'Salamina', 'San Sebastián de Buenavista', 'San Zenón', 'Santa Ana', 'Santa Bárbara de Pinto', 'Sitionuevo', 'Tenerife', 'Zapayán', 'Zona Bananera'],
  'Meta': ['Villavicencio', 'Acacías', 'Barranca de Upía', 'Cabuyaro', 'Castilla la Nueva', 'Cubarral', 'Cumaral', 'El Calvario', 'El Castillo', 'El Dorado', 'Fuente de Oro', 'Granada', 'Guamal', 'Mapiripán', 'Mesetas', 'La Macarena', 'La Uribe', 'Lejanías', 'Puerto Concordia', 'Puerto Gaitán', 'Puerto Lleras', 'Puerto López', 'Puerto Rico', 'Restrepo', 'San Carlos de Guaroa', 'San Juan de Arama', 'San Juanito', 'San Martín', 'Vistahermosa'],
  'Nariño': ['Pasto', 'Albán', 'Aldana', 'Ancuyá', 'Arboleda', 'Barbacoas', 'Belén', 'Buesaco', 'Chachagüí', 'Colón', 'Consacá', 'Contadero', 'Córdoba', 'Cuaspud', 'Cumbal', 'Cumbitara', 'El Charco', 'El Peñol', 'El Rosario', 'El Tablón de Gómez', 'El Tambo', 'Francisco Pizarro', 'Funes', 'Guachucal', 'Guaitarilla', 'Gualmatán', 'Iles', 'Imués', 'Ipiales', 'La Cruz', 'La Florida', 'La Llanada', 'La Tola', 'La Unión', 'Leiva', 'Linares', 'Los Andes', 'Magüí Payán', 'Mallama', 'Mosquera', 'Nariño', 'Olaya Herrera', 'Ospina', 'Policarpa', 'Potosí', 'Providencia', 'Puerres', 'Pupiales', 'Ricaurte', 'Roberto Payán', 'Samaniego', 'San Bernardo', 'San Lorenzo', 'San Pablo', 'San Pedro de Cartago', 'Sandoná', 'Santa Bárbara', 'Santacruz', 'Sapuyes', 'Taminango', 'Tangua', 'Tumaco', 'Túquerres', 'Yacuanquer'],
  'Norte de Santander': ['Cúcuta', 'Abrego', 'Arboledas', 'Bochalema', 'Bucarasica', 'Cácota', 'Cachirá', 'Chinácota', 'Chitagá', 'Convención', 'Cucutilla', 'Durania', 'El Carmen', 'El Tarra', 'El Zulia', 'Gramalote', 'Hacarí', 'Herrán', 'La Esperanza', 'La Playa de Belén', 'Labateca', 'Los Patios', 'Lourdes', 'Mutiscua', 'Ocaña', 'Pamplona', 'Pamplonita', 'Puerto Santander', 'Ragonvalia', 'Salazar', 'San Calixto', 'San Cayetano', 'Santiago', 'Sardinata', 'Silos', 'Teorama', 'Tibú', 'Toledo', 'Villa Caro', 'Villa del Rosario'],
  'Putumayo': ['Mocoa', 'Colón', 'Orito', 'Puerto Asís', 'Puerto Caicedo', 'Puerto Guzmán', 'Leguízamo', 'San Francisco', 'San Miguel', 'Santiago', 'Sibundoy', 'Valle del Guamuez', 'Villagarzón'],
  'Quindío': ['Armenia', 'Buenavista', 'Calarcá', 'Circasia', 'Córdoba', 'Filandia', 'Génova', 'La Tebaida', 'Montenegro', 'Pijao', 'Quimbaya', 'Salento'],
  'Risaralda': ['Pereira', 'Apía', 'Balboa', 'Belén de Umbría', 'Dosquebradas', 'Guática', 'La Celia', 'La Virginia', 'Marsella', 'Mistrató', 'Pueblo Rico', 'Quinchía', 'Santa Rosa de Cabal', 'Santuario'],
  'San Andrés y Providencia': ['San Andrés', 'Providencia'],
  'Santander': ['Bucaramanga', 'Aguada', 'Albania', 'Aratoca', 'Barbosa', 'Barichara', 'Barrancabermeja', 'Betulia', 'Bolívar', 'Cabrera', 'California', 'Capitanejo', 'Carcasí', 'Cepitá', 'Cerrito', 'Charalá', 'Charta', 'Chima', 'Chipatá', 'Cimitarra', 'Concepción', 'Confines', 'Contratación', 'Coromoro', 'Curití', 'El Carmen de Chucurí', 'El Guacamayo', 'El Peñón', 'El Playón', 'Encino', 'Enciso', 'Florián', 'Floridablanca', 'Galán', 'Gámbita', 'Girón', 'Guaca', 'Guadalupe', 'Guapotá', 'Guavatá', 'Güepsa', 'Hato', 'Jesús María', 'Jordán', 'La Belleza', 'La Paz', 'Landázuri', 'Lebrija', 'Los Santos', 'Macaravita', 'Málaga', 'Matanza', 'Mogotes', 'Molagavita', 'Ocamonte', 'Oiba', 'Onzaga', 'Palmar', 'Palmas del Socorro', 'Páramo', 'Piedecuesta', 'Pinchote', 'Puente Nacional', 'Puerto Parra', 'Puerto Wilches', 'Rionegro', 'Sabana de Torres', 'San Andrés', 'San Benito', 'San Gil', 'San Joaquín', 'San José de Miranda', 'San Miguel', 'San Vicente de Chucurí', 'Santa Bárbara', 'Santa Helena del Opón', 'Simacota', 'Socorro', 'Suaita', 'Sucre', 'Suratá', 'Tona', 'Valle de San José', 'Vélez', 'Vetas', 'Villanueva', 'Zapatoca'],
  'Sucre': ['Sincelejo', 'Buenavista', 'Caimito', 'Chalán', 'Colosó', 'Corozal', 'Coveñas', 'El Roble', 'Galeras', 'Guaranda', 'La Unión', 'Los Palmitos', 'Majagual', 'Morroa', 'Ovejas', 'Palmito', 'Sampués', 'San Benito Abad', 'San Juan de Betulia', 'San Marcos', 'San Onofre', 'San Pedro', 'Sincé', 'Sucre', 'Tolú', 'Tolú Viejo'],
  'Tolima': ['Ibagué', 'Alpujarra', 'Alvarado', 'Ambalema', 'Anzoátegui', 'Ataco', 'Cajamarca', 'Carmen de Apicalá', 'Casabianca', 'Chaparral', 'Coello', 'Coyaima', 'Cunday', 'Dolores', 'Espinal', 'Falan', 'Flandes', 'Fresno', 'Guamo', 'Herveo', 'Honda', 'Icononzo', 'Lérida', 'Líbano', 'Mariquita', 'Melgar', 'Murillo', 'Natagaima', 'Ortega', 'Palocabildo', 'Piedras', 'Planadas', 'Prado', 'Purificación', 'Rioblanco', 'Roncesvalles', 'Rovira', 'Saldaña', 'San Antonio', 'San Luis', 'Santa Isabel', 'Suárez', 'Valle de San Juan', 'Venadillo', 'Villahermosa', 'Villarrica'],
  'Valle del Cauca': ['Cali', 'Alcalá', 'Andalucía', 'Ansermanuevo', 'Argelia', 'Bolívar', 'Buenaventura', 'Buga', 'Bugalagrande', 'Caicedonia', 'Calima', 'Candelaria', 'Cartago', 'Dagua', 'El Águila', 'El Cairo', 'El Cerrito', 'El Dovio', 'Florida', 'Ginebra', 'Guacarí', 'Jamundí', 'La Cumbre', 'La Unión', 'La Victoria', 'Obando', 'Palmira', 'Pradera', 'Restrepo', 'Riofrío', 'Roldanillo', 'San Pedro', 'Sevilla', 'Toro', 'Trujillo', 'Tuluá', 'Ulloa', 'Versalles', 'Vijes', 'Yotoco', 'Yumbo', 'Zarzal'],
  'Vaupés': ['Mitú', 'Carurú', 'Pacoa', 'Taraira', 'Papunaua', 'Yavaraté'],
  'Vichada': ['Puerto Carreño', 'La Primavera', 'Santa Rosalía', 'Cumaribo']
};

function Personal({ onFormSubmit, formNames }) {
  const { user, profile, loading, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    document: '',
    identification_type: '',
    birth_date: '',
    gender: '',
    ethnic_group: '',
    disability: '',
    phone_number: '',
    highest_education_level: '',
    company_type: '',
    company_name: '',
    company_nit: '',
    previous_business: '',
    operation_start_year: '',
    registered_in_ccc: '',
    main_office_department: '',
    main_office_municipality: '',
    business_sector: '',
    product_type: '',
    client_focus: '',
    market_reach: '',
    business_size: '',
    data_consent: false,
  });

  const [errors, setErrors] = useState({});
  const [municipiosOptions, setMunicipiosOptions] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (profile) {
      const {
        full_name,
        email,
        document,
        user_id,
        data_consent,
        ...profileData
      } = profile;

      setFormData(prevFormData => ({
        ...prevFormData,
        ...profileData,
        user_name: user.full_name || '',
        email: user.email || '',
        document: user.document || '',
      }));

      if (profile.main_office_department) {
        setMunicipiosOptions(municipios[profile.main_office_department] || []);
      }
    }
  }, [profile, user]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
    validateField(name, type === 'checkbox' ? checked : value);

    if (name === 'main_office_department') {
      setMunicipiosOptions(municipios[value] || []);
      setFormData(prevFormData => ({
        ...prevFormData,
        main_office_municipality: ''
      }));
    }
  };

  const validateField = (name, value) => {
    let tempErrors = { ...errors };
    const currentDate = new Date();

    switch (name) {
      case 'phone_number':
      case 'company_nit':
        tempErrors[name] = /^[0-9\- ]+$/.test(value) ? '' : 'Solo se permiten caracteres numéricos y símbolos específicos';
        break;
      case 'birth_date':
      case 'operation_start_year':
        const inputDate = new Date(value);
        tempErrors[name] = (inputDate <= currentDate) ? '' : 'La fecha no puede ser futura';
        break;
      default:
        tempErrors[name] = value ? '' : 'Este campo es obligatorio';
        break;
    }
    setErrors(tempErrors);
  };

  const validateForm = () => {
    let tempErrors = {};
    const currentDate = new Date();

    Object.keys(formData).forEach(key => {
      if (key === 'phone_number' || key === 'company_nit') {
        if (!/^[0-9\- ]+$/.test(formData[key])) {
          tempErrors[key] = 'Solo se permiten caracteres numéricos y símbolos específicos';
        }
      }

      if ((key === 'birth_date' || key === 'operation_start_year') && formData[key]) {
        const inputDate = new Date(formData[key]);
        if (inputDate > currentDate) {
          tempErrors[key] = 'La fecha no puede ser futura';
        }
      }
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm() && formData.data_consent) {
      try {
        console.log('Submitting formData:', formData);
        const updatedProfile = await updateUserProfile(user.token, formData);
        alert('Perfil actualizado con éxito');
  
        updateProfile(updatedProfile);
  
        if (onFormSubmit) {
          onFormSubmit(formData);
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        alert(`Ocurrió un error al actualizar el perfil: ${error.message}`);
      }
    } else {
      console.error("Validation errors", errors);
    }
  };

  if (loading || !user) {
    return <p>Cargando...</p>;
  }

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
                  <label htmlFor="full_name" className="form-label">
                    Nombre del emprendedor/empresario *
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    placeholder="Ingresar nombre completo"
                    required
                    className="form-input"
                    value={formData.user_name}
                    readOnly
                  />
                </div>

                <div className='options__information--label'>
                  <label htmlFor="document" className="form-label">
                    Número de identificación *
                  </label>
                  <input
                    type='text'
                    id="document"
                    name="document"
                    placeholder="Ingresar número de identificación"
                    required
                    className="form-input"
                    value={formData.document}
                    readOnly
                  />
                </div>

                <div className='options__information--label'>
                  <label htmlFor="ethnic_group" className="form-label">
                    Se autorreconoce o pertenece a alguno de estos grupos étnicos * {errors.ethnic_group && <span className="error-message">{errors.ethnic_group}</span>}
                  </label>
                  <select
                    id="ethnic_group"
                    name="ethnic_group"
                    required
                    className="form-select"
                    value={formData.ethnic_group}
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
                  <label htmlFor="phone_number" className="form-label">
                    Teléfono/celular de contacto * {errors.phone_number && <span className="error-message">{errors.phone_number}</span>}
                  </label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    placeholder="Ingresar número de contacto"
                    required
                    className="form-input"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="options__information--labels">

                <div className='options__information--label'>
                  <label htmlFor="company_type" className="form-label">
                    Tipo de Análisis * {errors.company_type && <span className="error-message">{errors.company_type}</span>}
                  </label>
                  <select
                    id="company_type"
                    name="company_type"
                    required
                    className="form-select"
                    value={formData.company_type}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione tipo de análisis</option>
                    {formNames.map((formName, index) => (
                      <option key={index} value={formName}>{formName}</option>
                    ))}
                  </select>
                </div>

                <div className='options__information--label'>
                  <label htmlFor="birth_date" className="form-label">
                    Fecha de nacimiento * {errors.birth_date && <span className="error-message">{errors.birth_date}</span>}
                  </label>
                  <input
                    type="date"
                    id="birth_date"
                    name="birth_date"
                    required
                    className="form-input"
                    value={formData.birth_date}
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
                    <option value="multiple">Múltiple</option>
                    <option value="sensorial_auditiva">Sensorial Auditiva</option>
                    <option value="sensorial_física">Sensorial Física</option>
                    <option value="sensorial_visual">Sensorial Visual</option>
                    <option value="ninguna">Ninguna</option>
                  </select>
                </div>

                <div className='options__information--label'>
                  <label htmlFor="highest_education_level" className="form-label">
                    Nivel educativo más alto que has completado * {errors.highest_education_level && <span className="error-message">{errors.highest_education_level}</span>}
                  </label>
                  <select
                    id="highest_education_level"
                    name="highest_education_level"
                    required
                    className="form-select"
                    value={formData.highest_education_level}
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
                  <label htmlFor="identification_type" className="form-label">
                    Tipo de documento de identificación * {errors.identification_type && <span className="error-message">{errors.identification_type}</span>}
                  </label>
                  <select
                    id="identification_type"
                    name="identification_type"
                    required
                    className="form-select"
                    value={formData.identification_type}
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

                <div className='options__information--label'>
                  <label htmlFor="email" className="form-label">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@example.com"
                    required
                    className="form-input"
                    value={formData.email}
                    readOnly
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
                  <label htmlFor="company_name" className="form-label">
                    Nombre de empresa * {errors.company_name && <span className="error-message">{errors.company_name}</span>}
                  </label>
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    placeholder="Ingrese el nombre de la empresa"
                    required
                    className="form-input"
                    value={formData.company_name}
                    onChange={handleChange}
                  />
                </div>

                <div className='options__information--label'>
                  <label htmlFor="operation_start_year" className="form-label">
                    Año en el que inició operaciones * {errors.operation_start_year && <span className="error-message">{errors.operation_start_year}</span>}
                  </label>
                  <input
                    type="date"
                    id="operation_start_year"
                    name="operation_start_year"
                    required
                    className="form-input"
                    value={formData.operation_start_year}
                    onChange={handleChange}
                  />
                </div>

                <div className='options__information--label'>
                  <label htmlFor="main_office_municipality" className="form-label">
                    Municipio donde se ubica la sede principal de la empresa * {errors.main_office_municipality && <span className="error-message">{errors.main_office_municipality}</span>}
                  </label>
                  <select
                    id="main_office_municipality"
                    name="main_office_municipality"
                    required
                    className="form-select"
                    value={formData.main_office_municipality}
                    onChange={handleChange}
                    disabled={!formData.main_office_department}
                  >
                    <option value="" disabled>Seleccione municipio</option>
                    {municipiosOptions.map(municipio => (
                      <option key={municipio} value={municipio}>{municipio}</option>
                    ))}
                  </select>
                </div>

                <div className='options__information--label'>
                  <label htmlFor="market_reach" className="form-label">
                    ¿Cuál es el tipo de mercado al que llega actualmente tu emprendimiento? * {errors.market_reach && <span className="error-message">{errors.market_reach}</span>}
                  </label>
                  <select
                    id="market_reach"
                    name="market_reach"
                    required
                    className="form-select"
                    value={formData.market_reach}
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
                  <label htmlFor="company_nit" className="form-label">
                    NIT de empresa (O número de documento en caso de no tenerlo) * {errors.company_nit && <span className="error-message">{errors.company_nit}</span>}
                  </label>
                  <input
                    type="text"
                    id="company_nit"
                    name="company_nit"
                    placeholder={errors.company_nit || 'Ej: 51059231-9'}
                    required
                    className="form-input"
                    value={formData.company_nit}
                    onChange={handleChange}
                  />
                </div>

                <div className='options__information--label'>
                  <label htmlFor="registered_in_ccc" className="form-label">
                    Seleccione la cámara de comercio donde se encuentra matriculado * {errors.registered_in_ccc && <span className="error-message">{errors.registered_in_ccc}</span>}
                  </label>
                  <select
                    id="registered_in_ccc"
                    name="registered_in_ccc"
                    required
                    className="form-select"
                    value={formData.registered_in_ccc}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione una opción</option>
                    <option value="cámara de comercio de bogotá">Cámara de Comercio de Bogotá</option>
                    <option value="cámara de comercio de buga">Cámara de Comercio de Buga</option>
                    <option value="cámara de comercio de cali">Cámara de Comercio de Cali</option>
                    <option value="cámara de comercio de ibagué">Cámara de Comercio de Ibagué</option>
                    <option value="cámara de comercio de casanare">Cámara de Comercio de Casanare</option>
                    <option value="cámara de comercio de cartago">Cámara de Comercio de Cartago</option>
                    <option value="cámara de comercio de medellín para antioquia">Cámara de Comercio de Medellín para Antioquia</option>
                    <option value="cámara de comercio de bucaramanga">Cámara de Comercio de Bucaramanga</option>
                    <option value="cámara de comercio de santa marta">Cámara de Comercio de Santa Marta</option>
                    <option value="cámara de comercio de manizales">Cámara de Comercio de Manizales</option>
                    <option value="cámara de comercio de cúcuta">Cámara de Comercio de Cúcuta</option>
                    <option value="cámara de comercio de montería">Cámara de Comercio de Montería</option>
                    <option value="cámara de comercio de barranquilla">Cámara de Comercio de Barranquilla</option>
                    <option value="cámara de comercio del huila">Cámara de Comercio del Huila</option>
                    <option value="cámara de comercio de cartagena">Cámara de Comercio de Cartagena</option>
                    <option value="cámara de comercio del oriente antioqueño">Cámara de Comercio del Oriente Antioqueño</option>
                    <option value="cámara de comercio del magdalena medio y nordeste antioqueño">Cámara de Comercio del Magdalena Medio y Nordeste Antioqueño</option>
                    <option value="cámara de comercio de palmira">Cámara de Comercio de Palmira</option>
                    <option value="cámara de comercio de armenia">Cámara de Comercio de Armenia</option>
                    <option value="cámara de comercio de buenaventura">Cámara de Comercio de Buenaventura</option>
                    <option value="cámara de comercio del cauca">Cámara de Comercio del Cauca</option>
                    <option value="cámara de comercio de tuluá">Cámara de Comercio de Tuluá</option>
                    <option value="cámara de comercio de pereira">Cámara de Comercio de Pereira</option>
                    <option value="cámara de comercio aburrá sur">Cámara de Comercio Aburrá Sur</option>
                    <option value="cámara de comercio de villavicencio">Cámara de Comercio de Villavicencio</option>
                    <option value="ninguna">Ninguna</option>
                  </select>
                </div>

                <div className='options__information--label'>
                  <label htmlFor="business_sector" className="form-label">
                    ¿Cuál es el sector principal en el que se encuentra tu empresa? * {errors.business_sector && <span className="error-message">{errors.business_sector}</span>}
                  </label>
                  <select
                    id="business_sector"
                    name="business_sector"
                    required
                    className="form-select"
                    value={formData.business_sector}
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
                  <label htmlFor="business_size" className="form-label">
                    ¿De qué tamaño es tu empresa? * {errors.business_size && <span className="error-message">{errors.business_size}</span>}
                  </label>
                  <select
                    id="business_size"
                    name="business_size"
                    required
                    className="form-select"
                    value={formData.business_size}
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
                  <label htmlFor="previous_business" className="form-label">
                    Antes de este emprendimiento/negocio/empresa, ¿Habías creado otra empresa? * {errors.previous_business && <span className="error-message">{errors.previous_business}</span>}
                  </label>
                  <select
                    id="previous_business"
                    name="previous_business"
                    required
                    className="form-select"
                    value={formData.previous_business}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className='options__information--label'>
                  <label htmlFor="main_office_department" className="form-label">
                    Departamento donde se ubica la sede principal de la empresa * {errors.main_office_department && <span className="error-message">{errors.main_office_department}</span>}
                  </label>
                  <select
                    id="main_office_department"
                    name="main_office_department"
                    required
                    className="form-select"
                    value={formData.main_office_department}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione departamento</option>
                    {departamentos.map(departamento => (
                      <option key={departamento} value={departamento}>{departamento}</option>
                    ))}
                  </select>
                </div>

                <div className='options__information--label'>
                  <label htmlFor="client_focus" className="form-label">
                    ¿Cuál es el tipo de cliente en el que se enfoca tu empresa? * {errors.client_focus && <span className="error-message">{errors.client_focus}</span>}
                  </label>
                  <select
                    id="client_focus"
                    name="client_focus"
                    required
                    className="form-select"
                    value={formData.client_focus}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione el tipo de cliente</option>
                    <option value="B2B">Su principal cliente es otra empresa (B2B)</option>
                    <option value="B2C">Sus principales clientes son consumidores o el usuario final (B2C)</option>
                    <option value="B2G">Sus principales clientes son entes u organizaciones del gobierno (B2G)</option>
                  </select>
                </div>

                <div className='options__information--label'>
                  <label htmlFor="product_type" className="form-label">
                    ¿Qué tipo de productos y/o servicios ofrece tu empresa? * {errors.product_type && <span className="error-message">{errors.product_type}</span>}
                  </label>
                  <select
                    id="product_type"
                    name="product_type"
                    required
                    className="form-select"
                    value={formData.product_type}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione el tipo de producto o servicio</option>
                    <option value="productos_bienes_fisicos">Productos o bienes físicos</option>
                    <option value="productos_bienes_no_fisicos">Productos o bienes no físicos</option>
                    <option value="servicios">Servicios</option>
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
              política de tratamiento de datos personales que puede <a className='data__treatment--text' href="https://www.ccc.org.co/wp-content/uploads/2024/05/Tratamiento-de-datos_autodignostico_digitalizate.pdf" target="_blank" rel="noopener noreferrer"> consultar aquí</a>.
            </p>
            <div className='data__treatment--check'>
              <input
                type="checkbox"
                id="data_consent"
                name="data_consent"
                checked={formData.data_consent}
                onChange={handleChange}
              />
              <label htmlFor="data_consent" style={{ paddingLeft: '5px' }}>
                Autorizo tratamiento de datos personales. {!formData.data_consent && (<span className="error-message">Debe autorizar el tratamiento de los datos personales para continuar.</span>)}
              </label>
            </div>
          </div>
          <div className='button__container'>
            <button type="submit" className="form-submit-button" disabled={!formData.data_consent}>Continuar con el autodiagnóstico</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Personal;