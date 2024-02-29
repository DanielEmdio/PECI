import React from 'react';

const PopupComponent = ({ onClose }) => {
    return (
        <div style={{ background: 'white', padding: '20px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}>
            <h2>Apagar conta</h2>
            <p>Tem a certeza que quer apagar a sua conta? Depois de confirmada, esta conta será impossível de recuperar.</p>
            <button
                style={{ backgroundColor: 'blue', color: 'white', margin: '10px', padding: '10px' }}
                onClick={() => alert('Conta apagada')}
            >
                Sim
            </button>
            <button
                style={{ backgroundColor: 'white', color: 'blue', margin: '10px', padding: '10px', border: '1px solid blue' }}
                onClick={() => alert('Conta não apagada')}
            >
                Não
            </button>
            <br />
            <button onClick={onClose}>Fechar</button>
        </div>
    );
};

export default PopupComponent;
