from boto3 import client as boto3_client
from os import getenv, listdir 
from dotenv import load_dotenv 

class S3:

	def __init__(self):
		load_dotenv()
		self.input_bucket = getenv("AWS_INPUT_BUCKET")
		self.access_key = getenv("AWS_ACCESS_KEY")
		self.secret_key = getenv("AWS_SECRET_KEY")
		self.client = boto3_client(
			"s3", 
			region_name="us-east-1",
			aws_access_key_id=self.access_key,
			aws_secret_access_key=self.secret_key
		)

	# could just use object key, no body
	def get_object_body(self, key):
		response = self.client.get_object(
			Bucket=self.input_bucket,
			Key=key
		)

		body = response['Body'].read().decode('utf-8')	
		return body