import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const[signupdata,setSignupdata]=useState({
    fullname:"",
    email:"",
    password:""
  })

  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupdata({ ...signupdata, [name]: value });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      let newUrl = `${import.meta.env.VITE_API_URL}/user/signup`;
      const response = await axios.post(newUrl, signupdata, {
        withCredentials: true,
      });

      if (response.data.success) {
        console.log("User created!");
        localStorage.setItem("jwt", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="w-full max-w-md card bg-base-100 shadow-md rounded-box border border-base-300">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-base-content mb-4 border-b border-base-300 pb-2">
            Create an Account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Full Name</span>
              </label>
              <input
                type="text"
                name="fullname"
                placeholder="John Doe"
                className="input input-bordered w-full"
                required
                value={signupdata.fullname}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Email Address</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                required
                value={signupdata.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Password</span>
              </label>
              <input
                type="password"
                name={signupdata.password}
                placeholder="********"
                className="input input-bordered w-full"
                required
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-base-content">
            Already have an account?{" "}
            <a href="/login" className="link link-hover text-primary">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;