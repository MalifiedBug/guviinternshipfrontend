import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { MainContext } from "../App";
import { useContext } from "react";
import Alert from "@mui/material/Alert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const notify = (message) => toast(message);

export default function SignIn() {
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const [msg,setMsg] = useState("")
  const {user,setUser,token,setToken, login, setLogin} = useContext(MainContext)
  console.log(login)
  console.log(msg)
 
  if (msg === "logged in") {
    console.log("enterd logged in")
    setToken(response.data.token)
    localStorage.setItem("token", token);
    localStorage.setItem('user',user);   
    setLogin(true)
    console.log(response);
    notify(msg)
    navigate("/protected");    
    setMsg('')
  }else if(msg === 'invalid credentials'){
    notify(msg);
    setMsg('')
  }

  async function handleSignInSubmit(values){
    await axios.post(`${serverUrl}/signin`,values).then((response )=> {setResponse(response);setUser(values.email);setMsg(response.data.msg);setToken(response.data.token)}).catch((err)=>setMsg(err.response.data.msg))
  }

  return (
    <div className="flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <p>Server has been deployed on Render.com, it will take time to post and fetch data</p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table clas="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <td className="px-6 py-3">Sr.</td>
            <td className="px-6 py-3">Email</td>
            <td className="px-6 py-3">Password</td>
          </thead>
          <tbody>
            <tr>
              <td className="px-6 py-3">1</td>
              <td className="px-6 py-3">varun@gmail.com</td>
              <td className="px-6 py-3">passwordvarun</td>
            </tr>
            <tr>
              <td className="px-6 py-3">2</td>
              <td className="px-6 py-3">tharun@gmail.com</td>
              <td className="px-6 py-3">passwordtharun</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign In to your account
          </h2>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .required("Password is required")
              .min(5, "Your password is too short.")
              .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setResponse(null);
            handleSignInSubmit(values)
            setTimeout(() => {              
              //   alert(JSON.stringify({email:email,password:password}, null, 2));
              setSubmitting(false);
            }, 4000);
          }}
        >
          <Form method="POST" className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <Field
                  placeholder="Email"
                  className="relative block w-full rounded-t-md appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  name="email"
                  type="email"
                />
                <ErrorMessage sx={{ color: "red" }} name="email">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </div>
              <div>
                <Field
                  placeholder="Password"
                  className="relative block w-full rounded-b-md appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  name="password"
                  type="password"
                />
                <ErrorMessage sx={{ color: "red" }} name="password">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </div>
            </div>
            {response ? (
              <div>
                {response === "logged in" ? (
                  <Alert severity="success">{response}</Alert>
                ) : (
                  <div>
                    <Alert severity="error">{response}</Alert>
                    <a href="/">👉Create a new account now!!!👈</a>
                  </div>
                )}
              </div>
            ) : null}

            <div>
              {response === null ? (
                <div class="flex justify-center">
                  <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 m-4 h-8 w-8"></div>
                </div>
              ) : null}
            </div>

            <div className="text-sm">
              <Link   
              to="/"             
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >                
                New Here? Sign Up.
              </Link>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute font-bold inset-y-0 left-0 flex items-center pl-3"></span>
                Sign In
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <ToastContainer
position="bottom-left"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>
  );
}
