import PTfilter from "../../Components/Subscription/PTfilter";
import { Link } from "react-router-dom";

export default function NewPtTable() {
    const mockedData = [
      {
          name: "Igor Voitenko",
          photo: "https://picsum.photos/300/200",
          decription: "I believe, that through fitness you can change not only your body but your whole life!",
          tags: ["Full Body", "Cardio", "Strength"],
          price: "20€ - monthly",
      },
      {
          name: "Dantes",
          photo: "https://picsum.photos/500/200",
          decription: "Welcome to the Rodeo.",
          tags: ["Budget", "Core", "Strength"],
          price: "20€ - monthly"
      },
      {
          name: "Rui Aguiar",
          photo: "https://picsum.photos/350/200",
          decription: "Play hard, work harder.",
          tags: ["Professional", "Flexibility"],
          price: "20€ - monthly"
      },
      {
        name: "Mario Antunes",
        photo: "https://picsum.photos/300/250",
        decription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quibusdam odit voluptatum recusandae est aspernatur velit commodi saepe, dicta repellendus nam at sapiente officia dolor ipsam dolore non quisquam nemo?",
        tags: ["Professional", "Flexibility"],
        price: "20€ - monthly"
    },
    {
        name: "Igor Voitenko",
        photo: "https://picsum.photos/250/200",
        decription: "I believe, that through fitness you can change not only your body but your whole life!",
        tags: ["Full Body", "Cardio", "Strength"],
        price: "20€ - monthly"
    },
    {
        name: "Dantes",
        photo: "https://picsum.photos/330/200",
        decription: "Welcome to the Rodeo.",
        tags: ["Budget", "Core", "Strength"],
        price: "20€ - monthly"
    },
    {
        name: "Rui Aguiar",
        photo: "https://picsum.photos/300/205",
        decription: "Play hard, work harder.",
        tags: ["Professional", "Flexibility"],
        price: "20€ - monthly"
    },
    {
      name: "Rui Aguiar",
      photo: "https://picsum.photos/306/200",
      decription: "Play hard, work harder.",
      tags: ["Professional", "Flexibility"],
        price: "20€ - monthly"
    },
    {
        name: "Igor Voitenko",
        photo: "https://picsum.photos/250/200",
        decription: "I believe, that through fitness you can change not only your body but your whole life!",
        tags: ["Full Body", "Cardio", "Strength"],
        price: "20€ - monthly"
    },
    {
        name: "Dantes",
        photo: "https://picsum.photos/330/200",
        decription: "Welcome to the Rodeo.",
        tags: ["Budget", "Core", "Strength"],
        price: "20€ - monthly"
    },
    {
        name: "Rui Aguiar",
        photo: "https://picsum.photos/300/205",
        decription: "Play hard, work harder.",
        tags: ["Professional", "Flexibility"],
        price: "20€ - monthly"
    },
    {
      name: "Rui Aguiar",
      photo: "https://picsum.photos/306/200",
      decription: "Play hard, work harder.",
      tags: ["Professional", "Flexibility"],
        price: "20€ - monthly"
    },
    ]
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
                        <tr>
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
                            <td>{Pt.decription}</td>
                            <th>
                                <Link to={"/temp"}><button className="btn btn-ghost btn-xs">details</button></Link>
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
