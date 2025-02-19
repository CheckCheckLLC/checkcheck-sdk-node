import CheckCheck from '../../src';

const checkcheck = new CheckCheck('api-key');

describe('Categories', () => {
  test('list', async () => {
    const data = await checkcheck.categories.list();
    console.log(data);
    expect(data).toBeDefined();
  });
});
