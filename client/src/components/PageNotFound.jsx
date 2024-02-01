import React from "react";
import { useNavigate } from "react-router-dom";
function PageNotFound() {
    const navigate = useNavigate();
    const handleHomePageClick = () => {
        navigate("/");
    };
    return (
        <div className="container py-5 my-5">
            <div className="py-5 position-relative z-index-1 container ">
                <h1 className="text-center fw-bold fs-3 my-5">
                    Nothing to see here :(
                </h1>

                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-outline-warning"
                        onClick={handleHomePageClick}
                    >
                        Take me back to the home page
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;
