const { router: restRouter } = require('automata-rest');

const { NODE_ENV } = require('../../config');

const tableName = 'test-notes';

const columns = [
  { name: 'imageUrl', type: String },
  { name: 'isPublic', required: true, type: Boolean },
  { name: 'text', required: true, type: String },
];

const indexes = [{ columns: ['isPublic'], name: `idx-${tableName}-isPublic` }];

const table = { columns, indexes, name: tableName };

const router = ({ cache, db }) => restRouter(null, {
  cache,
  db,
  resultKey: 'note',
  resultsKey: 'notes',
  table,
  userRequired: true,
});

module.exports = { router };

if (NODE_ENV === 'test') {
  module.exports.tableName = tableName;
}
