require("dotenv").config()
const AWS = require('aws-sdk')
const {matches} = require('./functions')

class SQS {

	constructor(key) {
		this.key = key
		this.queue = process.env.RESPONSE_QUEUE
		this.sqs = new AWS.SQS({
			region: process.env.REGION,
			accessKeyId: process.env.ACCESS_KEY,
			secretAccessKey: process.env.SECRET_KEY
		})
	}

	fetchData() {
		return this.sqs.receiveMessage({
			QueueUrl: this.queue, 
			MaxNumberOfMessages: 10, 
			MessageAttributeNames: ["All"]
		}).promise()
	}

	verifyMessage(data) {
		if (data.Messages) {
			return data.Messages.find(msg => 
								this.key == msg["MessageAttributes"]["Key"]["StringValue"])
		}
		return false
	}

	async pollQueue() {
		let foundMsg = false
		while(!foundMsg) {
			setTimeout(() => {}, 2000)
			let data = await this.fetchData()
			foundMsg = this.verifyMessage(data) // false or truthy
		}
		return new Promise((resolve, reject) => {
			resolve(matches(foundMsg))
		})
	}
}

module.exports = SQS
