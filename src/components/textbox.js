import React, {useState} from "react"
import styles from "./textbox.module.css"

import SecretSanta from "./secretSanta"

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
            {showOutput === true && <SecretSanta input={people}/>} 
        </div> // put textarea in secretSanta component
    )
}

export default Textbox