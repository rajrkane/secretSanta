import PropTypes from "prop-types"
import React from "react"
import styles from "./textbox.module.css"

const SecretSanta = ({ input }) => {
    const names = input.split(',')
    names.forEach(name => name.trim())
    let pairs = {}

    const makePairs = () => {
        names.forEach(santa => assignRecipient(santa))
        console.log(pairs)
        return pairs
    }

    const assignRecipient = (santa) => {
        const possibleRecipients = names.filter(name => name != santa)
                                    .filter(name => !Object.values(pairs).includes(name))
        pairs[santa] = possibleRecipients[Math.floor(Math.random() * possibleRecipients.length)]
    }

    return (
        <textarea readOnly id={styles.output} className={styles.box} value={JSON.stringify(makePairs())}/>
    )
}

SecretSanta.propTypes = {
    input: PropTypes.string.isRequired,
  }
  
SecretSanta.defaultProps = {
    input: ``,
}

export default SecretSanta
