/* eslint-disable no-console */
/* eslint-disable import/newline-after-import */
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });
const ElasticsearchCSV = require('elasticsearch-csv');

const restaurantsCSV = new ElasticsearchCSV({
  es: { index: 'my_index', type: 'my_type', host: '192.168.0.1' },
  csv: { filePath: '../PostgreSQL/restaurants.csv', headers: true },
});

restaurantsCSV.import()
  .then((response) => {
    // Elasticsearch response for the bulk insert
    console.log(response);
  }, (err) => {
    // throw error
    throw err;
  });
