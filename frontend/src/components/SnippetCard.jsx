import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function SnippetCard({ snippet, onDelete }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User must be logged in.");
      return;
    }

    try {
      await API.delete(`/snippets/${snippet._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update parent state
      if (onDelete) onDelete(snippet._id);
    } catch (err) {
      if (err.response?.status === 403) {
        console.error("Not authorized to delete this snippet.");
      } else {
        console.error("Error deleting snippet:", err);
      }
    }
  };

  const isOwner = user && snippet.createdBy === user._id;

  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white mb-4">
      <h3 className="font-bold text-lg">{snippet.title}</h3>
      <p className="text-sm text-gray-600">Language: {snippet.language}</p>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-3">
        <Link
          to={`/snippet/${snippet._id}`}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          View
        </Link>

        {isOwner && (
          <>
            <button
              onClick={() => navigate(`/snippet/${snippet._id}/edit`)}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}