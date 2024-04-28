import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as utils from "../../Utils/utils";
import { api, API_URL } from '../../api';
import ReactPlayer from 'react-player';

function VideoPlayer() {
    // Estado para controlar se a descrição está expandida ou não
    const [isExpanded, setIsExpanded] = useState(false);
    const { VideoID } = useParams();
    const [video, setVideo] = useState({
        path: "",
        title: "",
        thumbnail: "",
        releasedate: "",
        description: ""
    });

    // Texto de exemplo da descrição
    //const description = "Esta é a descrição do vídeo. Aqui pode ir um texto mais longo que explique o conteúdo do vídeo, detalhes sobre a produção, créditos, ou qualquer outra informação relevante que você queira incluir.";
    // Função para alternar a visibilidade

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    // console.log("VideoID: ", VideoID);
    useEffect(() => {
        api.post(`/exercises/getVideoInfo?exercise_id=${VideoID}`, { token: utils.getCookie("token") }).then((r) => {
            const data = r.data;
            console.log("data: ", data);
            const element = data.video;
            setVideo({
                path: element.path,
                title: element.name,
                description: element.description,
            })

        }).catch((_) => { });
    }, [VideoID]);

    // console.log("path: ", video.path);

    return (
        <div>
            <br />
            <ReactPlayer
                url={`${API_URL}/exercises/${video.path}`}
                width="100%"
                height="100%"
                controls
            />
            <p><br></br></p>
            <div className=" w-11/12 mx-auto">
                <h2><b><u>Video Description</u></b></h2>
                {/* Renderiza a descrição com base no estado isExpanded */}
                <p>
                    {isExpanded ? video.description : `${video.description.substring(0, 100)}...`}
                </p>
                {/* Botão para expandir/retrair a descrição */}
                <button onClick={toggleDescription}>
                    {isExpanded ? 'Show Less' : 'Show More'}
                </button>
            </div>
        </div>
    );
}

export default VideoPlayer;
