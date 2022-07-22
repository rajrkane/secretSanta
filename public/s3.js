require("dotenv").config()
const AWS = require('aws-sdk')
const fs = require("fs")

class S3 {
	constructor(key, input_names) {
		this.key = key
		this.names = input_names
		this.s3 = new AWS.S3({
			params: {
				Bucket: process.env.AWS_INPUT_BUCKET
			},
			region: process.env.AWS_REGION,
			accessKeyId: process.env.AWS_ACCESS_KEY,
			secretAccessKey: process.env.AWS_SECRET_KEY
		})
	}

	async handleInput() {
		let upload_res = await this.s3Upload()
		// let fetch_res = await this.s3Fetch().Body.toString('utf-8').split('.').slice(0, -1)
	}

	s3Upload() {
		console.log(`Uploading ${this.key}, ${this.names}.`)
		return this.s3.putObject({Key: this.key, Body: this.names}).promise()
	}
}

module.exports = S3