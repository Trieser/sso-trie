import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/Admin/Dashboard";
import UserDashboard from "./pages/User/Dashboard";
import MarketNews from "./pages/User/MarketNews/Index"

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/market-news" element={<MarketNews />} />
      </Routes>
    </>
  );
};

export default App;
