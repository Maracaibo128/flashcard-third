import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { createDeck, readDeck } from "../utils/api/index";
import NameAndDescriptionForm from "./NameAndDescriptionForm";

function CreateDeck() {
    const history = useHistory();
    //const {deckId} = useParams();
    const initialDeckState = {
        name: "",
        description: "",
    };

    const [deck, setDeck] = useState(initialDeckState);
   //const [deckName, setDeckName] = useState("");

   /*
useEffect(() => {
    async function fetchData() {
        const abortController = new AbortController();
        try {
            const deckResponse = await readDeck(deckId, abortController.signal);
            setDeck(deckResponse);
            setDeckName(deckResponse.name);
        } catch (error) {
            console.error("Something's not right", error);
        }
        return () => {
            abortController.abort();
        };
    }
    if (deckId) {
        fetchData();
    }
}, [deckId]);
    */

    function handleChange({target}) {
   
        setDeck({
            ...deck,
            [target.name]: target.value,
        });
    }

   /*
    if (target.name === "name") {
    setDeckName(target.value);
   } setDeck({
    ...deck,
    [target.name]: target.value,
   });
}
    */

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await createDeck(
            //{...newDeck},
            //{
                 deck, 
                //name: deckName, 
                //description: deck.description },
            abortController.signal
        );
        //setDeck(response);
        history.push("/");
        //return response;
    }

    //async 
        function handleCancel() {
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
                handleCancel={handleCancel} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                mode="Create"
                deck={deck}
                //deck={{ name: deckName, description: deck.description }}
                />
        </div>
    )
}
export default CreateDeck;
