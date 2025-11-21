import React, { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import SnippetCard from "../components/SnippetCard";

export default function CollectionsPage() {
  const { user } = useContext(AuthContext);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (!user) return;
    API.get("/collections")
      .then((res) => setCollections(res.data || []))
      .catch((err) => console.error("Error fetching collections:", err));
  }, [user]);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Your Collections</h2>
      {collections.length === 0 ? (
        <p className="text-gray-500">No collections found.</p>
      ) : (
        collections.map((col) => (
          <div key={col._id} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{col.name}</h3>
            {col.snippets?.length > 0 ? (
              <div className="space-y-3">
                {col.snippets.map((s) => (
                  <SnippetCard key={s._id} snippet={s} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No snippets in this collection.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}