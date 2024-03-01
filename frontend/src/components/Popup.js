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
            width: '80%',
            maxWidth: '400px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            {children}
            <button onClick={onClose} style={{ marginTop: '10px' }}>Cerrar</button>
        </div>
    );
};

export default Popup;