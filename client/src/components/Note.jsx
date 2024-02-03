import React from "react";

const Note = (props) => {
    return (
        <div className="card col" style={{ width: 18 + "rem" }}>
            <img src={props.image} className="card-img-top" alt="Plant" />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                {props.description ? (
                    <p className="card-text text-start">
                        <span>
                            <b className="text-warning">Expert's Opinion :</b>
                        </span>
                        {props.description}
                    </p>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Note;
