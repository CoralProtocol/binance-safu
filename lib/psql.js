// Using redis to manage API keys, API requests, and rate limiting
const pg = require('pg');

const psqlClient = new pg.Client({
  connectionString: `postgres://${process.env.CLOUD_SQL_ETH_DATA_USER}:${process.env.CLOUD_SQL_ETH_DATA_PASS}@127.0.0.1:5433/postgres`,
});

module.exports.connect = function() {
  psqlClient.connect();
}
module.exports.psqlClient = psqlClient;
