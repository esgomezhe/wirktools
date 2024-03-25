import React from 'react';

const Popup = ({ children, isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            zIndex: 1000,
            width: '80%', // Esto mantiene el ancho relativo al ancho de la pantalla
            maxWidth: '400px', // Esto asegura que el popup no sea demasiado grande en pantallas anchas
            maxHeight: '90vh', // Esto asegura que el popup no sea demasiado alto, dejando espacio arriba y abajo
            overflowY: 'auto', // Esto añade un scrollbar si el contenido excede la altura del popup
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'justify',
            borderRadius: '0px', // Esto agrega bordes redondeados para un diseño más suave
        }}>
            {children}
            <button onClick={onClose} style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
            }}>×</button>
        </div>
    );
};

export default Popup;