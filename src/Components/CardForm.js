import React, {useState, useEffect} from "react";

function CardForm({ handleChange, handleSubmit, handleCancel, mode, card}) {

    // for cards -> front, back 
        
    const [front, setFront] = useState(card?.front || "");
    const [back, setBack] = useState(card?.back || "");
    
    useEffect(() => {
        setFront(card?.front || "");
        setBack(card?.back || "");
    }, [card]);

return (
<div>
    <h2>{mode === "Edit" ? "Edit Card" : "Add Card"}</h2>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label 
                htmlFor="front" 
                className="form-label">Front</label>
            <textarea   
                rows="3"
                id="front"
                name="front"
                className="form-control"
                onChange={(event) => {
                    setFront(event.target.value);
                    handleChange(event);
                }}
                type="text"
                value={front}
            />
        </div>
        <div className="form-group">
            <label 
                htmlFor="back"  
                className="form-label">Back</label>
            <textarea
                rows="3"
                id="back"
                name="back"
                className="form-control"
                onChange={(event) => {
                    setBack(event.target.value);
                    handleChange(event);
                }}
                type="text"
                value={back}
                />
        </div>
        <button 
            className="btn btn-secondary mx-1"
            type="button"
            onClick={handleCancel}
            >
                Cancel
        </button>

        <button
            className="btn btn-primary mx-1" 
            type="submit">
                Save
        </button>
        
    </form>
    </div>
 )   
}

export default CardForm;