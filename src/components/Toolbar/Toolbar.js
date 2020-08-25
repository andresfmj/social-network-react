import React from 'react';
import { Link } from 'react-router-dom';

import './Toolbar.scss';

function Toolbar(props) {
    return (
        <nav className="Toolbar">
            <div className="Toolbar__container">
                <header>
                    <h2 className="brand-name">Social Network</h2>
                </header>
                <ul className="Toolbar__menu">
                    <li><Link to='/posts'>Posts</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Toolbar;
