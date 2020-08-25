import React from 'react';
import { createPortal } from 'react-dom';

import Overlay from '../Overlay/Overlay';
import "./Modal.scss";

function Modal({ children, modalIsOpen, toggleModal }) {

    if (!modalIsOpen) {
        return null
    } 

    let modal = (
        <React.Fragment>
            <Overlay show={modalIsOpen} closed={toggleModal} />
            <div className="Modal" style={{ display: modalIsOpen ? 'block' : 'none' }}>
                <div className="Modal-inner">
                    { children }
                </div>
            </div>
        </React.Fragment>
    )

    return createPortal(modal, document.getElementById('modal'))
}

export default Modal;
