import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
const AdminNote = (props) => {
    const url = "http://localhost:5000/api/";

    // From AntDesign
    const [messageApi, contextHolder] = message.useMessage();

    const navigate = useNavigate();

    const expertOpinion = useRef("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        messageApi.loading({ content: "Updating Information" });

        const inputValue = expertOpinion.current.value;
        try {
            const response = await fetch(
                `${url}notes/updatenote/${props.noteId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        description: inputValue,
                    }),
                }
            );
            if (response.status === 404) {
                messageApi.error({ content: "Note was not found" });
                return;
            }

            if (!response.ok) {
                messageApi.error({ content: "Could not update the note" });
                return;
            }
            messageApi.destroy()
            messageApi.success({ content: "Information Updated" });
            props.getAllNotesAdmin();
        } catch (error) {
            messageApi.error({ content: "Error Updating Information" });
            console.log(error);
        }
    };
    return (
        <div className="card col" style={{ width: 18 + "rem" }}>
            {contextHolder}
            <img src={props.image} className="card-img-top" alt="Plant" />
            <div className="card-body">
                <h4 className="text-warning">AI's Prediction</h4>
                <h5 className="card-title">{props.title}</h5>
                {props.description ? (
                    <p className="card-text text-start">
                        <span>
                            <b className="text-warning">Expert's Opinion :</b>
                        </span>
                        {props.description}
                    </p>
                ) : (
                    <div>
                        <form onSubmit={handleSubmit} className="mt-4 w-100">
                            <label htmlFor="ExpertInput">
                                <span className="text-info fs-4">
                                    Expert's Opinion :
                                </span>
                            </label>
                            <input
                                type="tel"
                                name=""
                                id="ExpertInput"
                                ref={expertOpinion}
                            />

                            <button className="btn btn-outline-info mt-2">
                                confirm
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminNote;
