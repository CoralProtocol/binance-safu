// Using redis to manage API keys, API requests, and rate limiting
const pg = require('pg');

const ethPsqlClient = new pg.Client({
  connectionString: `postgres://${process.env.CLOUD_SQL_ETH_DATA_USER}:${process.env.CLOUD_SQL_ETH_DATA_PASS}@127.0.0.1:5433/postgres`,
});

const btcPsqlClient = new pg.Client({
  connectionString: `postgres://${process.env.CLOUD_SQL_BTC_DATA_USER}:${process.env.CLOUD_SQL_BTC_DATA_PASS}@127.0.0.1:5434/postgres`,
});

module.exports.connect = function() {
  ethPsqlClient.connect();
  btcPsqlClient.connect();
}
module.exports.ethPsqlClient = ethPsqlClient;
module.exports.btcPsqlClient = btcPsqlClient;
