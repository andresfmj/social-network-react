import React from 'react';

import Toolbar from '../Toolbar/Toolbar';
import './Layout.scss';

function Layout({ children }) {
    return (
        <React.Fragment>
            <Toolbar />
            <div className="Layout-container">
                { children }
            </div>
        </React.Fragment>
    )
}

export default Layout;
