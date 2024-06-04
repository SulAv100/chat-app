import React from "react";
import "./LoginPage.css";
import logo from "../../assets/react.svg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const userScheme = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "At least 8 letters"),
  });
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userScheme),
  });



  const handleSubmission = (formData) => {
    console.log("Form has been submitted");
    const url = "http://127.0.0.1:8000/api/login/";

    fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response)=>{
      if(!response.ok){
        throw new Error("Network response was not okay");
      }else{
        return response.json();
      }
    })
  };


  return (
    <>
      <main className="login-body">
        <div className="login-container">
          <div className="logo-container">
            <img src={logo} alt="React Logo" />
          </div>
          <h3>Connect with your favorite people</h3>
          <form onSubmit={handleSubmit(handleSubmission)}>
            <div className="single-input">
              <input
                type="text"
                placeholder="Enter your email address"
                {...register("email")}
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>
            <div className="single-input">
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>
            <button type="submit">Continue</button>
          </form>
          <span id="check-box">
            <input type="checkbox" />
            Keep me signed in
          </span>
          <span id="link-back">Don't have an account? <Link to='/signup'><b>Signup</b></Link></span>
        </div>
      </main>
      <footer>
        <div className="footer-element">
          <ul>
            <li>Not on Facebook?</li>
            <li>Forget Password</li>
            <li>Privacy Policy</li>
            <li>Terms</li>
            <li>Cookies Policies</li>
            <li>
              <i className="fa-solid fa-circle-c"></i>Meta 2024
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default LoginPage;
