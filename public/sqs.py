from boto3 import client as boto3_client
from os import getenv, listdir 
from dotenv import load_dotenv
from json import dumps

class SQS:

	def __init__(self):
		load_dotenv()
		self.response_queue = getenv("RESPONSE_QUEUE")
		self.access_key = getenv("ACCESS_KEY")
		self.secret_key = getenv("SECRET_KEY")
		self.client = boto3_client(
			"sqs", 
			region_name="us-east-1",
			aws_access_key_id=self.access_key,
			aws_secret_access_key=self.secret_key
		)

	def send_message(self, msg):
		response = self.client.send_message(
			QueueUrl=self.response_queue,
			MessageAttributes={
				'Key': {
					'DataType': 'String',
					'StringValue': msg['key']
				}
			},
			MessageBody=msg['body']
		)
		print(f'Sent message\n{dumps(response, indent=4)}')