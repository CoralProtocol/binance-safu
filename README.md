# Binance SAFU Hackathon

* [Conference](https://www.binancefair.com/binance-conference/)
* [Hackathon](https://www.binancefair.com/safu-hackathon/)

* Theme: Query Platform for Address Security: *“Is the transaction address you are sending your crypto to SAFU?”*

What is [SAFU](https://www.urbandictionary.com/define.php?term=Safu)?
*A cryptocurrency term for safe popularized by the Bizonnaci YouTube channel after the CEO of Binance tweeted “Funds are safe.”*

## The Coral Protocol

Coral Protocol is an anti-fraud protocol that protects businesses who are transacting or taking custody of cryptocurrency. Coral mitigates exposure to money laundering, theft, and other common fraud use cases. Coral tracks the flow of fraudulent funds and uses predictive analytics to assign actionable trust scores to all wallet addresses. Rather than relying only on identity, behavioral biometrics is utilized to reduce fraud.

The goal of Coral as an organization is to build a **Green Zone** for blockchain payments. The green zone is an ecosystem where the incidence of fraud is reduced to that of the traditional payments industry or better - where it's safe even for the most vulnerable members of the population to participate. The current state of blockchain payments is akin to the "Catch me if you can" era of the current banking system, and is prohibitive to mass adoption.

*Distributed Finance will not gain mainstream adoption without first the formation of the Green Zone.*

## A Method for Verified Partner Fraud Submission

To build a comprehensive and reliable set of trust scores, training data is required. To date, there is no effective, generalized and scalable method for the blockchain community to collaboratively create this data set.

### Principles
* Learn from 1990s Anti-spam movement - ingesting fraud data from third parties is prone to manipulation.
* Fine tuned governance is required to prevent gaming of rating and submission systems.
* Contributors should be verified organizations with proprietary, siloed data resources to offer.

### Questions
* Should individuals be able contest attestations of fraud?
* Should individuals be able to attest to theft or fraud against them?

### Reputation System
* All participants in the system have a reputation that is maintained based on performance.
* All actions taken by all participants are signed with keys.
* Keys can be revoked by authorities.
* All actions signed by revoked keys are invalidated and are subject to review.

### Validator Accreditation
* All Validators are approved by Coral as central authority.
* Validators can review and approve entities to contribute fraud data.
* Validators can review and reject erroneous fraud submissions.

### Fraud Submission Engine
* All Contributors must be approved by validators.
* All fraud submissions must be in a standardized format.
* All fraud must be categorized.
* All fraud submissions must be rated by impact.

## Technical Specifications

### API

### Consumers

#### Users

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

#### Trust Scores

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

#### Trust Score Alerts

To set up an alert on an address to be notified whenever there's an instance of fraud tied to that address

`curl -XPOST "localhost:3000/trust-score-alerts" -H "x-api-key: 43c51a9c-4e50-471a-be52-22c836eaa867" -H "content-type: application/json" -d '{"address":"0x3d9dfa1fbcb5b258d224fe6d147c2df9890a3c99","blockchain":"eth","name":"Binance SAFU (Trust Wallet)","url":"http://fee5ea86.ngrok.io/slack"}'`

### Contributors

#### Instances of Fraud

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
* Clean PSQL (`DELETE FROM fraud_instances WHERE id='5a8787b326206a00147975810x3d9dfa1fbcb5b258d224fe6d147c2df9890a3c99';` and `delete from webhooks where api_key='231840c0-606f-4370-be50-6f5740abfd25';`)
* Clean up Mongo (remove that fraud instance)
