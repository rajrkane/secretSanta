# secretSanta

A Secret Santa generator using Answer Set Programming in AWS Lambda.

## Live

The generator is live on [Heroku](https://secretsanta-asp.herokuapp.com/).

## Workflow

1. User posts an input (e.g. `alice, bob, carol, dave, eve`).
2. Webserver puts the request into an input **S3** bucket.
3. Bucket action triggers a **Lambda** handler.
4. Handler runs a **Clingo** program that uses **answer set programming** to find an answer set for the input.
5. Handler sends the answer set to an **SQS** response queue.
6. Webserver polls the queue to find the result.
7. Result is displayed on the page.

An extended walkthrough is posted on [my site](https://rajrkane.com/blog/SecretSantaWithAnswerSetProgramming/).


## Build

1. Clone this repo 
```
$ git clone git@github.com:rajrkane/secretSanta.git
```
2. Create a `.env` file at the root with the AWS variables in this format
```
INPUT_BUCKET=<bucket_name>
RESPONSE_QUEUE="<queue_url>"
REGION="<region>"
ACCESS_KEY=<access_key>
SECRET_KEY=<secret_key>
```
3. Push the Docker image
```
$ aws ecr get-login-password --region <region> | docker login --username <username> --password-stdin <account_id>.dkr.ecr.<region>.amazonaws.com
$ docker build -t secretsanta ./
$ docker tag secretsanta:latest <account_id>.dkr.ecr.<region>.amazonaws.com/secretsanta:latest
$ docker push <account_id>.dkr.ecr.<region>.amazonaws.com/secretsanta:latest
```
5. Create a Lambda function in AWS using the deployed image, and set up an S3 trigger corresponding to the input bucket
6. Run the webserver
```
$ npm start
```
