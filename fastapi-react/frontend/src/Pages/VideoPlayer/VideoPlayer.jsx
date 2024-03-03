import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import api from '../../api';
import * as utils from "../../Utils/utils";

function VideoPlayer() {
    // Estado para controlar se a descrição está expandida ou não
    const [isExpanded, setIsExpanded] = useState(false);

    // Texto de exemplo da descrição
    const description = "Esta é a descrição do vídeo. Aqui pode ir um texto mais longo que explique o conteúdo do vídeo, detalhes sobre a produção, créditos, ou qualquer outra informação relevante que você queira incluir.";

    // Função para alternar a visibilidade
    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };
    const {VideoPath} = useParams();
    console.log("VideoPath: ",VideoPath);
    return (
        <div>
            <ReactPlayer
                url={`http://localhost:8000/videos/`+VideoPath}
                width="100%"
                height="100%"
                controls
                
                
            />
            <p><br></br></p>
            <div className=" w-11/12 mx-auto">
                <h2><b><u>Descrição do Vídeo</u></b></h2>
                {/* Renderiza a descrição com base no estado isExpanded */}
                <p>
                    {isExpanded ? description : `${description.substring(0, 100)}...`}
                </p>
                {/* Botão para expandir/retrair a descrição */}
                <button onClick={toggleDescription}>
                    {isExpanded ? 'Mostrar Menos' : 'Mostrar Mais'}
                </button>
            </div>
        </div>
    );
}

export default VideoPlayer;
