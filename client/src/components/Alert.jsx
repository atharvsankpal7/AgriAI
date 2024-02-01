import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

function AlertDismissibleExample(props) {
    const [show, setShow] = useState(true);

    return (
        <Alert
            show={show}
            variant={`${props.type}`}
            onClose={() => setShow(false)}
            dismissible
            className="mx-auto w-50"
        >
            <Alert.Heading className="text-center ">
                {props.message}
            </Alert.Heading>
        </Alert>
    );
}

export default AlertDismissibleExample;
