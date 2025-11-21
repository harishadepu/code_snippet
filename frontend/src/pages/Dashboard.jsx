import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import SnippetCard from "../components/SnippetCard";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [snippets, setSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch public snippets
  useEffect(() => {
    API.get("/snippets")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.snippets || [];
        setSnippets(data);
      })
      .catch((err) => {
        console.error("Error fetching snippets:", err);
        setSnippets([]);
      });
  }, []);

  // Derived filtered snippets
  const filteredSnippets = snippets.filter((snippet) =>
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show loading while waiting for user
  if (!user) {
    return <p className="p-5 text-gray-500">Loading dashboard...</p>;
  }

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between px-10">
        <h2 className="font-bold text-xl text-blue-700">Public Snippets</h2>
        <Link
          to="/snippet/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
        >
          ADD Snippet
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between rounded-xl mt-5 border p-3 gap-3 shadow-md bg-white">
        <input
          type="text"
          placeholder="Search snippets by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // updates live
          className="flex-1 p-2 rounded outline-none"
          aria-label="Search snippets by title"
        />
      </div>

      {/* Snippet List */}
      <div className="mt-5 space-y-4">
        {filteredSnippets.length > 0 ? (
          filteredSnippets.map((s) => <SnippetCard snippet={s} key={s._id} />)
        ) : (
          <p className="text-gray-500">No snippets found.</p>
        )}
      </div>
    </div>
  );
}