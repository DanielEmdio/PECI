import React, { useState } from "react";
import MaterialDesignSwitch from "../../Components/Settings/MaterialDesignSwitch";
import PopupComponent from "../../Components/Settings/PopupComponent";

function Settings(){
    const [showPopup, setShowPopup] = useState(false);

    return(
        <div className=" w-11/12 mx-auto">
            <h1 className='my-3 text-2xl font-bold'>Notifications</h1>
            <MaterialDesignSwitch/>
            <div className="divider"></div>
            <a href="https://www.exemplo.com" target="_blank" style="background-color: blue; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; text-decoration: none;">About us</a>
            <div className="divider"></div>
            <button
                style={{ backgroundColor: 'blue', color: 'white', padding: '10px', cursor: 'pointer' }}
                onClick={() => setShowPopup(true)}
            >
                Apagar Conta
            </button>
            {showPopup && <PopupComponent onClose={() => setShowPopup(false)} />}
            <div className="divider"></div>
        </div>
    )
}

export default Settings