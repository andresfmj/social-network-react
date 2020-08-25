import React from 'react';

import Posts from '../Posts/Posts';

function Feed(props) {
    return (
        <React.Fragment>
            <div style={{ flex: 1 }}>
                <p></p>
            </div>
            <Posts />
            <div className="Aside" style={{ flex: 1 }}>
                <div className="Aside__search">
                    <input type="text" placeholder="Buscar..." />
                </div>
                <div className="Aside__tags">
                    <ul>
                        <li>#dog</li>
                        <li>#another</li>
                        <li>#tag22</li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Feed;
