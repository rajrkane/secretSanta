const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const PORT = 8000
const S3 = require("./public/s3")
const SQS = require("./public/sqs")

const urlEncodedParser = bodyParser.urlencoded({extended: false})

app.get('/', (req, res) => {
	res.render(__dirname+"/index.html", {output:[]})
})

app.post('/', urlEncodedParser, async (req, res) => {
	const key = '' + new Date().valueOf()
	const s3 = new S3(key, req.body['names'])
	s3.handleInput()
	const sqs = new SQS(key)
	sqs.sqsFetch(res)
})

app.engine('html', require('ejs').renderFile)

app.use(express.static(path.join(__dirname, 'public')))

const hostname = '0.0.0.0';
app.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
  });
