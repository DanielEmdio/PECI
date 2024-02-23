import React from 'react';
import Workoutcard from "../../Components/Home/Workoutcard";
import CategoriesBar from "../../Components/Home/CategoriesBar";

export default function Home() {
    const mockedData = [
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
    ]

    return <div className="w-3/4 mx-auto">
        <CategoriesBar></CategoriesBar>
        <div className="flex flex-col gap-4">
            {mockedData.map((workout, index) => (
                <Workoutcard key={index} workout={workout} />
            ))}
        </div>
    </div>
}
