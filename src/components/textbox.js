import PropTypes from "prop-types"
import React from "react"
import "./textbox.css"

const Textbox = () => (
    <div style={{background: "#f4f4f4"}}>
        <form class="part">
            <textarea id="input" placeholder="Enter names here..." autofocus></textarea>
            <button type="submit" id="generate" >Generate your pairings</button>
            <div></div>
        </form>
    </div>
)

export default Textbox