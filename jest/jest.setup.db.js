// eslint-disable-next-line import/no-extraneous-dependencies
const { initDB, connectDB, closeDB } = require('automata-db');

beforeAll(async () => {
  await initDB(':memory:');
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});
