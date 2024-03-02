import { Outlet, useParams } from "react-router-dom";
import { GiBiceps } from "react-icons/gi";
import { useEffect, useState } from "react";
import api from "../../api";
import * as utils from "../../Utils/utils";

export default function PtPage() {
    
    // const Pt = {
    //         name: "Igor Voitenko",
    //         photo: "https://picsum.photos/550/800",
    //         decription: "I believe, that through fitness you can change not only your body but your whole life!",
    //         tags: ["Full Body", "Cardio", "Strength"],
    //     }
    const {id} = useParams();
    //console.log("id:",id)
    const [Pt, setPt] = useState([]);

    useEffect(() => {
        api.post(`/users/getPtById/${id}`, { token: utils.getCookie("token") }).then((r) => {
            const data = r.data;
            //console.log("data: ",data);
            
            const element = data.pt
            setPt({
                name: element.name,
                photo: element.photo,
                description: element.description,
                tags: element.tags.split(","),
                slots: element.slots,
                price: element.price
            })
    
        }).catch((_) => { });
    }, []);

    return (

        <div className="grid justify-items-center font-sans antialiased text-gray-900 leading-normal tracking-wider h-full bg-cover bg-[url('Assets/Gym.jpg')] bg-no-repeat">
            <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
                {/*Main Col*/}
                <div id="profile" className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-95 mx-6 lg:mx-0">
                    <div className="p-4 md:p-12 text-center lg:text-left">
                        {/* Image for mobile view*/}
                        <img src={Pt.photo} alt="" className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"/>
                
                        <h1 className="text-3xl font-bold pt-8 lg:pt-0">{Pt.name}</h1>
                        <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                        {/* conteúdo carrosel */}
                        
                        <Outlet context={Pt}></Outlet>
                        {/* conteúdo carrosel */}
                        
                        <div className="pt-12 pb-8">
                            <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                                <p className="flex">
                                Get In Touch
                                <GiBiceps className="ml-2 size-5"/>
                                </p>
                            </button> 
                        </div>

                        

                        {/* carrosel index 
                        <div className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between">
                            <Link to={`/PT/${id}/main`} className="btn btn-circle btn-outline"><FaUserCircle size='24' title='Main'/></Link>
                            <Link to={`/PT/${id}/bg`} className="btn btn-circle btn-outline"><FaUserGraduate size='24' title='Background'/></Link>
                            <Link to={`/PT/${id}/other`} className="btn btn-circle btn-outline"><FaInfo  size='24' title='Info'/></Link>
                            <Link to={`/PT/${id}/rating`} className="btn btn-circle btn-outline"><FaStar size='24' title='Rating'/></Link>
                        </div>
                            fim carrosel index */}

                    </div>
                </div>
        
                {/*Img Col*/}
                <div className="w-full lg:w-2/5">
                    {/* Big profile image for side bar (desktop)         "./chris_heria.png" */}
                        <img src={"http://localhost:8000/images/"+Pt.photo} className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" alt=""/>
                    {/*"http://0.0.0.0:8000/images/chris_heria.png"*/}
                    {/* Image from: http://unsplash.com/photos/MP0IUfwrn0A */}
                </div>
            </div>
        </div>
    )
}

