import React from "react"
import styles from "./textbox.module.css"

const Textbox = () => (
    <div style={{background: "#f4f4f4"}}>
        <form className={styles.part}>
            <textarea id={styles.input} placeholder="Enter names here..." autofocus></textarea>
            <button type="submit" id={styles.generate} >Generate your pairings</button>
        </form>
        <p>Outputs</p>
    </div>
)

export default Textbox