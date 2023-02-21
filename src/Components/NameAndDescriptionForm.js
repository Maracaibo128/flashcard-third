import React, {useState, useEffect} from "react";

function NameAndDescriptionForm({ handleChange, handleSubmit, handleCancel, mode, deck }) {

    console.log(deck);

    const [deckName, setDeckName] = useState(deck?.name || "");
    const [deckDescription, setDeckDescription] = useState(deck?.description || "")

    useEffect(() => {
        setDeckName(deck?.name || "");
        setDeckDescription(deck?.description || "");
   }, [deck]);
 //console.log(mode);
    return (
        <>
        <h3>{mode === "Edit" ? "Edit Deck" : "Create Deck"}</h3>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label
                    htmlFor="FormControlInput1"
                    className="form-label">Name
                </label>
                <input 
                    type="text"
                    className="form-control"
                    id="FormControlInput1"
                    name="name" 
                    //onChange={handleChange}
                    value={deckName}
                    onChange={(event) => {
                        setDeckName(event.target.value);
                        handleChange(event);
                    }}
                />

                <div className="mb-3">
                    <label
                        htmlFor="FormControlTextarea1"
                        className="form-label">
                            Description
                    </label>
                    <textarea
                        className="form-control"
                        id="FormControlTextarea1"
                        name="description"
                        rows="3"
                        value={deckDescription}
                        onChange={(event) => {
                            setDeckDescription(event.target.value);
                            handleChange(event);
                        }}
                    />

                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={handleCancel}
                    >
                            Cancel
                    </button>

                    <button
                        className="btn btn-primary"
                        type="submit">
                            Save
                    </button>
                </div>
            </div>
        </form>
        </>
    )

}

export default NameAndDescriptionForm;

