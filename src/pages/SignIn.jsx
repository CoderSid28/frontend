import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (Values.username === "" || Values.password === "") {
        alert("All fields are required");
      } else {
        console.log("Submitted Values:", Values);
        const response = await axios.post(
          "http://localhost:1000/api/v1/sign-in",
          Values
        );
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile");
      }
    } catch (error) {
      alert(error.response.data.message);  // ✅ This is what you asked for
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950">
      <form
        onSubmit={submit}
        className="bg-zinc-900 p-6 rounded-xl shadow-lg w-full max-w-sm text-zinc-100"
      >
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>

        <label htmlFor="username" className="text-sm mb-1 block">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          className="w-full bg-zinc-800 p-2 mb-4 rounded-md outline-none"
          autoComplete="username"
          required
          value={Values.username}
          onChange={change}
        />

        <label htmlFor="password" className="text-sm mb-1 block">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          className="w-full bg-zinc-800 p-2 mb-4 rounded-md outline-none"
          autoComplete="current-password"
          required
          value={Values.password}
          onChange={change}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mb-4 transition-colors"
        >
          Sign In
        </button>

        <div className="text-center text-gray-400 mb-2">Or</div>

        <div className="text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/SignUp" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
