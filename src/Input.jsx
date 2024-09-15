import React from 'react';
import FormikHOC from './FormikHOC';

function Input ({ name, label,id,className,touched,error,...rest }){
  let borderClass = "border-indigo-500 focus:border-black";

  if(error && touched){
    borderClass = "border-red-600";
  }


  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="mb-4">
        <input
          name={name}
          id={id}
          className={"border-2 rounded-lg w-full p-4 text-white bg-indigo-100 placeholder:text-gray-400 bg-primary-light "+borderClass}
          {...rest}
        />
        {touched && error && <div className="text-red-600 font-semibold">{error}</div>}
      </div>
    </div>
  );
}

export const FormikInput =  FormikHOC(Input);

export default Input;