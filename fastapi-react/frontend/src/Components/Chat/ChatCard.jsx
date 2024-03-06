import { IoChatboxEllipses } from "react-icons/io5";
import * as utils from "../../Utils/utils";
import { Link } from "react-router-dom";

export default function PtCard({ Pt }) {
    return (
        <div className="card w-90 bg-base-100 shadow-xl pt-3">
            <figure><img className="my-3" src={Pt.photo} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {Pt.name}
                </h2>
                <div className="card-actions justify-end">
                    {(utils.isNormalUser()) ?
                        <Link to={"/chat/1"}><button className="btn btn-primary"><IoChatboxEllipses size={30}></IoChatboxEllipses>Chat</button></Link> :
                        <Link to={"/chat/2"}><button className="btn btn-primary"><IoChatboxEllipses size={30}></IoChatboxEllipses>Chat</button></Link>
                    }
                </div>
            </div>
        </div>
    );
}
