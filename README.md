# Binance SAFU Hackathon App

## API

### Users

To `get` Denali's user object

`curl -XGET "localhost:8080/users/me" -H "x-api-key: 43c51a9c-4e50-471a-be52-22c836eaa867"`


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

`curl -XPOST "localhost:3000/fraud-instances/0x3d9dfa1fbcb5b258d224fe6d147c2df9890a3c99/review" -H "x-api-key: 43c51a9c-4e50-471a-be52-22c836eaa867" -H "content-type: application/json" -d '{"confirm":true}'`
