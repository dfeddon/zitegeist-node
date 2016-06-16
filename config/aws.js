/*jshint esversion: 6 */

// module.exports =
// {
  var AWS = require('aws-sdk');
  /**
   * Don't hard-code your credentials!
   * Export the following environment variables instead:
  
   export AWS_ACCESS_KEY_ID='AKID'
   export AWS_SECRET_ACCESS_KEY='SECRET'
   //*/
  //  AWS.config.update({AWS_ACCESS_KEY_ID : 'AKIAIKXHOJI5UQDGVGKA',
  //  AWS_SECRET_ACCESS_KEY : '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'})

  // Initialize the Amazon Cognito credentials provider
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:12345678-abcd-1234-aaaa-123456789',
  });

  // set region for future requests
  AWS.config.region = 'us-east-1';

  // ===
  var s3 = new AWS.S3({params: {Bucket: 'myBucket', Key: 'myKey'}});
  s3.createBucket(function(err) {
    if (err) { console.log("Error:", err); }
    else {
      s3.upload({Body: 'Hello!'}, function() {
        console.log("Successfully uploaded data to myBucket/myKey");
      });
    }
  });
  // ===

// };
