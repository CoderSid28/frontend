
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, email, password, address } = values;
      if (!username || !email || !password || !address) {
        alert("All fields are required");
        return;
      }

      console.log("Submitted Values:", values);


    
      // const url=process.env.URL;
      // console.log(url);

      const response = await axios.post(
        `https://booknest-eku3.onrender.com/api/v1/sign-up`,
        values
      );
      alert(response.data.message);

      // Don't clear form values, just redirect to SignIn
      navigate("/SignIn");

    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="username" className="text-zinc-400">Username</label>
            <input
              type="text"
              id="username"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              value={values.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="email" className="text-zinc-400">Email</label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="xyz@example.com"
              name="email"
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="text-zinc-400">Password</label>
            <input
              type="password"
              id="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="address" className="text-zinc-400">Address</label>
            <textarea
              id="address"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="address"
              name="address"
              rows="3"
              value={values.address}
              onChange={handleChange}
              autoComplete="street-address"
              required
            ></textarea>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white mt-6 px-4 py-2 rounded w-full hover:bg-blue-700 transition-all"
            >
              SignUp
            </button>
          </div>
        </form>

        <div className="text-center text-zinc-400 mt-4">Or</div>
        <div className="text-center text-zinc-400 mt-2">
          Already have an account?{" "}
          <Link to="/SignIn" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
