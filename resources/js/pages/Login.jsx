import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

const Login = () => {
    const [form, setForm] = useState({ email: "admin@example.com", password: "qwerty@123" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.get("/sanctum/csrf-cookie");
            const res = await axios.post("/login", form);
            const role = res.data.role;
            window.location.href =
                role === "admin" ? "/admin/dashboard" : "/user/dashboard";
        } catch (err) {
            alert("Login gagal. Cek email/password.");
        }
    };

    return (
        <div className="mx-auto max-w-md p-8">
            <h2 className="mb-4 text-xl font-bold">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />
                <button className="rounded bg-blue-500 py-2 text-white">
                    Login
                </button>
            </form>
            <p className="mt-4 text-sm">
                Belum punya akun?{" "}
                <Link to="/register" className="text-blue-600 underline">
                    Daftar di sini
                </Link>
            </p>
        </div>
    );
};

export default Login;
