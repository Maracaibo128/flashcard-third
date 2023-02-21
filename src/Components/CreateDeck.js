import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
import NameAndDescriptionForm from "./NameAndDescriptionForm";

function CreateDeck() {
    const history = useHistory();
    const initialState = {
        name: "",
        description: "",
    };
    const [newDeck, setNewDeck] = useState(initialState);

    function handleChange({target}) {
        setNewDeck({
            ...newDeck,
            [target.name]: target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await createDeck(
            {...newDeck},
            abortController.signal
        );
        history.push("/");
        return response;
    }

    async function handleCancel() {
        history.push("/");
    }

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Create deck</li>
            </ol>
           
            <NameAndDescriptionForm 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                handleCancel={handleCancel} 
                mode="Create"
                deck={{ name: "", description: "" }}
                />

        </div>
    )



}

export default CreateDeck;
