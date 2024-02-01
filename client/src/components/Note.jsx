import React from "react";

const Note = (props) => {
    const image =
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg";
    return (
        <div className="card col" style={{ width: 18 + "rem" }}>
            <img
                src={props.baseImage.length > 100 ? props.baseImage : image}
                className="card-img-top"
                alt="image"
            />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text text-start"><span><b className="text-warning">Expert's Opinion :</b></span>{props.description || " Not given yet"}</p>
            </div>
        </div>
    );
};

export default Note;
