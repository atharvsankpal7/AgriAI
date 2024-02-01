import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import { Spin } from "antd";

const App = () => {
    // Pages
    const Home = lazy(() => import("./components/Home"));
    const About = lazy(() => import("./components/About"));
    const Signup = lazy(() => import("./components/Signup"));
    const Login = lazy(() => import("./components/Login"));
    const ChatbotComponent = lazy(() =>
        import("./components/ChatbotComponent")
    );
    const UploadHistory = lazy(() => import("./components/UploadHistory"));
    const PageNotFound = lazy(() => import("./components/PageNotFound"));

    // Components
    return (
        <>
            <NoteState>
                <Router>
                    <Navbar />
                    <div className="container">
                        <Suspense
                            fallback={<Spin spinning={true} fullscreen />}
                        >
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route
                                    path="/history"
                                    element={<UploadHistory />}
                                />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/chatbot"
                                    element={<ChatbotComponent />}
                                />
                                <Route path="/*" element={<PageNotFound />} />
                            </Routes>
                        </Suspense>
                    </div>
                </Router>
            </NoteState>
        </>
    );
};

export default App;
