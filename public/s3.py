from boto3 import client as boto3_client
from os import getenv, listdir 
from dotenv import load_dotenv 

class S3:

	def __init__(self):
		load_dotenv()
		self.input_bucket = getenv("INPUT_BUCKET")
		self.output_bucket = getenv("AWS_OUTPUT_BUCKET")
		self.access_key = getenv("ACCESS_KEY")
		self.secret_key = getenv("SECRET_KEY")
		self.client = boto3_client(
			"s3", 
			region_name="us-east-1",
			aws_access_key_id=self.access_key,
			aws_secret_access_key=self.secret_key
		)

	def get_object_body(self, key):
		response = self.client.get_object(
			Bucket=self.input_bucket,
			Key=key
		)

		body = response['Body'].read().decode('utf-8')	
		return body

	def save_to_output(self, fileObj, name):
		self.client.upload_fileobj(fileObj, self.output_bucket, name)