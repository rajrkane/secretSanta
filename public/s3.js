require("dotenv").config()
const AWS = require('aws-sdk')
const fs = require("fs")

const s3_input = new AWS.S3({
	params: {
		Bucket: process.env.AWS_INPUT_BUCKET
	},
	region: process.env.AWS_BUCKET_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY
})

const s3_output = new AWS.S3({
	params: {
		Bucket: process.env.AWS_OUTPUT_BUCKET
	},
	region: process.env.AWS_BUCKET_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY
})

const s3upload = (name_str) => {
	// randomize key
	if (name_str) {
		s3_input.putObject({Key: 'names', Body: name_str}, (err, data) => {
			if (err) {
				throw err
			}
			console.log('File uploaded.')
		})
	}
}

async function s3fetch(key) {
	try {
		const data = await s3_output.getObject({Key: key}).promise()
		return data.Body.toString('utf-8')
	} catch (err) {
		throw new Error(`Could not retrieve ${key} from output bucket: ${err}`)
	}
	// const matches = s3_output.getObject({Key: 'names'})
	// 	.then((data) => data.Body.toString('utf-8'))
	// 	.catch((err) => {console.log(err)})

	// console.log(matches)
}

exports.s3upload = s3upload
exports.s3fetch = s3fetch