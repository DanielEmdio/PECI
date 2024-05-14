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
    const { WorkoutID } = useParams();
    const [workout, setWorkout] = useState({
        pt_id: "",
        releasedate: "",
    });

    // const [video, setVideo] = useState({
    //     path: "",
    //     title: "",
    //     rating: "",
    //     //thumbnail: "",
    //     description: ""
    // });

    const [exercises, setExercises] = useState([]);
    const [video, setVideo] = useState({
        path: "",
        title: "",
        rating: "",
        description: ""
    });
    const [videoIdx, setVideoIdx] = useState(-1);
    // Texto de exemplo da descrição
    // const description = "Esta é a descrição do vídeo. Aqui pode ir um texto mais longo que explique o conteúdo do vídeo, detalhes sobre a produção, créditos, ou qualquer outra informação relevante que você queira incluir.";
    // Função para alternar a visibilidade

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        api.post(`/workouts/getWorkoutInfo?workout_id=${WorkoutID}`, { token: utils.getCookie("token") }).then((r) => {
            const data = r.data;
            console.log("workout: ", data);
            const workout_info = data.workout;
            setWorkout({
                pt_id: workout_info.personal_trainer_id,
                releasedate: workout_info.releasedate,
            });
        }).catch((_) => { });
    }, [WorkoutID]);

    useEffect(() => {

        api.post(`/exercises/getWorkoutExercises?workout_id=${WorkoutID}`, { token: utils.getCookie("token") }).then((r) => {
            const data = r.data;
            console.log("workout_exercises: ", data);
            //const element = data.exercises[0];  // In this case, we are only interested in the first video
            //console.log("first_video: ", element)
            let videosInfo = [];
            data.exercises.forEach(element => {
                videosInfo.push({
                    path: element.path,
                    title: element.name,
                    rating: element.rating,
                    description: element.description,
                })
            });
            console.log("videosInfo: ",videosInfo);
            setExercises(videosInfo);
            setVideoIdx(0);
            console.log("videoIdx: ",videoIdx)
            setVideo(videosInfo[0])
        }).catch((_) => { });
    }, [WorkoutID]);



    

    /*
    // console.log("VideoID: ", VideoID);
    useEffect(() => {
        api.post(`/exercises/getVideoInfo?exercise_id=${VideoID}`, { token: utils.getCookie("token") }).then((r) => {
            const data = r.data;
            console.log("videodata: ", data);
            const element = data.video;
            setVideo({
                pt_id: element.personal_trainer_id,
                path: element.path,
                title: element.name,
                rating: element.rating,
                description: element.description,
            })
        }).catch((_) => { });
    }, [VideoID]);*/

    // get pt_name from pt_id
    const [pt_name, setPtName] = useState("");

    useEffect(() => {
        api.post(`/users/getPtById/${workout.pt_id}`, { token: utils.getCookie("token") }).then((r) => {
            console.log("pt_name: ", r);
            const data = r.data;
            setPtName(data["pt"]["name"]);
        }).catch((error) => {
            console.error(error);
        });
    }, [workout.pt_id]);


    const nextExercise = () => {
        const newIndex = videoIdx + 1;
        if (newIndex < exercises.length) {
            setVideoIdx(newIndex);
            setVideo(exercises[newIndex]);
        }
        else {
            alert("Workout completed!");
            window.location.href = "/";
        }
    }

    const previousExercise = () => {
        const newIndex = videoIdx - 1;
        if (newIndex >= 0) {
            setVideoIdx(newIndex);
            setVideo(exercises[newIndex]);
        }
    }

    return (
        <div>
            <br />
            <div style={{ backgroundColor: 'rgb(200, 200, 200)', display: 'flex', justifyContent: 'center' }}>
                <ReactPlayer
                    url={`${API_URL}/exercises/${video.path}`}
                    width="70%"
                    height="100%"
                    controls
                />
            </div>
            <p><br></br></p>
            <div className=" w-11/12 mx-auto" style={{ marginBottom: '30px' }}>
                <p style={{ fontSize: '2.5em' }}>{video.title}</p>
                <p>{workout.releasedate}</p>
                <p style={{ marginTop: '20px', fontSize: '1.5em' }} >{pt_name}</p>
            </div>

            <div className=" w-11/12 mx-auto" style={{ backgroundColor: 'rgb(220, 220, 220)', padding: '5px', borderRadius: '5px' }}>
                <p style={{ fontSize: '1.2em', marginBottom: '10px', textDecoration: 'underline', fontWeight: 'bold' }}>Description</p>
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
                <p style={{ fontSize: '1.2em', marginBottom: '10px', marginTop: '30px', textDecoration: 'underline', fontWeight: 'bold' }}>Reviews</p>
                <Box
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                >
                    {<Rating name="read-only" value={video.rating} size="large" readOnly />}
                </Box>
            </div>
            <div className="flex justify-center">
                {videoIdx > 0 ? 
                <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full w-full max-w-md" onClick={previousExercise} >
                    <p className="flex justify-center">
                        Previous exercise
                    </p>
                </button>
                : null}
                <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full w-full max-w-md" onClick={nextExercise} >
                    <p className="flex justify-center">
                        Complete exercise
                    </p>
                </button>
            </div>
        </div>
    );
}

export default VideoPlayer;
