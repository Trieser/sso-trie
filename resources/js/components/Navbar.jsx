import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("/logout");
            setDropdownOpen(false);
            window.location.href = "/";
        } catch (err) {
            alert("Logout gagal");
        }
    };

    const handleTitleClick = () => {
        const path = window.location.pathname;
        const isUser = path.includes("/user");
        const isAdmin = path.includes("/admin");
        
        if (isUser) {
            navigate("/user/dashboard");
        } else if (isAdmin) {
            navigate("/admin/dashboard");
        } else {
            navigate("/");
        }
    };

    const getHomePath = () => {
        const path = window.location.pathname;
        if (path.includes("/admin")) return "/admin/dashboard";
        if (path.includes("/user")) return "/user/dashboard";
        return "/";
    };

    const path = window.location.pathname;
    const isUser = path.includes("/user");
    const isAdmin = path.includes("/admin");
    const isLoggedIn = isUser || isAdmin;

    return (
        <nav className="sticky top-0 z-40 flex items-center justify-between bg-white p-4 shadow">
            <button
                onClick={handleTitleClick}
                className="text-lg font-bold text-blue-600 hover:text-blue-700 focus:outline-none"
            >
                TRIE PG
            </button>

            {isLoggedIn ? (
                <div className="relative flex items-center space-x-2">
                    {isUser && (
                        <button
                            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                            onClick={() => {
                                // Langsung navigate ke market-news tanpa cek token
                                navigate("/user/market-news");
                            }}
                        >
                            Market News
                        </button>
                    )}
                    {isAdmin && (
                        <button
                            className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
                            // onClick={} // tambahkan aksi admin di sini jika ada
                        >
                            Admin Button
                        </button>
                    )}
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="rounded bg-gray-100 px-4 py-2 hover:bg-gray-200 focus:outline-none"
                    >
                        👤 Menu
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 z-50 mt-2 w-40 rounded border bg-white shadow">
                            <Link
                                to={getHomePath()}
                                onClick={() => setDropdownOpen(false)}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                            >
                                Home
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setDropdownOpen(false);
                                }}
                                className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-x-4">
                    <button
                        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                        onClick={() => {
                            const isLoggedIn = !!localStorage.getItem("token");
                            if (isLoggedIn) {
                                navigate("/user/market-news");
                            } else {
                                navigate("/login");
                            }
                        }}
                    >
                        Market News
                    </button>
                    <Link to="/" className="text-gray-700 hover:underline">
                        Home
                    </Link>
                    <Link
                        to="/login"
                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        Login
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;