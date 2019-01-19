# Binance SAFU Hackathon App

## Project Brief: A Method for Verified Partner Fraud Submission

This is built for large trusted organizations that need to be able to submit and share information, not for individual submissions. This is B2B only - only for companies who want to submit fraud and contribute to Coral’s efforts to score wallets and create the green zone.

### Principles
* Learn from 1990s Anti-spam movement.
  * Trusted sources provided all the definitions
  * Fine tuned governance required to prevent gaming of rating and submission systems.
* Contributors should be verified organizations with proprietary, siloed data resources to offer.
  *

### Questions
1. Should individuals be able to PoA their address, and:
   * Contest attestations of fraud?
   * Attest to theft or fraud against them?


### Validator Accreditation
1. Generate a key-pair (validator account)
  1. All Validators are approved by Coral as central authority
  2. All validations must be signed
2. Approves Fraud Submitters
3. Reviews fraud that is submitted

### Fraud Submission Engine
1. Generate a key-pair (submitter account)
  1. Submitters are approved by Validators
  2. All fraud submissions would be signed by this key
2. Submit in a standardized format
  1. Category
      1. Phishing
      2. Money Laundering
  2. Severity
    1. 1-10 rating system
3. Fire alerts

### Reputation System
* All participants in the system have a reputation that is maintained based on performance
* Keys can be revoked


# API

## Consumers

### Users

To `get` Denali's user object

`curl -XGET "localhost:3000/users/me" -H "x-api-key: 43c51a9c-4e50-471a-be52-22c836eaa867"`


```
{ _id: 5c4292f3fb6fc0600be3ac5f,
  email: 'denali@heycoral.com',
  apiKey: '43c51a9c-4e50-471a-be52-22c836eaa867',
  firstName: 'Denali',
  lastName: 'Marsh',
  walletAddress: '0x62e6689b72f40140dd994ad2b971bdc8058f0b4e',
  walletBalance: 100,
  allowedToSubmitFraud: true,
  allowedToReviewFraud: true
}
```

### Trust Scores

To `get` the trust score of an address

`curl -XGET "localhost:3000/trust-scores/eth/0x3d9dfa1fbcb5b258d224fe6d147c2df9890a3c99" -H "x-api-key: 43c51a9c-4e50-471a-be52-22c836eaa867"`

```
{
  "success": true,
  "data": {
    "address": "0x3d9dfa1fbcb5b258d224fe6d147c2df9890a3c99",
    "score": 40.2,
    "properties": [
      {
        "code": 1003,
        "description": "No known tumbler interaction"
      },
      {
        "code": 2000,
        "description": "Low clout"
      }
    ],
    "severity": 0,
    "reason": "phishing",
    "metadata": {
      "url": "https://twitter.com/kurtwuckertjr/status/1085393730306220032?s=21"
    },
    "confirmed": false
  }
}
```

Note that this will debit your wallet by 1 REEF and perform payouts to contributors in the following fashion;

* If Coral discovered the instance of fraud, we are credited 1 REEF
* If a trusted third partner discovered this instance of fraud and it's unconfirmed, they are credited 0.8 REEF and Coral is credited 0.2 REEF
* If a trusted third partner discovered this instance of fraud and it's confirmed, the contributor is credited 0.7 REEF, the reviewer is credited 0.1 REEF and Coral is credited 0.2 REEF

### Trust Score Alerts

To set up an alert on an address to be notified whenever there's an instance of fraud tied to that address

`curl -XPOST "localhost:3000/trust-score-alerts" -H "x-api-key: 43c51a9c-4e50-471a-be52-22c836eaa867" -H "content-type: application/json" -d '{"address":"0x3d9dfa1fbcb5b258d224fe6d147c2df9890a3c99","blockchain":"eth","name":"Binance SAFU (Trust Wallet)","url":"http://fee5ea86.ngrok.io/slack"}'`

## Contributors

### Instances of Fraud

**Submit Fraud Instances**

To `submit` and instance of fraud, your user has to be authorized.

`curl -XPOST "localhost:3000/fraud-instances" -H "x-api-key: 43c51a9c-4e50-471a-be52-22c836eaa867" -H "content-type: application/json" -d '{"address":"0x3d9dfa1fbcb5b258d224fe6d147c2df9890a3c99","blockchain":"eth","reason":"phishing","severity":10,"metadata":{"url":"https://twitter.com/kurtwuckertjr/status/1085393730306220032?s=21"}}'`

**Review Fraud Instances**

To `review` instances of fraud

`curl -XGET "localhost:3000/fraud-instances/" -H "x-api-key: 43c51a9c-4e50-471a-be52-22c836eaa867"`

```
[
  {
    "reviewers": [],
    "_id": "5c42b32708a28ec5aa8f97ca",
    "address": "0x3d9dfa1fbcb5b258d224fe6d147c2df9890a3c99",
    "blockchain": "eth",
    "reason": "phishing",
    "severity": 10,
    "metadata": {
      "url": "https://twitter.com/kurtwuckertjr/status/1085393730306220032?s=21"
    },
    "constributor": "43c51a9c-4e50-471a-be52-22c836eaa867",
    "reviewed": false,
    "createdAt": "2019-01-19T05:18:31.401Z",
    "updatedAt": "2019-01-19T05:18:31.401Z",
    "__v": 0
  }
]
```

**Post a review of a Fraud Instance**

`curl -XPOST "localhost:3000/fraud-instances/eth/0x3d9dfa1fbcb5b258d224fe6d147c2df9890a3c99/review" -H "x-api-key: 43c51a9c-4e50-471a-be52-22c836eaa867" -H "content-type: application/json" -d '{"confirm":true}'`


### Testing:
* `npm start`
* `ngrok http 3000`
* Create a trust score alert on an address
* Request the score of that address
* Create an instance of fraud on that address
* See alert!
* Clean PSQL (`delete from fraud_instances where category='SAFU_test';` and `delete from webhooks where api_key='231840c0-606f-4370-be50-6f5740abfd25';`)
* Clean up Mongo (remove that fraud instance)
