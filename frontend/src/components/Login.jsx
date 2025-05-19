import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigateTo = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting form...");

        axios.post("http://localhost:3000/login", {
            email,
            password,
        })
        .then((res) => {
            const data = res.data;
            console.log(data, "Login Response");

            if (data.message && data.message.includes("Login success")) {
               
                window.localStorage.setItem("user", JSON.stringify(data.data));
                window.localStorage.setItem("token", data.token);
                window.localStorage.setItem("loggedIn", true);

               
                if (data.data.isAdmin) {
                    navigateTo("/admin");  
                } else {
                    navigateTo("/uservote");  
                }
            } else {
               
                alert(data.message || "Invalid credentials or login failed.");
            }
        })
        .catch((err) => {
            console.error("Error during login:", err);
            alert("Something went wrong. Please try again.");
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <input
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>

                    {/* Sign up redirection */}
                    <p className="text-sm text-gray-600 text-center">
                        Don't have an account?{" "}
                        <span
                            className="text-blue-500 cursor-pointer hover:underline"
                            onClick={() => navigateTo("/signup")}
                        >
                            Signup
                        </span>
                    </p>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition duration-200"
                        >
                            LOGIN
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
