import PropTypes from "prop-types"
import React from "react"
import styles from "./textbox.module.css"

const SecretSanta = ({ input }) => {
    const names = input.split(',')
    names.forEach(name => name.trim())
    let pairs = {}

    const makePairs = () => {
        names.forEach(santa => {
            assignRecipient(santa)
        })
    }

    const assignRecipient = (santa) => {
        const possibleRecipients = names.filter(name => name != santa) // no self-matches
                                    .filter(name => !Object.values(pairs).includes(name)) // no duplicate recipients
                                    .filter(name => pairs[name] != santa) // no 2-way match loops
        if (santa !== names[names.length - 2] || Object.values(pairs).indexOf(names[names.length - 1] !== -1)) {
            pairs[santa] = possibleRecipients[Math.floor(Math.random() * possibleRecipients.length)]
        }
        else { // force assignment of final input to 2nd-to-last input if final input is not a recipient by then
            pairs[santa] = names[names.length - 1]
        }
    }

    const setFileContents = (santa) => `Hi ${santa}, your pairing is with ${pairs[santa]}. Merry Christmas!`

    makePairs()

    return (
        <div id={styles.output} className={styles.box}>
            {Object.keys(pairs).map(santa => 
                <div>
                    <a href={'data:text/plain;charset=utf-8,' + setFileContents(santa)} 
                        download={'' + santa + '_secretSanta.txt'}>{santa}</a>
                    <br></br>
                </div>
            )}
        </div>
    )
}

SecretSanta.propTypes = {
    input: PropTypes.string.isRequired,
  }
  
SecretSanta.defaultProps = {
    input: ``,
}

export default SecretSanta
