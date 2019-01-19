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
