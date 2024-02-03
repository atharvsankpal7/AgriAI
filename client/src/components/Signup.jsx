import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Modal, message, Spin } from "antd";
const Signup = () => {
    const apiUrl = "http://localhost:5000/api/";
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [signupLoading, setSignupLoading] = useState(false);

    /**
     * Handles submitting the signup form.
     *
     * Validates form data client-side, then makes request to backend API
     * to create a new user. Handles various response codes from the API.
     * Shows success/error messages to user as needed.
     *
     * Redirects to homepage after successful signup.
     */
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        setSignupLoading(true);

        // Client side verification
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length !== 0) {
            setErrors(validationErrors);
            setSignupLoading(false);
            return;
        }

        try {
            const response = await fetch(`${apiUrl}auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            // If email-id is already in use
            if (response.status === 409) {
                Modal.error({
                    title: "Error",
                    content: "Use different email-id please",
                });
                setSignupLoading(false);
                return;
            }

            // If the form data is in invalid format (checked by server)
            if (!response.ok) {
                Modal.error({
                    title: "Error",
                    content: "Invalid Form Data",
                });
                setSignupLoading(false);
                return;
            }

            // User account creation Successful
            const data = await response.json();

            localStorage.setItem("token", data.authToken);
            localStorage.setItem("username", data.username);
            navigate("/");
            message.success({
                title: "Success",
                content: "User created successfully",
            });
            setSignupLoading(false);
        } catch (error) {
            Modal.error({
                title: "Error",
                content:
                    "Error connecting to backend please check internet connection OR try after sometime",
            });
            setSignupLoading(false);
            console.error("Error during login request:", error);
        }
    };

    const validateForm = (data) => {
        let errors = {};

        if (!data.username.trim()) {
            errors.username = "Username is required";
        } else if (data.username.length < 5) {
            errors.username = "Username should be at least 5 characters";
        }

        if (!data.email.trim()) {
            errors.email = "Email is required";
        } else if (!isValidEmail(data.email)) {
            errors.email = "Invalid email address";
        }

        if (!data.password.trim()) {
            errors.password = "Password is required";
        } else if (data.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }

        return errors;
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });

        setErrors({
            ...errors,
            [e.target.id]: "",
        });
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="container p-4">
                <div className="row">
                    <div className="col-md-6 text-center ">
                        <div className=" my-5 h1 fw-bold ">
                            SmartAgroScan <br />
                            <span className="w-100 text-primary h2">
                                Revolutionizing Plant Health with AI Powered
                                Diagnosis
                            </span>
                        </div>

                        <p
                            className="px-3 "
                            style={{ color: "hsl(217, 10%, 50.8%)" }}
                        >
                            SmartAgroScan combines AI and Machine Learning to
                            revolutionize plant disease identification. Our
                            platform provides quick, accurate, and easy-to-use
                            diagnostics, empowering growers and gardeners to
                            protect their crops effectively. With SmartAgroScan,
                            ensure the health and productivity of your plants
                            through advanced technology.
                        </p>
                    </div>

                    <div className="col-md-6">
                        <div className="card my-5">
                            <div className="card-body p-5">
                                <div className="mb-4">
                                    <label
                                        htmlFor="username"
                                        className="form-label"
                                    >
                                        User name
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            errors.username ? "is-invalid" : ""
                                        }`}
                                        id="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                    {errors.username && (
                                        <div className="invalid-feedback">
                                            {errors.username}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className={`form-control ${
                                            errors.email ? "is-invalid" : ""
                                        }`}
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className={`form-control ${
                                            errors.password ? "is-invalid" : ""
                                        }`}
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>

                                <Spin spinning={signupLoading}>
                                    {" "}
                                    <button
                                        className="w-100 btn btn-primary"
                                        type="submit"
                                        disabled={signupLoading}
                                    >
                                        Sign up
                                    </button>
                                </Spin>
                                <hr />
                                <b>
                                    Already Have An Account?{" "}
                                    <Link to="/login" className=" link-info">
                                        Login
                                    </Link>
                                </b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Signup;
