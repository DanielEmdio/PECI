import { Link } from "react-router-dom";
import { GiGymBag } from "react-icons/gi";
import { IoPersonAdd } from "react-icons/io5";
import { GiProgression } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";


export default function Sidebar(){
    return <div className="drawer-side">
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
     <p className="text-4xl font-bold bg-base-200 text-base-content mx-auto">Pocket Coach</p>
      <div className="divider"></div>
        <li className="text-xl font-bold"><Link to={"/"}><GiGymBag size={32}/>Workouts</Link></li>
        <li className="text-xl font-bold"><Link to={"/subscriptions"}><IoPersonAdd size={32}/>Subscriptions</Link></li>
        <li className="text-xl font-bold"><Link to={"/progress"}><GiProgression size={32}/>Progress</Link></li>
        <li className="text-xl font-bold"><Link to={"/profile"}><FaUserCircle size={32}/>Profile</Link></li>
        <li className="text-xl font-bold"><Link to={"/settings"}>Settings</Link></li>
    </ul>
  </div>
}