import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck, updateDeck } from "../utils/api/index";
import CardForm from "./CardForm";

function AddCard() {
    const history = useHistory();
    const { deckId } = useParams();
    const initialState = {
        front:"",
        back:"",
    };
    const [deck, setDeck] = useState({});
    const [newCard, setNewCard] = useState(initialState);

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const deckResponse = await readDeck(deckId,
abortController.signal);
                setDeck(deckResponse);
            } catch (error) {
                console.error("Something's not right", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, [deckId]);

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await createCard(
            deckId,
            {...newCard},
            abortController.signal
        );
        await updateDeck({ ...deck, cards: [...deck.cards, response]}, abortController.signal);
        history.push(`/decks/${deckId}`);
        setNewCard(initialState);
        return response;
    }

    function handleChange({target}) {
        setNewCard({
            ...newCard,
            [target.name]: target.value,
        });
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
                <li className="breadcrumb-item active">Add Card</li>
            </ol>

            <CardForm 
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleCancel={handleCancel}
                mode="Add"
                card={{ front: newCard.front, back: newCard.back }}
                />
        </div>
    );
}

export default AddCard;