import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";

function AddCard() {
    const history = useHistory();
    const { deckId } = useParams();
    const initialState = {
        front:"",
        back: "",
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
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await createCard(
            deckId,
            {...newCard},
            abortController.signal
        );
        history.go(0);
        setNewCard(initialState);
        return response;
    }

    function handleChange({target}) {
        setNewCard({
            ...newCard,
            [target.name]: target.value,
        });
    }

    
    async function handleDone() {
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
            <form onSubmit={handleSubmit}>
            <h2>{deck.name}: Add Card</h2>
            <div className="form-group">
                    <label>Front</label>
                    <textarea   
                        type="text"
                        id="front"
                        name="front"
                        className="form-control"
                        onChange={handleChange}
                        value={newCard.front}
                    />
                </div>
                <div className="form-group">
                    <label>Back</label>
                    <textarea
                        type="text"
                        id="back"
                        name="back"
                        className="form-control"
                        onChange={handleChange}
                        value={newCard.back}
                        />
        </div>
        <button 
                    className="btn btn-secondary m-1 p-1"
                    onClick={() => handleDone()}
                    >Done</button>
                <button
                    className="btn btn-primary m-1 p-1" 
                    type="submit">Save</button>
            </form>
        </div>
    );
}

export default AddCard;