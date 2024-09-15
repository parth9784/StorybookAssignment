import React from "react";
import { ImSpinner6 } from "react-icons/im";

function Loading (){
  return(
    <div className="">
      <ImSpinner6 className="text-6xl animate-spin items-center justify-center"/>
    </div>);
}

export default Loading;