import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { TbShoppingCartFilled } from "react-icons/tb";
import Input from './Input';


function callForgetPassApi(values){
  console.log("Values",values);
}
const schema = Yup.object().shape({
  email : Yup.string().email().required("Email is required")
  })
const initialValues = {
    email: ''
  }


export function ForgotPassword ({handleSubmit,values,errors,touched,handleChange,handleBlur})  {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-300 max-w-5xl mx-auto">
      <div className="text-white mb-6 text-9xl">
        <TbShoppingCartFilled />
      </div>
        <form onSubmit={handleSubmit} 
          className="bg-indigo-300 p-8 max-w-md w-full" >
          <div className="mb-4">
            <Input
              values = {values.email}
              error = {errors.email}
              touched = {touched.email}
              onChange = {handleChange}
              onBlur = {handleBlur}
              id="email"
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full p-2 my-2 disabled:bg-white rounded-2xl hover:bg-blue-700 disabled:hover:bg-gray-200"
          >
            Reset Password
          </button>
          <div className="text-white mt-3">
            <Link to="/" className="hover:font-bold">
              Back to Login Page
            </Link>
          </div>

        </form>
    </div>
  );
};

const myHOC = withFormik({
  initialValues:initialValues, 
  validationSchema:schema,
  onSubmit:callForgetPassApi
});

const easyForgotPass = myHOC(ForgotPassword);

export default easyForgotPass;
