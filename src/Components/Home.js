import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function Home() {

const history = useHistory();    
const [decks, setDecks] = useState([]);


useEffect(() => {
    async function fetchData() {
        const abortController = new AbortController();
        try {
            const deckResponse = await listDecks
            (abortController.signal);
            setDecks(deckResponse);
        } catch (error) {
            console.error("Something's not right", error);
        }
        return () => {
            abortController.abort();
        };
}
fetchData();
}, []);


async function handleDelete(deckElement) {
    if (
        window.confirm(
            `Delete this deck?`
        )
    ) {
        //this reloads the page
        history.go(0);
        return await deleteDeck(deckElement.id);
    }
}

    return (
        <div className="container">
           <Link className="btn btn-secondary m-1 p-1" to="/decks/new">Create a Deck
{/*                <button>Create deck</button> */}
            </Link>
            <div className="card-deck">
                {decks.map((deckElement) => {
                    return (
                        <div 
                            className="card"
                            key={deckElement.id}
                            style={{width: "32rem"}}
                            
                        >
                            <div className="card-body">
                                <div className="card-title">    
                                    {`${deckElement.name}`}
                                </div>
                                <div className="card-subtitle">
                                    {`${deckElement.cards.length} cards`}
                                </div>
                                <div className="card-text">
                                    {`${deckElement.description}`}
                                </div>
                                
                                <Link   
                                    to={`/decks/${deckElement.id}`}className="btn btn-secondary m-1 p-1">
                                        {/*
                                        <button>View</button>
                                        */}
                                        View
                                </Link>

                                <Link   
                                    to={`/decks/${deckElement.id}/study`}
                                    className="btn btn-primary m-1 p-1">
                                       {/* <button>Study</button>
                                       */}
                                        Study
                                </Link>

                                <button
                                    type="button"
                                    className="btn btn-danger m-1 p-1"
                                    onClick={() => handleDelete(deckElement)}
                                    >
                                        Delete
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Home;
