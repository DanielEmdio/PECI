import Workoutcard from "../../Components/Home/Workoutcard";
import { useState, useEffect } from "react";
import * as utils from "../../Utils/utils";
import { api } from '../../api';

export default function CategoriesBar() {
    const [activeButton, setActiveButton] = useState("all");
    const [mockedData, setMockedData] = useState([]);

    useEffect(() => {
        api.post("/videos/getAccessibleVideos", { token: utils.getCookie("token") }).then((r) => {
            const data = r.data;
            console.log(data.videos);
            let newMockedData = [];
            data.videos.forEach(element => {
                newMockedData.push({
                    id: element.id,
                    title: element.title,
                    thumbnail: element.thumbnail,
                    duration: element.duration,                             
                    rating: element.rating,
                    releasedate: element.releasedate,
                    difficulty: element.difficulty,                         
                    mainMuscles: element.mainMuscles.split(","),
                })
            });

            setMockedData(newMockedData);
        }).catch((_) => { });
    }, []);

    const popularClick = (e) => {
        e.preventDefault();
        setActiveButton("popular");
        console.log('The link was clicked.');

        api.post("/videos/getAccessibleVideos", { token: utils.getCookie("token") }).then((r) => {
            const data = r.data;
            console.log("popular videos: ", data.videos);
            let newMockedData = [];
            data.videos.forEach(element => {
                newMockedData.push({
                    id: element.id,
                    title: element.title,
                    thumbnail: element.thumbnail,
                    duration: element.duration,                             // deverá ser ajustado
                    rating: element.rating,
                    releasedate: element.releasedate,
                    difficulty: element.dificulty,                                  // deverá ser ajustado
                    mainMuscles: element.mainMuscles.split(","),
                })
            });

            // Ordenar por rating
            newMockedData.sort((a, b) => b.rating - a.rating);

            setMockedData(newMockedData);
        }).catch((_) => { });
    }

    const recentClick = (e) => {
        e.preventDefault();
        setActiveButton("recent");
        console.log('The link was clicked.');

        api.post("/videos/getAccessibleVideos", { token: utils.getCookie("token") }).then((r) => {
            const data = r.data;
            console.log("recent videos: ", data.videos);
            let newMockedData = [];
            data.videos.forEach(element => {
                newMockedData.push({
                    id: element.id,
                    title: element.title,
                    thumbnail: element.thumbnail,
                    duration: element.duration,                             // deverá ser ajustado
                    rating: element.rating,
                    releasedate: element.releasedate,
                    difficulty: element.difficulty,                                  // deverá ser ajustado
                    mainMuscles: element.mainMuscles.split(","),
                })
            });

            // Ordenar por release date
            newMockedData.sort((a, b) => {
                const dateA = convertToDate(a.releasedate);
                const dateB = convertToDate(b.releasedate);
                return dateB - dateA;
            });


            setMockedData(newMockedData);
        }).catch((_) => { });
    }

    // Função para converter string de data no formato "DD-MM-YYYY" para um objeto Date
    function convertToDate(dateString) {
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
    }

    const exclusiveClick = (e) => {
        e.preventDefault();
        setActiveButton("exclusive");
        console.log('The link was clicked.');

        api.post("/videos/getPTPreVideos", { token: utils.getCookie("token") }).then((r) => {
            const data = r.data;
            console.log("exclusive videos: ", data.videos);
            let newMockedData = [];
            data.videos.forEach(element => {
                newMockedData.push({
                    id: element.id,
                    title: element.title,
                    thumbnail: element.thumbnail,
                    duration: element.duration,                             // deverá ser ajustado
                    rating: element.rating,
                    releasedate: element.releasedate,
                    PTUsername: element.username,
                    difficulty: element.dificulty,                                  // deverá ser ajustado
                    mainMuscles: element.mainMuscles.split(","),
                })
            });

            setMockedData(newMockedData);
        }).catch((_) => { });
    }

    const AllClick = (e) => {
        e.preventDefault();
        setActiveButton("all");
        console.log('The link was clicked.');

        api.post("/videos/getAccessibleVideos", { token: utils.getCookie("token") }).then((r) => {
            const data = r.data;
            console.log(data.videos);
            let newMockedData = [];
            data.videos.forEach(element => {
                newMockedData.push({
                    id: element.id,
                    title: element.title,
                    thumbnail: element.thumbnail,
                    duration: element.duration,                             // deverá ser ajustado
                    rating: element.rating,
                    releasedate: element.releasedate,
                    difficulty: element.dificulty,                                  // deverá ser ajustado
                    mainMuscles: element.mainMuscles.split(","),
                })
            }); 

            //console.log(newMockedData);

            setMockedData(newMockedData);
        }).catch((_) => { });
    }

    return (
        <>
            <div className="navbar bg-base-100 rounded-xl my-10">
                <a onClick={AllClick} className={`btn btn-ghost text-xl ${activeButton === "all" ? "active" : ""}`}>All</a>
                <a onClick={popularClick} className={`btn btn-ghost text-xl ${activeButton === "popular" ? "active" : ""}`}>Popular</a>
                <a onClick={recentClick} className={`btn btn-ghost text-xl ${activeButton === "recent" ? "active" : ""}`}>Recent</a>
                <a onClick={exclusiveClick} className={`btn btn-ghost text-xl ${activeButton === "exclusive" ? "active" : ""}`}>Exclusive</a>
            </div>
            <div className="flex flex-col gap-4">
                {(mockedData.length === 0) ? (
                    <div className='text-center'>No videos available.</div>
                ) : (
                    mockedData.map((workout, index) => (
                        <Workoutcard key={index} workout={workout} />
                    )))}
            </div>
        </>
    )
}
