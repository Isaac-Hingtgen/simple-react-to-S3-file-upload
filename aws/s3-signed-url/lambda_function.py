import boto3
from botocore.config import Config
import os
import json

def lambda_handler(event, context):
    conf = Config( 
        signature_version = 's3v4'
    )
    s3_client = boto3.client('s3', 
        region_name=os.environ['AWS_REGION'], 
        config = conf, 
        endpoint_url='https://s3.us-east-2.amazonaws.com',
        aws_access_key_id=os.environ['ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['SECRET_ACCESS_KEY'],
    )

    params = {
      'Bucket': os.environ['Bucket'],
      'Key': event['queryStringParameters']['name'],
      "ContentType": "text/plain",
    }

    presigned_url = s3_client.generate_presigned_url('put_object', 
        Params=params,
        ExpiresIn=3600,
        HttpMethod='PUT'
    )
    
    response = {
        'statusCode': 200, 
        'body': json.dumps({
            'url': presigned_url,
            'key': event['queryStringParameters']['name']
        })
    }
    
    print("---success---")
    print(response)
    return response