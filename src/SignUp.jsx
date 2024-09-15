import React from "react";
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { TbShoppingCartFilled } from "react-icons/tb";
import { Link } from 'react-router-dom';
import Input from './Input';
import axios from 'axios';
import { withUser } from './withProvider';

function callSignUpApi(values,bag){
  axios.post("https://myeasykart.codeyogi.io/signup",{
    fullName:values.name,
    email:values.email,
    password:values.password,
  })
  .then((response) => {
    console.log(response);
    const { user,token } = response.data;
    localStorage.setItem("token",token);
    bag.props.setUser(user);
  }).catch((error) => {
    console.log(error);
  })

}

const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('This is a required field')
  })


const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }


export function SignUp ({handleSubmit,values,errors,touched,handleChange,handleBlur}) {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-300 max-w-5xl mx-auto">
      <div className="text-white mb-6 text-9xl">
        <TbShoppingCartFilled />
      </div>


        <form onSubmit={handleSubmit} className="bg-indigo-300 p-6 w-full max-w-md">
          <div className="mb-4">
            <Input
              values = {values.name}
              error = {errors.name}
              touched = {touched.name}
              onChange = {handleChange}
              onBlur = {handleBlur}
              label = "Name"
              id = "name"
              type="text"
              name = "name"
              placeholder="NAME"
              required
            />
          </div>
          <div className="mb-4">
            <Input
              values = {values.email}
              error = {errors.email}
              touched = {touched.email}
              onChange = {handleChange}
              onBlur = {handleBlur}
              label = "Email"
              id = "email-address"
              type="email"
              name = "email"
              placeholder="EMAIL"
              required
            />
          </div>
          <div className="mb-4">
            <Input
              values = {values.password}
              error = {errors.password}
              touched = {touched.password}
              onChange = {handleChange}
              onBlur = {handleBlur}
              label = "Password"
              type="password"
              name="password"
              id="password"
              placeholder="PASSWORD"
              required
            />
          </div>
          <div className="mb-6">
            <Input
              values = {values.confirmPassword}
              error = {errors.confirmPassword}
              touched = {touched.confirmPassword}
              onChange = {handleChange}
              onBlur = {handleBlur}
              label = "Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="CONFIRM PASSWORD"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-blue-900 rounded-xl disabled:bg-white  disabled:hover:bg-gray-200 hover:bg-blue-700"
          >
            SIGN UP
          </button>
          <div className="mt-3 text-white">
            Already have an account? <Link to="/" className="hover:font-bold underline">
              Login
            </Link>
          </div>
        </form>

    </div>
  );
};

const myHOC = withFormik({
  initialValues:initialValues,
  validationSchema:schema,
  handleSubmit:callSignUpApi,
})
const easySignUp = myHOC(SignUp);
export default withUser(easySignUp);
