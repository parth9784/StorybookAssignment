import React, { useContext, useEffect } from "react";
import { MdDoneOutline } from "react-icons/md";
import { MdOutlineDangerous } from "react-icons/md";
import { AlertContext } from "./Contexts";
import { withAlert } from "./withProvider";

function Alert({ alert,setAlert }){

    let color = "bg-green-500";
    let Icon = MdDoneOutline;

    useEffect(()=>{
        if(alert){
            const timeout = setTimeout(()=>{
                setAlert();
            },3*1000)
            return () => {
                clearTimeout(timeout);
            }
        }
        
    },[alert])
    
   if(!alert){
    return null;
   }
   if(alert.type=="error"){
    Icon = MdOutlineDangerous;
    color = "bg-red-500";
}
    return (
        <div className="bg-gray-100 mx-2 my-2 shadow-md p-4 rounded-md">
            <div className="bg-white mx-16 flex justify-between pr-4">
                <div className="flex gap-10">
                    <Icon className={"text-5xl "+color} />
                    <p className="my-auto text-xl">{alert.meassage}</p>
                </div>
                <button className="my-auto underline text-blue-500" 
                  onClick={()=>setAlert(undefined)}>
                  Dismiss
                </button>
            </div>

        </div>
    )
}
export default withAlert(Alert);