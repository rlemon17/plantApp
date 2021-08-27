import React from 'react';

const UndoBtn = (props) => {

    // Upon clicking, call undo function in App.jsx
    const handleClick = () => {
        props.onUndo();
    }

    return (
        <button id="undo-btn" onClick={handleClick}>
            Undo Delete
        </button>
    )
};

export default UndoBtn;