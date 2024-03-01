import { useEffect, useState } from "react";
import PTfilter from "../../Components/Subscription/PTfilter";
import { Link } from "react-router-dom";
import api from "../../api";
import * as utils from "../../Utils/utils";


export default function NewPtTable() {
    /*
    const mockedData = [
        {
            name: "Igor Voitenko",
            photo: "https://picsum.photos/300/200",
            description: "I believe, that through fitness you can change not only your body but your whole life!",
            tags: ["Full Body", "Cardio", "Strength"],
            price: "20€ - monthly",
            id: 1
        },
        {
            name: "Dantes",
            photo: "https://picsum.photos/500/200",
            description: "Welcome to the Rodeo.",
            tags: ["Budget", "Core", "Strength"],
            price: "20€ - monthly",
            id: 2
        },
        {
            name: "Rui Aguiar",
            photo: "https://picsum.photos/350/200",
            description: "Play hard, work harder.",
            tags: ["Professional", "Flexibility"],
            price: "20€ - monthly",
            id: 3
        },
        {
            name: "Mario Antunes",
            photo: "https://picsum.photos/300/250",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quibusdam odit voluptatum recusandae est aspernatur velit commodi saepe, dicta repellendus nam at sapiente officia dolor ipsam dolore non quisquam nemo?",
            tags: ["Professional", "Flexibility"],
            price: "20€ - monthly",
            id: 4
        },
        {
            name: "Igor Voitenko",
            photo: "https://picsum.photos/250/200",
            description: "I believe, that through fitness you can change not only your body but your whole life!",
            tags: ["Full Body", "Cardio", "Strength"],
            price: "20€ - monthly",
            id: 5
        },
        {
            name: "Dantes",
            photo: "https://picsum.photos/330/200",
            description: "Welcome to the Rodeo.",
            tags: ["Budget", "Core", "Strength"],
            price: "20€ - monthly",
            id: 6
        },
        {
            name: "Rui Aguiar",
            photo: "https://picsum.photos/300/205",
            description: "Play hard, work harder.",
            tags: ["Professional", "Flexibility"],
            price: "20€ - monthly",
            id: 7
        },
        {
            name: "Rui Aguiar",
            photo: "https://picsum.photos/306/200",
            description: "Play hard, work harder.",
            tags: ["Professional", "Flexibility"],
            price: "20€ - monthly"
        },
        {
            name: "Igor Voitenko",
            photo: "https://picsum.photos/250/200",
            description: "I believe, that through fitness you can change not only your body but your whole life!",
            tags: ["Full Body", "Cardio", "Strength"],
            price: "20€ - monthly"
        },
        {
            name: "Dantes",
            photo: "https://picsum.photos/330/200",
            description: "Welcome to the Rodeo.",
            tags: ["Budget", "Core", "Strength"],
            price: "20€ - monthly"
        },
        {
            name: "Rui Aguiar",
            photo: "https://picsum.photos/300/205",
            description: "Play hard, work harder.",
            tags: ["Professional", "Flexibility"],
            price: "20€ - monthly"
        },
        {
            name: "Rui Aguiar",
            photo: "https://picsum.photos/306/200",
            description: "Play hard, work harder.",
            tags: ["Professional", "Flexibility"],
            price: "20€ - monthly"
        },
    ]*/

    const [mockedData, setMockedData] = useState([]);

    useEffect(() => {
        api.post("/pts/getNewPts", { token: utils.getCookie("token") }).then((response) => {
            const data = response.data;
            console.log("data: ",data);
    
            let newMockedData = [];
            data.pts.forEach(element => {
                newMockedData.push({
                    id: element.id,
                    name: element.name,
                    photo: element.photo,
                    description: element.description,
                    tags: element.tags.split(","),
                    price: element.price
                })
            });
    
            setMockedData(newMockedData);
        }).catch((_) => { });
    }, []);

    return (
        <div className=" w-11/12 mx-auto">
            <PTfilter></PTfilter>
            <div className="divider"></div>
            <h1 className='my-3 text-2xl font-bold'>Recomended personal trainers:</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Specialty</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockedData.map((Pt, index) => (
                            <tr key={index}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={Pt.photo} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{Pt.name}</div>
                                            <div className="text-sm opacity-50">{Pt.price}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {Pt.tags.map((tag, index) => (
                                        <span key={index} className="badge badge-ghost badge-sm mx-1">{tag}</span>
                                    ))}
                                </td>
                                <td>{Pt.description}</td>
                                <th>
                                    <Link to={`/PT/${Pt.id}/main`}><button className="btn btn-ghost btn-xs">details</button></Link>
                                </th>
                            </tr>

                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th><button className="btn btn-xs sm:btn-sm md:btn-sm lg:btn-sm">Load More</button></th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};
