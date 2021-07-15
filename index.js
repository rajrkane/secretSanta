class SecretSanta {

  constructor(names) {
    this.names = names;
    this.pairs = {};
  }

  makePairs = () => {
    this.names.forEach(santa => {
        this.assignRecipient(santa)
    })
    let mapContainer = document.getElementById("mapContainer")
    Object.keys(this.pairs).forEach(santa => {
      let mapDiv = document.createElement("div")
      let mapAnchor = document.createElement("a")
      mapAnchor.innerText = `Assignment for ${santa}`
      mapAnchor.setAttribute('href', '#')
      mapAnchor.setAttribute('download', '' + santa + '_secretSanta.txt')
      mapDiv.appendChild(mapAnchor)
      mapContainer.appendChild(mapDiv)
      mapAnchor.addEventListener('click', (e) => {
        mapAnchor.setAttribute('href', `data:text/plain;charset=utf-8,${this.setFileContents(santa)}`)
      })
    })
  }

  assignRecipient = (santa) => {
    const possibleRecipients = this.names.filter(name => name != santa) // no self-matches
                                .filter(name => !Object.values(this.pairs).includes(name)) // no duplicate recipients
                                .filter(name => this.pairs[name] != santa) // no 2-way match loops
    if (santa !== this.names[this.names.length - 2] || Object.values(this.pairs).indexOf(this.names[this.names.length - 1] !== -1)) {
        this.pairs[santa] = possibleRecipients[Math.floor(Math.random() * possibleRecipients.length)]
    }
    else { // force assignment of final input to 2nd-to-last input if final input is not a recipient by then
        this.pairs[santa] = this.names[this.names.length - 1]
    }
  }

  setFileContents = (santa) => `Hi ${santa}. You need to send a present to ${this.pairs[santa]}. Merry Christmas!`
  
}

const secretSanta = () => {
  document.getElementById("mapContainer").replaceChildren()
  const input = document.getElementById('input').value
  const names = input.split(',')
  names.forEach((name, index) => names[index] = name.trim())
  let obj = new SecretSanta(names)
  obj.makePairs()
  document.getElementById("output").style.display = ''
}