import React, { useState } from 'react';
import '../../stylesheets/personal.css';
import figure from '../../img/svg/formulario_figure.svg';
import home from '../../img/svg/home.svg';
import arrow from '../../img/svg/arrow.svg';
import { Link } from 'react-router-dom';

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
  const [formData, setFormData] = useState({
    userName: '',
    analysisType: '',
    identificationType: '',
    identificationNumber: '',
    birthDate: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    companyNIT: '',
    operationStartYear: '',
    mainOfficeDepartment: '',
    mainOfficeMunicipality: '',
    marketReach: '',
    dataConsent: false
  });

  const [errors, setErrors] = useState({});
  const [municipiosOptions, setMunicipiosOptions] = useState([]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
    validateField(name, type === 'checkbox' ? checked : value);

    if (name === 'mainOfficeDepartment') {
      setMunicipiosOptions(municipios[value] || []);
      setFormData(prevFormData => ({
        ...prevFormData,
        mainOfficeMunicipality: ''
      }));
    }
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
        tempErrors[name] = /^[0-9\- ]+$/.test(value) ? '' : 'Solo se permiten caracteres numéricos y símbolos específicos';
        break;
      case 'birthDate':
      case 'operationStarYear':
        const inputDate = new Date(value);
        tempErrors[name] = (inputDate <= currentDate) ? '' : 'La fecha no puede ser futura';
        break;
      default:
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
      if (!formData[key] && key !== 'dataConsent') {
        tempErrors[key] = 'Este campo es obligatorio';
      }

      if (key === 'email' && formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        tempErrors.email = 'Correo electrónico no válido';
      }

      if ((key === 'identificationNumber' || key === 'phoneNumber') &&
        !/^[0-9\- ]+$/.test(formData[key])) {
        tempErrors[key] = 'Solo se permiten caracteres numéricos y símbolos específicos';
      }

      if (key === 'birthDate' && formData[key]) {
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

              </div>

              <div className="options__information--labels">

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

              <div className="options__information--labels">

                <div className='options__information--label'>
                  <label htmlFor="analysisType" className="form-label">
                    Tipo de Análisis * {errors.analysisType && <span className="error-message">{errors.analysisType}</span>}
                  </label>
                  <select
                    id="analysisType"
                    name="analysisType"
                    required
                    className="form-select"
                    value={formData.analysisType}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione tipo de análisis</option>
                    {formNames.map((formName, index) => (
                      <option key={index} value={formName}>{formName}</option>
                    ))}
                  </select>
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
                  <label htmlFor="companyNIT" className="form-label">
                    NIT de empresa (O número de documento en caso de no tenerlo) * {errors.companyNIT && <span className="error-message">{errors.companyNIT}</span>}
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

              </div>

              <div className="options__information--labels">

                <div className='options__information--label'>
                  <label htmlFor="mainOfficeDepartment" className="form-label">
                    Departamento donde se ubica la sede principal de la empresa * {errors.mainOfficeDepartment && <span className="error-message">{errors.mainOfficeDepartment}</span>}
                  </label>
                  <select
                    id="mainOfficeDepartment"
                    name="mainOfficeDepartment"
                    required
                    className="form-select"
                    value={formData.mainOfficeDepartment}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione departamento</option>
                    {departamentos.map(departamento => (
                      <option key={departamento} value={departamento}>{departamento}</option>
                    ))}
                  </select>
                </div>

                <div className='options__information--label'>
                  <label htmlFor="mainOfficeMunicipality" className="form-label">
                    Municipio donde se ubica la sede principal de la empresa * {errors.mainOfficeMunicipality && <span className="error-message">{errors.mainOfficeMunicipality}</span>}
                  </label>
                  <select
                    id="mainOfficeMunicipality"
                    name="mainOfficeMunicipality"
                    required
                    className="form-select"
                    value={formData.mainOfficeMunicipality}
                    onChange={handleChange}
                    disabled={!formData.mainOfficeDepartment}
                  >
                    <option value="" disabled>Seleccione municipio</option>
                    {municipiosOptions.map(municipio => (
                      <option key={municipio} value={municipio}>{municipio}</option>
                    ))}
                  </select>
                </div>

              </div>

              <div className="options__information--labels">            

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

            </div>
                  
          </div>

          <div className='data__treatment'>
            <p className='data__treatment--text'>
              Autoriza a Wirk Consulting SAS como responsable del tratamiento de los datos personales,
              para la recolección, almacenamiento, uso, transmisión y/o transferencia de los datos personales
              suministrados en este formulario, para las finalidades dispuestas en la
              política de tratamiento de datos personales que puede <a className='data__treatment--text' href="https://www.wirkconsulting.com" target="noreferrer"> consultar aquí</a>.
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

export default Personal;