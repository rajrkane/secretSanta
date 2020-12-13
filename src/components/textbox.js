import React, {useState} from "react"
import styles from "./textbox.module.css"

const Textbox = () => {

    const [showOutput, setShowOutput] = useState(false)
    const [people, setPeople] = useState("")

    const onChange = (e) => {
        setShowOutput(false)
        setPeople(e.target.value)
    }

    const onGenerate = (e) => {
        e.preventDefault()
        setShowOutput(true)
    }

    return (
        <div style={{background: "#f4f4f4"}}>
            <form className={styles.part}>
                <textarea name="people" onChange={e => onChange(e)} id={styles.input}
                    className={styles.box} placeholder="Enter names here..."/> 
                <button type="submit" onClick={e => onGenerate(e)} id={styles.generate}>
                    Generate your pairings
                </button>
            </form>
            {showOutput === true && 
                <textarea readOnly id={styles.output} className={styles.box} value={people}/>
            }
        </div>
    )
}

export default Textbox