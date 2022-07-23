# secretSanta

A Secret Santa generator using Answer Set Programming in AWS Lambda. [Hosted](https://secretsantagenerator.vercel.app/) on Vercel.

## Walkthrough

Find a walkthrough of the code and examples on [my site](https://rajrkane.com/blog/SecretSantaWithAnswerSetProgramming).


## Build

1. Clone this repo 
```
$ git clone git@github.com:rajrkane/secretSanta.git
```
2. Create a `.env` file at the root with this format
```
AWS_INPUT_BUCKET=<bucket_name>
AWS_RESPONSE_QUEUE="<queue_url>"
AWS_REGION="<region>"
AWS_ACCESS_KEY=<access_key>
AWS_SECRET_KEY=<secret_key>
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