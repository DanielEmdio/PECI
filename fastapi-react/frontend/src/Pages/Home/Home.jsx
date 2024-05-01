import { IoChatbubble } from "react-icons/io5";
import CategoriesBar from "../../Components/Home/CategoriesBar";
import React from "react";

export default function Home() {
    return (
        <div className="w-3/4 mx-auto">
            <CategoriesBar></CategoriesBar>
            <button id="floating-button" onClick={() => window.location.href = "/chat"}>
                <IoChatbubble size={50} />
            </button>
        </div>
    );
    
}
