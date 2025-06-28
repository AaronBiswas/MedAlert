import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userdata, setUserdata] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdata({ ...userdata, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let newUrl = `${import.meta.env.VITE_API_URL}/user/login`;
      const response = await axios.post(newUrl, userdata, {
        withCredentials: true,
      });

      if (response.data.success) {
        console.log("User logged In!");
        localStorage.setItem("jwt", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="w-full max-w-md card bg-base-100 shadow-md rounded-box border border-base-300">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-base-content mb-4 border-b border-base-300 pb-2">
            Login to MedAlert
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">
                  Email Address
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                value={userdata.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="********"
                className="input input-bordered w-full"
                value={userdata.password}
                onChange={handleChange}
              />
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-primary"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-base-content">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="link link-hover text-primary">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
