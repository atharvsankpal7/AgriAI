import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import AdminNote from "./AdminNote";
const AdminPage = () => {
    const url = "http://localhost:5000/api/";

    const navigate = useNavigate();

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        // if not logged in then navigate to the login page
        if (!localStorage.getItem("token")) {
            navigate("/login");
            return;
        }

        // if user is not admin then go to the home page
        if (!localStorage.getItem("isAdmin")) {
            navigate("/home");
            return;
        }

        getAllNotesAdmin();
    }, []);
    const getAllNotesAdmin = async () => {
        try {
            const response = await fetch(`${url}notes/getallnotesAdmin`, {
                method: "GET",
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });
            // Check if the response is ok
            if (!response.ok) {
                console.log(response);
                Modal.error({
                    title: "Error",
                    content: "Error fetching notes",
                });
                return;
            }

            const data = await response.json();
            setNotes(data);
        } catch (error) {
            Modal.error({
                title: "Error",
                content:
                    "Please Check Internet connectivity or try after sometime",
            });
        }
    };
    return (
        <>
            {notes.length ? (
                <div className="container my-5 note-container ">
                    {notes.map((note) => (
                        <AdminNote
                            key={note._id}
                            noteId={note._id}
                            baseImage={note.baseImage}
                            description={note.description}
                            title={note.title}
                            image={note.baseImage}
                            getAllNotesAdmin={getAllNotesAdmin}
                        />
                    ))}
                </div>
            ) : (
                <div className="container">
                    <p className="w-100 fs-1 fw-semibold text-center my-5">
                        No Notes Found
                    </p>
                    <button
                        className="btn btn-primary mx-auto"
                        onClick={getAllNotesAdmin}
                    >
                        {" "}
                        Reload{" "}
                    </button>
                </div>
            )}
        </>
    );
};

export default AdminPage;
