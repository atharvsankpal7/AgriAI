import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {

    const [notes, setNotes] = useState([]);



    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
