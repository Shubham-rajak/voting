import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

export default function SignUp() {
    const navigateTo = useNavigate();

    // Formik initialization
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            contact: "",
        },
        validate: (values) => {
            const errors = {};

            // Validation logic
            if (!values.name) {
                errors.name = "Name is required";
            }

            if (!values.email) {
                errors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = "Email address is invalid";
            }

            if (!values.password) {
                errors.password = "Password is required";
            } else if (values.password.length < 6) {
                errors.password = "Password must be at least 6 characters";
            }

            if (!values.contact) {
                errors.contact = "Contact number is required";
            } else if (!/^[0-9]+$/.test(values.contact)) {
                errors.contact = "Contact must be a number";
            }

            return errors;
        },
        onSubmit: async (values) => {
            try {
                const response = await axios.post("http://localhost:3000/sign-up", values);
                console.log(response.data, "userRegister");

                if (response.data.message.includes("SignUp Successful")) {
                    navigateTo("/login");
                } else {
                    alert("Invalid Data");
                }
            } catch (error) {
                console.error("Error during registration:", error);
                alert("Something went wrong");
            }
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-center text-gray-800">Sign Up</h3>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div className="mb-4">
                        <input
                            type="text"
                            name="name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div className="text-red-500 text-sm">{formik.errors.name}</div>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 text-sm">{formik.errors.password}</div>
                        )}
                    </div>

                    {/* Contact Field */}
                    <div className="mb-4">
                        <input
                            type="text"
                            name="contact"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter Contact No."
                            value={formik.values.contact}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.contact && formik.errors.contact && (
                            <div className="text-red-500 text-sm">{formik.errors.contact}</div>
                        )}
                    </div>

                    {/* Login Link and Submit Button */}
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <span
                                className="text-blue-500 cursor-pointer hover:underline"
                                onClick={() => navigateTo("/login")}
                            >
                                Login
                            </span>
                        </p>
                        <button
                            type="submit"
                            className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                            disabled={formik.isSubmitting}
                        >
                            SIGN UP
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
