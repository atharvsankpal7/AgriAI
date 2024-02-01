import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Signup from "./components/Signup";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import ChatbotComponent from "./components/ChatbotComponent";
import UploadHistory from "./components/UploadHistory";
import PageNotFound from "./components/PageNotFound";
const App = () => {
    return (
        <>
            <NoteState>
                <Router>
                    <Navbar />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route
                                path="/history"
                                element={<UploadHistory />}
                            />
                            <Route path="signup" element={<Signup />} />
                            <Route path="login" element={<Login />} />
                            <Route
                                path="/chatbot"
                                element={<ChatbotComponent />}
                            />
                            <Route path="/*" element={<PageNotFound />} />
                        </Routes>
                    </div>
                </Router>
            </NoteState>
        </>
    );
};

export default App;
