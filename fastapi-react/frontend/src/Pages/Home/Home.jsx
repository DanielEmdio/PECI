import CategoriesBar from "../../Components/Home/CategoriesBar";
import Workoutcard from "../../Components/Home/Workoutcard";
import * as utils from "../../Utils/utils";
import React, { useState, useEffect } from "react";
import api from '../../api';

export default function Home() {
    /*const mockedData = [
        {
            title: "Arms Workout ",
            thumbnail: "https://picsum.photos/200/200",
            duration: "30 min",
            difficulty: 4,
            mainMuscles: ["Biceps", "Triceps"],
        },
        {
            title: "Legs Workout",
            thumbnail: "https://picsum.photos/200/200",
            duration: "30 min",
            difficulty: 4,
            mainMuscles: ["Quadriceps", "Hamstrings"],
        },
        {
            title: "Chest Workout",
            thumbnail: "https://picsum.photos/200/200",
            duration: "30 min",
            difficulty: 4,
            mainMuscles: ["Pectorals"],
        },
        {
            title: "Back Workout",
            thumbnail: "https://picsum.photos/200/200",
            duration: "30 min",
            difficulty: 4,
            mainMuscles: ["Latissimus Dorsi", "Trapezius"],
        },
        {
            title: "Shoulders Workout",
            thumbnail: "https://picsum.photos/200/200",
            duration: "30 min",
            difficulty: 4,
            mainMuscles: ["Deltoids"],
        },
    ];*/
    const [mockedData, setMockedData] = useState([]);

    useEffect(() => {
        api.post("/videos/getAccessibleVideos", { token: utils.getCookie("token") }).then((r) => {
            const data = r.data;
            console.log(data.videos);
    
            let newMockedData = [];
            data.videos.forEach(element => {
                newMockedData.push({
                    title: element.title,
                    thumbnail: element.thumbnail,
                    duration: "30 min",
                    difficulty: 4,
                    mainMuscles: element.mainMuscles.split(","),
                })
            });
    
            setMockedData(newMockedData);
        }).catch((_) => { });
    }, []);

    return <div className="w-3/4 mx-auto">
        <CategoriesBar></CategoriesBar>
        <div className="flex flex-col gap-4">
            {(mockedData.length === 0) ? (
                <div className='text-center'>No videos available.</div>
            ) : (
                mockedData.map((workout, index) => (
                    <Workoutcard key={index} workout={workout} />
                )))}
        </div>
    </div>
}
