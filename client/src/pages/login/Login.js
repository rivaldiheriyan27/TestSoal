import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik,useFormik } from 'formik'
import * as Yup from 'yup'
import { loginScreenLoginUser } from "./slice";
import { unwrapResult } from '@reduxjs/toolkit';
import swal from "sweetalert";


const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email yang Anda masukan belum sesuai')
    .required('Email anda belum diisi'),
  password: Yup.string()
    .min(6, 'Password Anda terlalu pendek')
    .max(15, 'Password Anda tidak valid')
    .required('Password Anda belum diisi'),
})



export default function Login(){
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password:''
    },
    onSubmit: async (value) => {
      try{
        const actionResult = await dispatch(loginScreenLoginUser(value))
        const actualResult = unwrapResult(actionResult)

        console.log(actualResult.data.accesToken,actualResult.data.email )
        const accesToken = actualResult.data.accesToken
        const email = actualResult.data.email
        const role = actualResult.data.role

        localStorage.setItem("accesToken", accesToken);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);
        console.log("disni")
        navigate("/books");
        console.log("jalan")
        
      }catch(error){
        const message = error.message;
        swal("Error", message, "error");
      }
    },
  });

    return(
    <div className="m-50 mx-auto max-w-md bg-vla">
      <div className="bg-vla py-8 px-6 shadow-md rounded-lg">
        <h2 className="mt-1 mb-8 mr-4 text-center text-3xl font-bold text-smalt">
          Sign in
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700"
            >
              Email address
          </label>
          <div className="mt-2">
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-smalt focus:border-smalt"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
          </div>

          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
            >
              Password
          </label>
          <div className="mt-2">
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-smalt focus:border-smalt"
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
          </div>
          <div className="mt-4">
          <button
            type="submit"
            className="w-full justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-smalt hover:bg-darkSmalt focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkSmalt"
          >
            Sign in
          </button>
          </div>    
        </form>
        <div className="mt-3 text-center text-blue-900 dark:md:hover:bg-fuchsia-600" 
          onC
        >
          <Link 
          to={`register`}
          className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Register
          </Link> 
        </div>
      </div>
    </div>
    )
}