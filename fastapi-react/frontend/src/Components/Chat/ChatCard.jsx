import { IoChatboxEllipses } from "react-icons/io5";
import * as utils from "../../Utils/utils";
import { Link } from "react-router-dom";
//import { v4 as uuidv4 } from 'uuid';

export default function PtCard({ Pt, key }) {
    return (
        <div className="card w-90 bg-base-100 shadow-xl pt-3">
            <figure><img className="my-3" src={Pt.photo} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {Pt.name}
                </h2>
                <div className="card-actions justify-end">
                    {(utils.isNormalUser()) ?
                        <Link to={`/chat/${key}`}><button className="btn btn-primary"><IoChatboxEllipses size={30}></IoChatboxEllipses>Chat</button></Link> :
                        <Link to={`/chat/1`}><button className="btn btn-primary"><IoChatboxEllipses size={30}></IoChatboxEllipses>Chat</button></Link>
                    }
                </div>
            </div>
        </div>
    );
}

/*

create a new chat when clicking (not working yet)

npm install uuid

export default function PtCard({ Pt }) {
    const chatId = uuidv4();

    return (
        <div className="card w-90 bg-base-100 shadow-xl pt-3">
            <figure><img className="my-3" src={Pt.photo} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {Pt.name}
                </h2>
                <div className="card-actions justify-end">
                    {(utils.isNormalUser()) ?
                        <Link to={`/chat/${chatId}`}><button className="btn btn-primary"><IoChatboxEllipses size={30}></IoChatboxEllipses>Chat</button></Link> :
                        <Link to={`/chat/${chatId}`}><button className="btn btn-primary"><IoChatboxEllipses size={30}></IoChatboxEllipses>Chat</button></Link>
                    }
                </div>
            </div>
        </div>
    );
}
*/