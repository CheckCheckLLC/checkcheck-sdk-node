import { CreateCustomer, customerSchema } from '../../src/resources';
import { validate, validateArray } from '../../src/utils';
import { getCheckCheckInstance } from '../utils';

const checkcheck = getCheckCheckInstance();

describe('Customers', () => {
  // Store a created customer ID for later tests
  let testCustomerId: number;

  // Test data for creating a customer
  const newCustomer: CreateCustomer = {
    name: 'Test Customer',
    email: 'test@example.com',
    seller_category: ['sneakers', 'handbags'],
  };

  test('create', async () => {
    const customer = await checkcheck.customers.create(newCustomer);

    // Store ID for later tests
    testCustomerId = customer.id;

    // Validate response structure
    expect(await validate(customer, customerSchema)).toBeTruthy();

    // Verify created data matches input
    expect(customer.name).toBe(newCustomer.name);
    expect(customer.email).toBe(newCustomer.email);
    expect(customer.seller_category).toEqual(newCustomer.seller_category);
  });

  test('list', async () => {
    const customers = await checkcheck.customers.list();

    // Validate array structure
    expect(await validateArray(customers, customerSchema)).toBeTruthy();

    // Should be at least one customer (the one we created)
    expect(customers.length).toBeGreaterThan(0);
  });

  test('get', async () => {
    // Skip if we don't have a test ID
    if (!testCustomerId) {
      console.warn('Skipping get test because no customer was created');
      return;
    }

    const customer = await checkcheck.customers.get(testCustomerId);

    // Validate response structure
    expect(await validate(customer, customerSchema)).toBeTruthy();

    // Verify it's the correct customer
    expect(customer.id).toBe(testCustomerId);
    expect(customer.name).toBe(newCustomer.name);
  });

  test('delete', async () => {
    // Skip if we don't have a test ID
    if (!testCustomerId) {
      console.warn('Skipping delete test because no customer was created');
      return;
    }

    // Delete should complete without error
    expect(await checkcheck.customers.delete(testCustomerId)).toBe(true);

    // Verify deletion by trying to get the customer (should fail)
    await expect(
      await checkcheck.customers.get(testCustomerId),
    ).rejects.toThrow();
  });
});
