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
    

    return <div className="w-3/4 mx-auto">
        <CategoriesBar></CategoriesBar>
        
    </div>
}
