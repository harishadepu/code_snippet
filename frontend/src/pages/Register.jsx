import React, { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/register", form);
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="p-5 max-w-md mx-auto space-y-4 mt-20">
      <h2 className="text-2xl font-bold text-center">Register</h2>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Username"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Email"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Password"
        required
        minLength={6}
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full font-bold py-2 rounded transition ${
          loading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-red-500 hover:underline">
          Login
        </Link>{" "}
        here.
      </p>
    </form>
  );
}