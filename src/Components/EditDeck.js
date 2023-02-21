import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";
import NameAndDescriptionForm from "./NameAndDescriptionForm";

function EditDeck() {
    const history = useHistory();
    const {deckId} = useParams();
    const initialDeckState = {
        id: "",
        name: "",
        description: "",
    };
    const [deck, setDeck] = useState(initialDeckState);
    const [deckName, setDeckName] = useState("");

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const response = await readDeck(deckId,abortController.signal);
                setDeck(response);
                setDeckName(response.name);
            } catch (error) {
                console.error("Something's not right", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, [deckId]);

    function handleChange({ target }) {
        if (target.name === "name"){
            setDeckName(target.value);
        }
        setDeck({
            ...deck,
            [target.name]: target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await updateDeck({ ...deck, name: deckName }, abortController.signal);
        setDeck(response);
        history.push(`/decks/${deckId}`);
        return response;
    }

    async function handleCancel() {
        history.push(`/decks/${deckId}`);
    }

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Edit Deck</li>
            </ol>

            <NameAndDescriptionForm 
            handleCancel={handleCancel}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            mode="Edit"
            deck={{name: deckName, description: deck.description}}
            />

        </div>
    );
}
export default EditDeck;
