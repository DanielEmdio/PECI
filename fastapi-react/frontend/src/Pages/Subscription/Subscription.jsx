import React, { useEffect, useState } from 'react';
import { FaUserPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import PtCard from "../../Components/Subscription/PtCard";
import api from '../../api';
import * as utils from "../../Utils/utils";

export default function Subscription() {
    /*const mockedData = [
        {
            name: "Igor Voitenko",
            photo: "https://picsum.photos/250/200",
            decription: "I believe, that through fitness you can change not only your body but your whole life!",
            tags: ["Full Body", "Cardio", "Strength"],
        },
        {
            name: "Dantes",
            photo: "https://picsum.photos/330/200",
            decription: "Welcome to the Rodeo.",
            tags: ["Budget", "Core", "Strength"],
        },
        {
            name: "Rui Aguiar",
            photo: "https://picsum.photos/300/205",
            decription: "Play hard, work harder.",
            tags: ["Professional", "Flexibility"],
        },
        {
            name: "Rui Aguiar",
            photo: "https://picsum.photos/306/200",
            decription: "Play hard, work harder.",
            tags: ["Professional", "Flexibility"],
        },
        {
            name: "Igor Voitenko",
            photo: "https://picsum.photos/250/200",
            decription: "I believe, that through fitness you can change not only your body but your whole life!",
            tags: ["Full Body", "Cardio", "Strength"],
        },
        {
            name: "Dantes",
            photo: "https://picsum.photos/330/200",
            decription: "Welcome to the Rodeo.",
            tags: ["Budget", "Core", "Strength"],
        },
        {
            name: "Rui Aguiar",
            photo: "https://picsum.photos/300/205",
            decription: "Play hard, work harder.",
            tags: ["Professional", "Flexibility"],
        },
        {
            name: "Rui Aguiar",
            photo: "https://picsum.photos/306/200",
            decription: "Play hard, work harder.",
            tags: ["Professional", "Flexibility"],
        },
    ]*/
    const [mockedData, setMockedData] = useState([]);

    useEffect(() => {
        api.post("/users/getSubs", { token: utils.getCookie("token") }).then((response) => {
            const data = response.data;
            console.log("data: ",data);
    
            let newMockedData = [];
            data.pts.forEach(element => {
                newMockedData.push({
                    name: element.name,
                    photo: element.photo,
                    decription: element.description,
                    tags: element.tags.split(","),
                })
            });
    
            setMockedData(newMockedData);
        }).catch((_) => { });
    }, []);

    return (
        <div className='w-11/12 mx-auto'>
            <div className="grid flex-grow h-32 bg-base-300 place-items-center bg-transparent mb-20">
                <h1 className='my-3 text-2xl font-bold'>Find a new Personal Trainer</h1>
                <Link to={"/AvaliblePT"}><button className="btn btn-circle btn-outline size-32"><FaUserPlus size={55} /></button></Link>
            </div>
            <div className="divider"></div>
            <h1 className='my-3 text-2xl font-bold'>My personal trainers:</h1>
            <div className="grid grid-cols-3 gap-2">
                {mockedData.map((Pt, index) => (
                    <PtCard className="basis-1/3" key={index} Pt={Pt} />
                ))}
            </div>
        </div>
    );
};
