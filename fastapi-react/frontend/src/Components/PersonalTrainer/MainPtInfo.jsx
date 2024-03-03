import { FaUserCircle, FaUserGraduate, FaInfo, FaStar, FaIdBadge, FaEuroSign } from "react-icons/fa";
import { Link, useOutlet, useOutletContext, useParams } from "react-router-dom";
import { GiCardAceSpades } from "react-icons/gi";
import { useEffect, useState } from "react";
import * as utils from "../../Utils/utils";
import { api } from '../../api';

export default function MainPtInfo() {
    /*
    const Pt = {
        name: "Igor Voitenko",
        photo: "https://picsum.photos/550/800",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quibusdam quos incidunt reprehenderit. Deleniti quo totam reprehenderit culpa iste, officia temporibus praesentium nulla quod. Fuga numquam voluptatum porro magni magnam.",
        tags: ["Full Body", "Cardio", "Strength"],
        slots: 5,
        price: "20€ - monthly"
    }*/

    const { id } = useParams();
    const [Pt, setPt] = useState({
        name: "",
        photo: "",
        description: "",
        tags: [],
        slots: "",
        price: ""
    });

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
    }, [id]);

    return (
        <>
            <div role="tablist" className="tabs-bordered mt-6 pb-16 lg:pb-0 w-4/5 lg:w-2/3 mx-auto flex flex-wrap items-center justify-between">
                <Link to={`/PT/${id}/main`} role="tab" className="tab-active"><FaUserCircle size='15' title='Main' /></Link>
                <Link to={`/PT/${id}/bg`} role="tab" className="tab"><FaUserGraduate size='15' title='Background' /></Link>
                <Link to={`/PT/${id}/other`} role="tab" className="tab"><FaInfo size='15' title='Info' /></Link>
                <Link to={`/PT/${id}/rating`} role="tab" className="tab"><FaStar size='15' title='Rating' /></Link>
            </div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><GiCardAceSpades className="h-4 fill-current text-green-700 mr-4" />Specialty:</p>
            {Pt.tags.map((tag, index) => (
                <span key={index} className="badge badge-ghost badge-sm mx-1 flex-row-1 justify-start">{tag}</span>
            ))}
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><FaIdBadge className="h-4 fill-current text-green-700 mr-4" />Slots left: <kbd class="kbd kbd-sm ml-1 text-black">{Pt.slots}</kbd> </p>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><FaEuroSign className="h-4 fill-current text-green-700 mr-4" />Price: <kbd class="kbd kbd-sm ml-1 text-black">{Pt.price}</kbd> </p>
            <p className="pt-8 text-sm">{Pt.description}</p>
        </>
    )
}
