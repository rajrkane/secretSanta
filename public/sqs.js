require("dotenv").config()
const AWS = require('aws-sdk')
const {setFileContents} = require('./functions')

class SQS {

	constructor(key) {
		this.key = key
		this.queue = process.env.AWS_RESPONSE_QUEUE
		this.sqs = new AWS.SQS({
			region: process.env.AWS_REGION,
			accessKeyId: process.env.AWS_ACCESS_KEY,
			secretAccessKey: process.env.AWS_SECRET_KEY
		})
	}

	sqsFetch(res) {
		this.sqs.receiveMessage({
			QueueUrl: this.queue, 
			MaxNumberOfMessages: 10, 
			MessageAttributeNames: ["All"]})
			.promise()
			.then(data => {
				if (data.Messages) {
					// Find corresponding message
					const message = data.Messages.find(msg => this.key == msg["MessageAttributes"]["Key"]["StringValue"])

					// Found message
					if (message) {
						console.log('Found.')
						const matches =  message["Body"].split('.').slice(0,-1)
						const text = setFileContents(matches)
						return res.render("../index.html", {
							output: matches,
							content: text
						})
					}
				}

			// Message not found, so poll again
			setTimeout(() => {}, 1000)
			this.sqsFetch(res)
			})		
	}
}

module.exports = SQS