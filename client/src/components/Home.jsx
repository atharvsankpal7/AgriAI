import "../App.css";
import "../css/backgroundImage.css";
import NoteContext from "../context/notes/NoteContext";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Home = () => {
    const noteContext = useContext(NoteContext);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const url = "http://localhost:5000/api/";

    // Destructuring
    const { notes, setNotes } = noteContext;
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadingStatus, setUploadingStatus] = useState(false);
    const [cameraStream, setCameraStream] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        } else {
            getNotes();
        }
    }, []);

    useEffect(() => {
        return () => {
            // Cleanup: stop media stream when component unmounts
            if (cameraStream) {
                cameraStream.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        };
    }, [cameraStream]);

    const getNotes = async () => {
        try {
            const response = await fetch(`${url}notes/getallnotes`, {
                method: "GET",
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });

            if (!response.ok) {
                return;
            }

            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const handleCameraCapture = async () => {
        setSelectedImage(0);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            setCameraStream(stream);
            // Display camera stream in the <video> element
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    };

    const handleTakePicture = () => {
        if (videoRef.current) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const base64String = canvas.toDataURL("image/png");
            setSelectedImage(base64String);
            // Stop camera stream after capturing the picture
            if (cameraStream) {
                cameraStream.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        }
    };

    const handleInputImageChange = (e) => {
        try {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.log(error);
        }
    };

    const uploadImage = async () => {
        setUploadingStatus(true);
        try {
            messageApi.open({
                type: "loading",
                content: "Uploading Image...",
                duration: 0,
            });
            const response = await fetch(`${url}notes/addnote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    baseImage: selectedImage,
                }),
            });

            if (!response.ok) {
                messageApi.destroy();
                messageApi.error("Error Uploading Image");
                setUploadingStatus(false);
                return;
            }

            const data = await response.json();
            const currentNotes = notes;
            currentNotes.push(data);
            setNotes(currentNotes);
            setSelectedImage(null);
            getNotes();
            messageApi.destroy();
            messageApi.success("Successfully uploaded image");
            setUploadingStatus(false);
        } catch (error) {
            messageApi.destroy();
            messageApi.error("Error Uploading Image");
            setUploadingStatus(false);
            console.error("Error Uploading notes:", error);
        }
    };

    return (
        <div className=" pt-3 pb-3 ">
            {contextHolder}
            <div className="container d-flex flex-column align-items-center justify-content-center text-xxl-center backgroundImage w-75">
                <h2 className="h1 text-center py-3 bg-opacity-75 bg-dark w-100" >
                    Welcome back,{" "}
                    {localStorage.getItem("username")
                        ? localStorage.getItem("username")
                        : "username"}{" "}
                    !!!
                </h2>
                <div className="image-upload-container  ">
                    <div className="img ">
                        <input
                            type="file"
                            accept="image/*"
                            name=""
                            id="image_upload"
                            hidden
                            onChange={handleInputImageChange}
                        />
                        <label
                            htmlFor="image_upload"
                            className="w-100 h-100 d-flex align-items-center justify-content-center"
                        >
                            {selectedImage === null ? (
                                <img
                                    src="upload.png"
                                    alt="Browse Images"
                                    className="w-50 h-100"
                                />
                            ) : selectedImage ? (
                                <img
                                    src={selectedImage}
                                    alt="selectedImage"
                                    className="w-100 h-100"
                                />
                            ) : (
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    muted
                                    className="w-100 h-100"
                                ></video>
                            )}
                        </label>
                    </div>
                    <div>
                        <div>
                            <button
                                className="btn btn-outline-dark border-2 my-3 text-dark-emphasis fs-4"
                                onClick={handleCameraCapture}
                            >
                                Open Camera
                            </button>
                            <button
                                className="btn btn-outline-dark border-2 my-3 text-dark-emphasis fs-4"
                                onClick={handleTakePicture}
                            >
                                Capture Image
                            </button>
                        </div>

                        <button
                            className="btn btn-outline-dark border-2 w-100 my-3 text-dark-emphasis fs-4"
                            onClick={uploadImage}
                            disabled={!selectedImage || uploadingStatus}
                        >
                            Upload Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
