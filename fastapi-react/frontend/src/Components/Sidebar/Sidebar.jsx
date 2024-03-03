import { GiGymBag, GiProgression } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import * as utils from "../../Utils/utils";
import { IoMdExit } from "react-icons/io";
import { FaGear } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const handleLogout = () => {
        utils.eraseCookie("token");
        utils.goToHome();
    };

    return <div className="drawer-side">
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <p className="text-4xl font-bold bg-base-200 text-base-content mx-auto">Pocket Coach</p>
            <div className="divider"></div>
            <li className="text-xl font-bold"><Link to={"/"}><GiGymBag size={32} />Workouts</Link></li>
            <li className="text-xl font-bold"><Link to={"/subscriptions"}><IoPersonAdd size={32} />Subscriptions</Link></li>
            <li className="text-xl font-bold"><Link to={"/progress"}><GiProgression size={32} />Progress</Link></li>
            <li className="text-xl font-bold"><Link to={"/profile"}><FaUserCircle size={32} />Profile</Link></li>
            <li className="text-xl font-bold"><Link to={"/settings"}><FaGear size={32} />Settings</Link></li>
            <li className="text-xl font-bold"><button onClick={handleLogout}><IoMdExit size={32} />Log Out</button></li>
        </ul>
    </div>
}
