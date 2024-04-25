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
        api.post(`/videos/getVideoInfo?video_id=${VideoID}`, { token: utils.getCookie("token") }).then((r) => {
            const data = r.data;
            console.log("data: ", data);
            const element = data.video;
            setVideo({
                path: element.videopath,
                title: element.videoname,
                description: element.description,
                thumbnail: element.thumbnail,
                releasedate: element.releasedate,
            })

        }).catch((_) => { });
    }, [VideoID]);

    // console.log("path: ", video.path);

    return (
        <div>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ReactPlayer
                    url={`${API_URL}/videos/${video.path}`}
                    width="70%"
                    height="100%"
                    controls
                />
            </div>
            <p><br></br></p>
            <div className=" w-11/12 mx-auto">
                <h1><b><u>Video Title</u></b></h1>
                <p style={{ fontSize: '2em' }}>{video.title}</p>

                <h3><b><u>Creator</u></b></h3>
                <p>{}</p>

                <h3><b><u>Release Date</u></b></h3>
                <p>{video.releasedate}</p>

            </div>

            <div className=" w-11/12 mx-auto">
                <h2><b><u>Description</u></b></h2>
                {
                /* Renderiza a descrição com base no estado isExpanded */

                }
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
