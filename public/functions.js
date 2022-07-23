const setFileContents = (matches) => {
	// Pad with whitespace to bypass browser link preview
	return matches.map((match) => `                                                                                                                                                  Hi ${match.split(',')[0]}. You need to send a present to ${match.split(',')[1]}. Merry Christmas!`)
}

module.exports = {setFileContents}
