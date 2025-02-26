import { categorySchema } from '../../src/resources/categories';
import { validateArray } from '../../src/utils';
import { getCheckCheckInstance } from '../utils';

const checkcheck = getCheckCheckInstance();

describe('Categories', () => {
  test('list', async () => {
    const data = await checkcheck.categories.list();
    expect(await validateArray(data, categorySchema)).toBeTruthy();
  });
});
