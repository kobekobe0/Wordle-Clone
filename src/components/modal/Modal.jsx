import React from 'react'
import './modal.css'
import { Link } from 'react-router-dom'

function Modal({ message, link }) {
    return (
        <>
            <div className="modal_container">
                <h1>{message}</h1>
                {link ? <Link to="/">Try again?</Link> : null}
            </div>
        </>
    )
}

export default Modal
