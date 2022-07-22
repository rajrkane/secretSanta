require("dotenv").config()
const AWS = require('aws-sdk')
const fs = require("fs")

class SQS {
	constructor(key, res_msg) {
		this.key = key
		this.queue = process.env.RESPONSE_QUEUE
		this.sqs = new AWS.SQS({
			region: process.env.AWS_REGION,
			accessKeyId: process.env.AWS_ACCESS_KEY,
			secretAccessKey: process.env.AWS_SECRET_KEY
		})
	}

	sqsFetch() {
		console.log(`Fetching ${this.key}.`)
		this.sqs.receiveMessage({QueueUrl: this.queue, MaxNumberOfMessages: 10}, (err, data) => {
			if (err) console.log(err)
			else if (data.Messages) {
				data.Messages.forEach(msg => {
					let [key, body] = msg.Body.split(',')
					if (key == this.key) {
						// Found the desired message
						console.log(`Got response ${body} - ${key}.`)
						this.sqsRemove(msg)
						return body
					}
				})
			}

			// If message not found, poll again in 1 second
			setTimeout(() => {}, 1000)
			this.sqsFetch()
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