import { FaUserCircle } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { IoMdSchool } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import React, { useState, useEffect } from "react";
import { api } from '../../api';
import * as utils from "../../Utils/utils";

export default function BGPtInfo() {
    const { id } = useParams();
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
                price: element.price,
                education: element.education,
                bg: element.bg,
            })

        }).catch((_) => { });
    }, []);

    /*
    const Pt = {
        education: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quibusdam quos incidunt reprehenderit. Deleniti quo totam reprehenderit culpa iste, officia temporibus praesentium nulla quod. Fuga numquam voluptatum porro magni magnam.",
        bg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto sequi mollitia debitis inventore dolorum fugiat veniam, nostrum odit nihil aperiam ea rem magnam? Ducimus nihil libero, consectetur reprehenderit nesciunt beatae."
    };
    */

    return (
        <>
            <div role="tablist" className="tabs-bordered mt-6 pb-16 lg:pb-0 w-4/5 lg:w-2/3 mx-auto flex flex-wrap items-center justify-between">
                <Link to={`/PT_nonSub/${id}/main`} role="tab" className="tab"><FaUserCircle size='15' title='Main' /></Link>
                <Link to={`/PT_nonSub/${id}/bg`} role="tab" className="tab-active"><FaUserGraduate size='15' title='Background' /></Link>
                <Link to={`/PT_nonSub/${id}/other`} role="tab" className="tab"><FaInfo size='15' title='Info' /></Link>
                <Link to={`/PT_nonSub/${id}/rating`} role="tab" className="tab"><FaStar size='15' title='Rating' /></Link>
            </div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><IoMdSchool className="h-4 fill-current text-green-700 mr-4" />Education:</p>
            <p className="text-left">{Pt.education}</p>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><CgGym className="h-4 fill-current text-green-700 mr-4" />Profecional Experience:</p>
            <p className="text-left">{Pt.bg}</p>
        </>
    )
}