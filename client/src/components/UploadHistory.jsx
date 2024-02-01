import "../App.css";
import "../css/backgroundImage.css";
import NoteContext from "../context/notes/NoteContext";
import React, { useContext, useEffect } from "react";
import Note from "./Note";
import AlertDismissibleExample from "./Alert";
import { useNavigate } from "react-router-dom";
const UploadHistory = () => {
    const noteContext = useContext(NoteContext);

    const url = "http://localhost:5000/api/";

    // Destructuring
    const { notes, setNotes } = noteContext;

    // if not logged in then navigate to the login page
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
            return;
        }
        getNotes();
    }, []);

    let getNotes = async () => {
        try {
            const response = await fetch(`${url}notes/getallnotes`, {
                method: "GET",
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });

            // Check if the response is ok
            if (!response.ok) {
                return;
            }

            // Parse the JSON data from the response
            const data = await response.json();

            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    return (
        <div className=" pt-3 pb-3 backgroundImage">
            <h3 className=" h1 text-center py-3 bg-opacity-75 bg-dark">
                Welcome back,{" "}
                {localStorage.getItem("username")
                    ? localStorage.getItem("username")
                    : "username"}{" "}
                !!!
            </h3>
            {Array.isArray(notes) ? (
                <div className="container note-container text-xxl-center">
                    {notes.map((note) => (
                        <Note
                            key={note._id}
                            baseImage={note.baseImage}
                            description={note.description}
                            title={note.title}
                            image={note.baseImage}
                        />
                    ))}
                </div>
            ) : (
                <AlertDismissibleExample
                    type="danger"
                    message="Error Loading Previous Results"
                ></AlertDismissibleExample>
            )}
        </div>
    );
};

export default UploadHistory;
