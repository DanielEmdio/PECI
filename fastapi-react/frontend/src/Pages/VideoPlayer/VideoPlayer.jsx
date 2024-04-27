import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
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
        username: "",
        path: "",
        title: "",
        rating: "",
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
                username: element.username,
                path: element.videopath,
                title: element.videoname,
                rating: element.rating,
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
            <div style={{backgroundColor: 'rgb(200, 200, 200)', display: 'flex', justifyContent: 'center' }}>
                <ReactPlayer
                    url={`${API_URL}/videos/${video.path}`}
                    width="70%"
                    height="100%"
                    controls
                />
            </div>
            <p><br></br></p>
            <div className=" w-11/12 mx-auto" style={{marginBottom: '30px'}}>
                <p style={{ fontSize: '2.5em' }}>{video.title}</p>
                <p>{video.releasedate}</p>
                <p style={{marginTop: '20px'}}>DEVE DIZER O NOME DO PT AQUI</p>
            </div>

            <div className=" w-11/12 mx-auto" style={{ backgroundColor: 'rgb(220, 220, 220)', padding: '5px', borderRadius: '5px' }}>
                <p style={{fontSize: '1.2em', marginBottom: '10px', textDecoration: 'underline', fontWeight: 'bold' }}>Description</p>
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

            <div className=" w-11/12 mx-auto">
                <p style={{fontSize: '1.2em', marginBottom: '10px', marginTop: '30px', textDecoration: 'underline', fontWeight: 'bold' }}>Reviews</p>
                <Box
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                >
                    {<Rating name="read-only" value={video.rating} size="large" readOnly />}
                </Box>
            </div>
        </div>
    );
}

export default VideoPlayer;
