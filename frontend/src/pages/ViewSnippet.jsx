import React from "react";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function ViewSnippet() {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/snippets/${id}`)
      .then((res) => {
        setSnippet(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching snippet:", err);
        setError("Failed to load snippet.");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await API.delete(`/snippets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/"); // redirect after delete
    } catch (err) {
      console.error("Error deleting snippet:", err);
      setError("Failed to delete snippet.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!snippet) return <p>No snippet found.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded shadow-sm bg-white mt-6">
      <h2 className="text-2xl font-bold mb-2">{snippet.title}</h2>
      <p className="text-gray-600 mb-2">Language: {snippet.language}</p>
      <p className="text-gray-600 mb-4">Visibility: {snippet.visibility}</p>

      <pre className="bg-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">
        <code>{snippet.code}</code>
      </pre>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <Link
          to={`/snippet/${id}/edit`}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Back
        </Link>
      </div>
    </div>
  );
}