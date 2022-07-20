require("dotenv").config()
const AWS = require('aws-sdk')
const fs = require("fs")

const s3 = new AWS.S3({
	params: {
		Bucket: process.env.AWS_INPUT_BUCKET
	},
	region: process.env.AWS_BUCKET_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY
})

const s3upload = (name_str) => {
	// randomize key
	if (name_str) {
		s3.putObject({Key: 'names', Body: name_str}, (err, data) => {
			if (err) {
				throw err
			}
			console.log('File uploaded.')
		})
	}
}

exports.s3upload = s3upload