require("dotenv").config()
const AWS = require('aws-sdk')
const fs = require("fs")

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
		this.sqs.receiveMessage(
			{
				QueueUrl: this.queue, 
				MaxNumberOfMessages: 10, 
				MessageAttributeNames: ["All"]})
				.promise()
				.then(data => {
					if (data.Messages) {
						// Find the corresponding message
						const message = data.Messages.find(msg => this.key == msg["MessageAttributes"]["Key"]["StringValue"])

						// Found message
						if (message) {
							console.log('Found.')
							const body =  message["Body"].split('.').slice(0,-1)
							res.render("../index.html", {output: body})
						}
			}

			// Message not found, so poll again
			setTimeout(() => {}, 3000)
			this.sqsFetch(res)
		})		
	}

	sqsRemove(msg) {
		this.sqs.deleteMessage({QueueUrl: this.queue, ReceiptHandle: msg.ReceiptHandle}, (err, data) => {
			if (err) console.log(err)
			else {
				console.log(`Removed ${this.key} from queue.`)
			}
		})
	}
}

module.exports = SQS