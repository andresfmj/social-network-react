import React from 'react';

import './Toolbar.scss';

function Toolbar(props) {
    return (
        <nav className="Toolbar">
            <div className="Toolbar__container">
                <header>
                    <h2 className="brand-name">Social Network</h2>
                </header>
                <ul className="Toolbar__menu">
                    <li><a href="/posts">Posts</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Toolbar;
