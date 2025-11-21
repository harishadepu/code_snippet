import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";

export default function EditSnippet() {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/snippets/${id}`)
      .then((res) => setSnippet(res.data))
      .catch((err) => console.error("Error fetching snippet:", err));
  }, [id]);

  const updateHandler = async () => {
  try {
    const token = localStorage.getItem("token");
    const { title, code, language } = snippet; // only allowed fields

    await API.put(
      `/snippets/${id}`,
      { title, code, language },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    navigate(`/snippet/${id}`);
  } catch (err) {
    console.error("Error updating snippet:", err.response?.data || err);
  }
};

  if (!snippet) return <p className="p-4 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Edit Snippet</h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={snippet.title}
          onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
      </div>

      {/* Language */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Language
        </label>
        <input
          type="text"
          value={snippet.language}
          onChange={(e) => setSnippet({ ...snippet, language: e.target.value })}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
      </div>

      {/* Code Editor */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Code
        </label>
        <CodeEditor
          code={snippet.code}
          language={snippet.language}
          setCode={(c) => setSnippet({ ...snippet, code: c })}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={updateHandler}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Save
        </button>
        <button
          onClick={() => navigate(`/snippet/${id}`)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}