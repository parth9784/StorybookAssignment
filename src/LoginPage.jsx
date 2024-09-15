import { withFormik } from 'formik';
import React from 'react';
import Input from './Input';
import { TbShoppingCartFilled } from "react-icons/tb";
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import axios from "axios";
import { withUser,withAlert } from './withProvider';


function callLoginApi(values,bag){
  axios.post("https://myeasykart.codeyogi.io/login",{
    email:values.email,
    password:values.password,
  })
  .then((response) => {
    const { user,token } = response.data;
    localStorage.setItem("token",token);
    bag.props.setUser(user);
  }).catch((error) => {
    bag.props.setAlert({type:"error", meassage:"Invalid Credentials"});
  })

}

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required()
})
const initialValues =  {
      email: '',
      password: '',
}

export function LoginPage({handleSubmit,values,errors,touched,handleChange,handleBlur})  {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 max-w-5xl mx-auto">      
      <div className="text-primary-lightest mb-6 text-9xl">
        <TbShoppingCartFilled /> 
      </div>
        <form
          onSubmit={handleSubmit}
          className="bg-primary-default p-8 rounded-sm">
            <div className="mb-4">
              <Input
                values = {values.email}
                error = {errors.email}
                touched = {touched.email}
                onChange = {handleChange}
                onBlur = {handleBlur}
                label="Email"
                id="email-address"
                type="text"
                name="email"
                placeholder="EMAIL"
                className="rounded-b-none bg-primary-light"
                autoComplete="email"
                required
              />
            </div>
            <div className="mb-6 ">
              <Input
                values = {values.password}
                error = {errors.password}
                touched = {touched.password}
                onChange = {handleChange}
                onBlur = {handleBlur}
                id="password"
                label="password"
                type="password"
                name="password"
                placeholder="PASSWORD"
                className="rounded-t-none"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-white w-full p-2 my-2 disabled:bg-white rounded-2xl hover:bg-primary-lightest border-2 border-black"
            >
              LOGIN
            </button>
            <div className="mt-3 text-black">
              Don't have an account? 
              <Link to={"/SignUp"} className= "underline hover:font-bold"> Sign up </Link>
            </div>

        </form>
    </div>

  );
};

const myHOC = withFormik({
  initialValues:initialValues, 
  validationSchema:schema,
  handleSubmit:callLoginApi
});

const easyLogin = myHOC(LoginPage);

export default withAlert(withUser(easyLogin));
