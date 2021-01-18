import React from 'react'
import './Buttons.css'
function Button(props) {
    return (
        <div>
            <button className="button" >{props.name}</button>
        </div>
    )
}

export default Button
