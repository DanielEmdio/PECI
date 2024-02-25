import React from "react";
import MaterialDesignSwitch from "../../Components/Settings/MaterialDesignSwitch";

function Settings(){
    return(
        <div className=" w-11/12 mx-auto">
            <h1 className='my-3 text-2xl font-bold'>Notifications</h1>
            <MaterialDesignSwitch/>
            <div className="divider"></div>

        </div>
    )
}

export default Settings