import { FaUserCircle } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { FaComment } from "react-icons/fa";

export default function RatingPtInfo() {
    const { id } = useParams();
    const Pt = {
        n_comments: 255,
        rating: 4.5,
    }
    return (
        <>
            <div role="tablist" className="tabs-bordered mt-6 pb-16 lg:pb-0 w-4/5 lg:w-2/3 mx-auto flex flex-wrap items-center justify-between">
                <Link to={`/PT/${id}/main`} role="tab" className="tab"><FaUserCircle size='15' title='Main' /></Link>
                <Link to={`/PT/${id}/bg`} role="tab" className="tab"><FaUserGraduate size='15' title='Background' /></Link>
                <Link to={`/PT/${id}/other`} role="tab" className="tab"><FaInfo size='15' title='Info' /></Link>
                <Link to={`/PT/${id}/rating`} role="tab" className="tab-active"><FaStar size='15' title='Rating' /></Link>
            </div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><FaStar className="h-4 fill-current text-green-700 mr-4" />Rating:</p>
            <div class="rating rating-lg rating-half">
                <input type="radio" name="rating-10" class="rating-hidden" />
                <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" />
                <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
                <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" />
                <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
                <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" />
                <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
                <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" checked />
                <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
                <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" />
                <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
            </div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><FaComment className="h-4 fill-current text-green-700 mr-4" />Comments:</p>
            <a href="" className="pt-8 text-gray-600 text-sm underline"> View {Pt.n_comments} comments! </a>
        </>
    )
}
