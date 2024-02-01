import React, { useState, useRef, useEffect } from "react";
import "../css/chatbot.css";
import { useNavigate } from "react-router-dom";
import { OpenAI } from "openai";

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you?", isUser: false },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, []);

    const openai = new OpenAI({
        apiKey: "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"   ,
        dangerouslyAllowBrowser: true,
    });

    const askOpenAI = async (text) => {
        console.log(text);
        try {
            const response = await openai.chat.completions.create({
                messages: [{ role: "user", content: text }],
                model: "gpt-3.5-turbo",
            });

            const generatedText = response?.choices[0]?.message?.content;
            console.log(response);
            console.log(generatedText);

            return generatedText;
        } catch (error) {
            console.error("Error calling OpenAI API:", error);
            return "Error generating response.";
        }
    };

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (newMessage.trim() === "") return;

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: newMessage, isUser: true },
        ]);

        const botResponse = await askOpenAI(newMessage);

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: botResponse, isUser: false },
        ]);

        setNewMessage("");
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <div className="chatbox">
                        {messages.map((msg, index) => (
                            <div className="d-grid w-100" key={index}>
                                <div
                                    className={
                                        msg.isUser
                                            ? "user-message"
                                            : "bot-message"
                                    }
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef}></div>
                    </div>
                    <form onSubmit={handleSendMessage}>
                        <div className="input-group mt-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button
                                className="btn btn-primary"
                                onClick={handleSendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
