const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const PORT = 3000
const {s3upload} = require("./public/s3")

const urlEncodedParser = bodyParser.urlencoded({extended: false})

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname+'/index.html'))
})

app.post('/', urlEncodedParser, (req, res) => {
	console.log('got names: ', req.body['names'])
	names = req.body['names']
	s3upload(names)

	res.render(__dirname+"/index.html", {output:names})
})

app.engine('html', require('ejs').renderFile)

app.use(express.static(path.join(__dirname, 'public')))

const hostname = '0.0.0.0';
app.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
  });










/**


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
const names = getNames()
let obj = new SecretSanta(names)
obj.makePairs()
document.getElementById("output").style.display = ''
}
 */