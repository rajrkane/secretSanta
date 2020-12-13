import PropTypes from "prop-types"
import React from "react"
import styles from "./textbox.module.css"

const SecretSanta = ({ input }) => {

    return (
        <textarea readOnly id={styles.output} className={styles.box} value={input}/>
    )
}

SecretSanta.propTypes = {
    input: PropTypes.string.isRequired,
  }
  
SecretSanta.defaultProps = {
    input: ``,
}

export default SecretSanta
