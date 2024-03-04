import Rating from '@mui/material/Rating';
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { API_URL } from '../../api';
import { React } from 'react';

export default function Workoutcard({ workout }) {
    /* // Provavelmente deverá ser feito no CategoriesBar.jsx, não é boa ideia fazer aqui....
    const [shownUsernames, setShownUsernames] = React.useState([]);
    console.log(workout.PTUsername);
    // Adiciona o username à lista de usernames mostrados
    const addUsernameToShownList = (username) => {
        console.log('Adicionando username à lista de usernames mostrados');
        setShownUsernames(prevUsernames => [...prevUsernames, username]);
        console.log(shownUsernames);
    };
    // Verifica se o username já foi mostrado anteriormente
    const isUsernameShown = (username) => {
        console.log('Checando se username já foi mostrado');
        console.log(shownUsernames.includes(username));
        return shownUsernames.includes(username);
    };
    // Adiciona o username à lista de usernames mostrados uma única vez após o componente ser montado
    React.useEffect(() => {
        if (workout.PTUsername && !isUsernameShown(workout.PTUsername)) {
            addUsernameToShownList(workout.PTUsername);
            
        }
    }, [workout.PTUsername, shownUsernames]);
    */
    // Renderiza o componente
    // console.log(workout.path)

    return (
        <>
            <p>{workout.PTUsername}</p>

            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src={`${API_URL}/images/${workout.thumbnail}`} style={{ width: "400px", height: "260px" }} alt="workout-image" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{workout.title}</h2>
                    <p>{workout.duration}</p>
                    <p>{workout.releasedate}</p>
                    <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                    >
                        <Rating name="read-only" value={workout.rating} readOnly />
                    </Box>
                    <div className="card-actions justify-between items-end">
                        <div className="flex flex-row gap-2">
                            {workout.mainMuscles.map((muscle, index) => (
                                <div key={index} className="badge badge-lg">{muscle}</div>
                            ))}
                        </div>
                        <Link to={`/video/${workout.id}`} ><button className="btn btn-primary"><FaPlay />Check it out!</button></Link>
                    </div>
                </div>
            </div>
        </>
    );
}
