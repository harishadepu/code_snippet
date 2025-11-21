import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function CreateSnippet() {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const saveSnippet = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await API.post(
        "/snippets",
        { title, language, code, visibility: "public" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/"); // redirect after creation
    } catch (err) {
      console.error("Error saving snippet:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Create Snippet</h2>
      <form onSubmit={saveSnippet} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Language</label>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Code</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border rounded font-mono"
            rows={6}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Save Snippet
        </button>
      </form>
    </div>
  );
}