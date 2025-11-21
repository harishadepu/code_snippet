import React from "react";
import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", { email, password });
    login(res.data.token, res.data.user);
    navigate("/");
  };

  return (
    <form
  onSubmit={submit}
  className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md mt-20"
>
  <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
    Email
  </label>
  <input
    id="email"
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
    Password
  </label>
  <input
    id="password"
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
  >
    Login
  </button>

  <p className="mt-4 text-sm text-center text-gray-600">
    Don't have an account?{" "}
    <Link to="/register">
      <span className="text-red-500 font-semibold hover:underline">Sign Up</span>
    </Link>{" "}
  </p>
</form>
  );
}
