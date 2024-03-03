import Workoutcard from "../../Components/Home/Workoutcard";
import * as utils from "../../Utils/utils";
import React, { useState, useEffect } from "react";
import api from '../../api';

export default function CategoriesBar() {
    const [mockedData, setMockedData] = useState([]);
    const [activeButton, setActiveButton] = useState("all");

    
    useEffect(() => {
        api.post("/videos/getAccessibleVideos", { token: utils.getCookie("token") }).then((r) => {
            const data = r.data;
            console.log(data.videos);
            let newMockedData = [];
            data.videos.forEach(element => {
                newMockedData.push({
                    path: element.path,
                    title: element.title,
                    thumbnail: element.thumbnail,
                    duration: "30 min",                             // deverá ser ajustado
                    rating: element.rating,
                    releasedate: element.releasedate,
                    difficulty: 4,                                  // deverá ser ajustado
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
            console.log(data.videos);
            let newMockedData = [];
            data.videos.forEach(element => {
                newMockedData.push({
                    path: element.path,
                    title: element.title,
                    thumbnail: element.thumbnail,    
                    duration: "30 min",                             // deverá ser ajustado
                    rating: element.rating,
                    releasedate: element.releasedate,
                    difficulty: 4,                                  // deverá ser ajustado
                    mainMuscles: element.mainMuscles.split(","),
                })
            });
            
            // Ordenar por rating
            newMockedData.sort((a, b) => b.rating - a.rating);

            setMockedData(newMockedData);
        }).catch((_) => { });
        
        /*
        // Dados fictícios de exemplo
        const mockVideos = [
            { 
                title: "Video 1", 
                thumbnail: "https://picsum.photos/200/200",
                duration: "30 min",
                rating: element.rating,
                releasedate: "12-01-2003",
                difficulty: 4,
                mainMuscles: ["Muscle A", "Muscle B"]
            },
            { 
                title: "Video 2", 
                thumbnail: "https://picsum.photos/200/200",
                duration: "25 min",
                rating: element.rating,
                releasedate: "25-03-2005",
                difficulty: 3,
                mainMuscles: ["Muscle C", "Muscle D"]
            },
            { 
                title: "Video 3", 
                thumbnail: "https://picsum.photos/200/200",
                duration: "40 min",
                rating: element.rating,
                releasedate: "05-08-2001",
                difficulty: 5,
                mainMuscles: ["Muscle E", "Muscle F"]
            }
        ];

        // Copia os dados fictícios para newMockedData
        let newMockedData = [...mockVideos];

        // Ordena newMockedData por rating
        newMockedData.sort((a, b) => b.rating - a.rating);

        setMockedData(newMockedData);
        */
    }

    const recentClick = (e) => {
        e.preventDefault();
        setActiveButton("recent");
        console.log('The link was clicked.');
        
        api.post("/videos/getAccessibleVideos", { token: utils.getCookie("token") }).then((r) => {
            const data = r.data;
            console.log(data.videos);
            let newMockedData = [];
            data.videos.forEach(element => {
                newMockedData.push({
                    path: element.path,
                    title: element.title,
                    thumbnail: element.thumbnail,
                    duration: "30 min",                             // deverá ser ajustado
                    rating: element.rating,
                    releasedate: element.releasedate,
                    difficulty: 4,                                  // deverá ser ajustado
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
        
        /*
        // Dados fictícios de exemplo
        const mockVideos = [
            { 
                title: "Video 1", 
                thumbnail: "https://picsum.photos/200/200",
                duration: "30 min",
                rating: element.rating,
                releasedate: "12-01-2003",
                difficulty: 4,
                mainMuscles: ["Muscle A", "Muscle B"]
            },
            { 
                title: "Video 2", 
                thumbnail: "https://picsum.photos/200/200",
                duration: "25 min",
                rating: element.rating,
                releasedate: "25-03-2005",
                difficulty: 3,
                mainMuscles: ["Muscle C", "Muscle D"]
            },
            { 
                title: "Video 3", 
                thumbnail: "https://picsum.photos/200/200",
                duration: "40 min",
                rating: element.rating,
                releasedate: "05-08-2001",
                difficulty: 5,
                mainMuscles: ["Muscle E", "Muscle F"]
            }
        ];

        // Copia os dados fictícios para newMockedData
        let newMockedData = [...mockVideos];

        // Ordena newMockedData por releasedate
        newMockedData.sort((a, b) => {
            const dateA = convertToDate(a.releasedate);
            const dateB = convertToDate(b.releasedate);
            return dateB - dateA;
        });

        setMockedData(newMockedData);
        */
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
            console.log(data.videos);
            let newMockedData = [];
            data.videos.forEach(element => {
                newMockedData.push({
                    path: element.path,
                    title: element.title,
                    thumbnail: element.thumbnail,
                    duration: "30 min",                             // deverá ser ajustado
                    rating: element.rating,
                    releasedate: element.releasedate,
                    PTUsername: element.username,
                    difficulty: 4,                                  // deverá ser ajustado
                    mainMuscles: element.mainMuscles.split(","),
                })
            });
    
            setMockedData(newMockedData);
        }).catch((_) => { });
        /*
        const videos = [
            { 
                title: "Video 1", 
                thumbnail: "https://picsum.photos/200/200",
                duration: "30 min",
                rating: 4,
                releasedate: "2023-01-15",
                PTUsername: "PT001",
                difficulty: 4,
                mainMuscles: ["Muscle A", "Muscle B"]
            },
            { 
                title: "Video 2", 
                thumbnail: "https://picsum.photos/200/200",
                duration: "25 min",
                rating: 3,
                releasedate: "2023-03-25",
                PTUsername: "PT002",
                difficulty: 3,
                mainMuscles: ["Muscle C", "Muscle D"]
            },
            { 
                title: "Video 3", 
                thumbnail: "https://picsum.photos/200/200",
                duration: "40 min",
                rating: 5,
                releasedate: "2023-08-05",
                PTUsername: "PT001",
                difficulty: 5,
                mainMuscles: ["Muscle E", "Muscle F"]
            }
        ];
        
        setMockedData(videos);
        */
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
                    path: element.path,
                    title: element.title,
                    thumbnail: element.thumbnail,
                    duration: "30 min",                             // deverá ser ajustado
                    rating: element.rating,
                    releasedate: element.releasedate,
                    difficulty: 4,                                  // deverá ser ajustado
                    mainMuscles: element.mainMuscles.split(","),
                })
            });
    
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
