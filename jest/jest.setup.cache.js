// eslint-disable-next-line import/no-extraneous-dependencies
const { initCache, connectCache, closeCache } = require('automata-cache');

beforeAll(async () => {
  await initCache();
  await connectCache();
});

afterAll(async () => {
  await closeCache();
});
