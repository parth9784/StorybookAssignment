import React from "react";
import { useField } from "formik";

function FormikHOC(IncomingComponent){
  function OutgoingComponent({name,...rest}){
    const field = useField(name);
    const [data,meta] = field;
    const {value , onBlur , onChange} = data;
    const {error , touched} = meta;

    let borderClass = "border-indigo-500 focus:border-black";

    if(error && touched){
      borderClass = "border-red-600";
    }

    return(
      <IncomingComponent
        value = {value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        touched={touched}
        name={name}
        {...rest}/>
    );
  }
  return OutgoingComponent;
}

export default FormikHOC;