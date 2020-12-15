import PropTypes from "prop-types"
import React from "react"
import styles from "./textbox.module.css"

const SecretSanta = ({ input }) => {
    const names = input.split(',')
    names.forEach(name => name.trim())
    let pairs = {}
    let links = []

    const makePairs = () => {
        names.forEach(santa => assignRecipient(santa))
        // return pairs
        return links
    }

    // const writeToFile = (santa) => {
    //     fs.writeFile(`${santa}SecretSanta.txt`, `Hi ${santa}, your pair is ${pairs[santa]}`)
    // }

    const setDownloadableLink = (santa) => {
        const element = document.createElement('a') // create anchor element
        console.log('here')
        element.setAttribute("href", 'data:text/plain;charset=utf-8,' + encodeURIComponent(`Hi ${santa}, your pair is ${pairs[santa]}`))
        element.setAttribute("download", `${santa}SecretSanta.txt`)
        links.push(element)
        console.log('links ', links)
    }

    const assignRecipient = (santa) => {
        const possibleRecipients = names.filter(name => name != santa) // no self-matches
                                    .filter(name => !Object.values(pairs).includes(name)) // no duplicate recipients
                                    .filter(name => pairs[name] != santa) // no 2-way match loops
        pairs[santa] = possibleRecipients[Math.floor(Math.random() * possibleRecipients.length)]
        setDownloadableLink(santa)
    }

    return (
        <textarea readOnly id={styles.output} className={styles.box} value={makePairs()}/>
    )
}

SecretSanta.propTypes = {
    input: PropTypes.string.isRequired,
  }
  
SecretSanta.defaultProps = {
    input: ``,
}

export default SecretSanta
