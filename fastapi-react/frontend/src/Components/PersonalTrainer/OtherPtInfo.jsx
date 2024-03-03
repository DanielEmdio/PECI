import { BiWorld } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

export default function OtherPtInfo() {
    const { id } = useParams();
    const Pt = {
        tags: ["English", "Portuguese"],
        hours: [["Tuesday", "9:00 - 14:00"], ["Wednesday", "9:00 - 14:00"], ["Friday", "9:00 - 14:00"]],
    }
    return (
        <>
            <div role="tablist" className="tabs-bordered mt-6 pb-16 lg:pb-0 w-4/5 lg:w-2/3 mx-auto flex flex-wrap items-center justify-between">
                <Link to={`/PT/${id}/main`} role="tab" className="tab"><FaUserCircle size='15' title='Main' /></Link>
                <Link to={`/PT/${id}/bg`} role="tab" className="tab"><FaUserGraduate size='15' title='Background' /></Link>
                <Link to={`/PT/${id}/other`} role="tab" className="tab-active"><FaInfo size='15' title='Info' /></Link>
                <Link to={`/PT/${id}/rating`} role="tab" className="tab"><FaStar size='15' title='Rating' /></Link>
            </div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><FaCalendarAlt className="h-4 fill-current text-green-700 mr-4" />Availability:</p>
            <div className="divider"></div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Days</th>
                            <th>Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {Pt.hours.map((day, index) => (
                            <tr key={index}>
                                <th>{day[0]}</th>
                                <td>{day[1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="pt-4 mb-1 text-base font-bold flex items-center justify-center lg:justify-start"><BiWorld className="h-4 fill-current text-green-700 mr-4" />Languages spoken:</p>
            {Pt.tags.map((tag, index) => (
                <span key={index} className="badge badge-ghost badge-sm mx-1 flex-row-1 justify-start">{tag}</span>
            ))}
        </>
    )
}
