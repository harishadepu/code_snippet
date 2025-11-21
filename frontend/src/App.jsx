import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ViewSnippet from "./pages/ViewSnippet";
import EditSnippet from "./pages/EditSnippet";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateSnippet from "./pages/CreateSnippet";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/snippet/create"
          element={
            <ProtectedRoute>
              <CreateSnippet />
            </ProtectedRoute>
          }
        />
        <Route path="/snippet/:id" element={<ViewSnippet />} />
        <Route
          path="/snippet/:id/edit"
          element={
            <ProtectedRoute>
              <EditSnippet />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Fallback */}
        <Route path="*" element={<p className="p-5">Page not found</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;