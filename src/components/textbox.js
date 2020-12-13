import React, {useState} from "react"
import styles from "./textbox.module.css"

const Textbox = () => {

    const [showOutput, toggleShowOutput] = useState(false)

    const onGenerate = (e) => {
        e.preventDefault()
        toggleShowOutput(!showOutput) 
    }

    return (
        <div style={{background: "#f4f4f4"}}>
            <form className={styles.part}>
                <textarea id={styles.input} className={styles.box} placeholder="Enter names here..." autofocus></textarea>
                <button id={styles.generate} onClick={e => onGenerate(e)} >Generate your pairings</button>
            </form>
            {showOutput === true && 
                <textarea readOnly id={styles.output} className={styles.box}>Outputs</textarea>
            }
        </div>
    )
}

export default Textbox