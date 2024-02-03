import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Modal } from "antd";
const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();
    /**
     * Logs the user out by removing the token from localStorage,
     * redirecting to the login page, and showing a success modal.
     */
    const handleLogOutClick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
        Modal.success({
            title: "Success",
            content: "You have successfully logged out",
        });
    };
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary ">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/about">
                    SmartAgriScan
                </Link>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {localStorage.getItem("token") ? (
                            <>
                                <li className="nav-item ">
                                    <Link
                                        className={`nav-link ${
                                            location.pathname === "/"
                                                ? "active text-info"
                                                : ""
                                        }`}
                                        aria-current="page"
                                        to="/"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            location.pathname === "/History"
                                                ? " active text-info"
                                                : ""
                                        }`}
                                        to="/History"
                                    >
                                        History
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <></>
                        )}
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    location.pathname === "/about"
                                        ? " active text-info"
                                        : ""
                                }`}
                                to="/about"
                            >
                                About
                            </Link>
                        </li>
                        {localStorage.getItem("token") ? (
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${
                                        location.pathname === "/chatbot"
                                            ? " active text-info"
                                            : "text-warning "
                                    }`}
                                    to="/chatbot"
                                >
                                    ChatBot
                                </Link>
                            </li>
                        ) : (
                            <></>
                        )}
                    </ul>
                    {localStorage.getItem("token") ? (
                        <form>
                            <button
                                className="btn btn-danger"
                                onClick={handleLogOutClick}
                                type="button"
                            >
                                Log Out
                            </button>
                        </form>
                    ) : (
                        <form className="d-flex gap-2">
                            <Link
                                className="btn btn-outline-light"
                                to="/signup"
                            >
                                Sign-Up
                            </Link>
                            <Link className="btn btn-info" to="/login">
                                Login
                            </Link>
                        </form>
                    )}
                </div>
                <button
                    className="navbar-toggler my-1 "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
