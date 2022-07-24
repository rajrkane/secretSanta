require("dotenv").config()
const AWS = require('aws-sdk')
const fs = require("fs")

class S3 {
	constructor(key, input_names) {
		this.key = key
		this.names = input_names
		this.s3 = new AWS.S3({
			params: {
				Bucket: process.env.INPUT_BUCKET
			},
			region: process.env.REGION,
			accessKeyId: process.env.ACCESS_KEY,
			secretAccessKey: process.env.SECRET_KEY
		})
	}

	async handleInput() {
		console.log('Sending.')
		return await this.s3Upload()
	}

	s3Upload() {
		return this.s3.putObject({Key: this.key, Body: this.names}).promise()
	}
}

module.exports = S3