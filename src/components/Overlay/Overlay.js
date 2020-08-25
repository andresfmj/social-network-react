import React from 'react';

import "./Overlay.scss";

function Overlay({ show, closed }) {
    return (
        <div className="Overlay" style={{ display: show ? 'block' : 'none' }} onClick={closed}></div>
    )
}

export default Overlay;
