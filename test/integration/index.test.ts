import { faker } from '@faker-js/faker';
import CheckCheck from '../../src/index';
import { paginatedBrandsResponseSchema } from '../../src/resources/brands';
import { paginatedCategoriesResponseSchema } from '../../src/resources/categories';
import {
  checkRequestResponseSchema,
  createCheckRequestBodySchema,
  paginatedCheckRequestsResponseSchema,
} from '../../src/resources/check-requests';
import {
  createCustomerBodySchema,
  customerResponseSchema,
  paginatedCustomersResponseSchema,
} from '../../src/resources/customers';
import { fileUploadResponseSchema } from '../../src/resources/files';
import { planOrderResponseSchema } from '../../src/resources/planOrders';
import { paginatedPlansResponseSchema } from '../../src/resources/plans';
import { paginatedServiceLevelsResponseSchema } from '../../src/resources/service-levels';
import { paginatedStylesResponseSchema } from '../../src/resources/styles';
import {
  createWebhookBodySchema,
  paginatedWebhooksResponseSchema,
  updateWebhookBodySchema,
  webhookResponseSchema,
} from '../../src/resources/webhooks';
const API_KEY =
  'f0da95ce508d74b29ceb9193cbb3f592f47b11840eb15f3a2a94b804e76ffe1d';
const DEBUG = false;

const debug = (msg: any) => {
  if (DEBUG) {
    console.log(msg);
  }
};

const generateMockImage = () => {
  const pngBase64 =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  const pngBytes = Buffer.from(pngBase64, 'base64');
  return new File([pngBytes], 'test.png', { type: 'image/png' });
};

describe('CheckCheck Integration Tests', () => {
  const checkcheck = new CheckCheck(API_KEY, {
    baseURL: 'http://localhost:3000',
  });

  describe('Categories', () => {
    it('can list categories', async () => {
      const result = await checkcheck.categories.list({
        page: 1,
        limit: 10,
      });
      debug(result);
      await expect(
        paginatedCategoriesResponseSchema.validate(result),
      ).resolves.toBeTruthy();
    });
  });

  describe('Brands', () => {
    it('can list brands', async () => {
      const result = await checkcheck.brands.list({
        page: 1,
        limit: 10,
        category_id: 1,
      });
      debug(result);
      await expect(
        paginatedBrandsResponseSchema.validate(result),
      ).resolves.toBeTruthy();
    });
  });

  describe('Styles', () => {
    it('can list styles', async () => {
      const result = await checkcheck.styles.list({
        page: 1,
        limit: 10,
        brand_id: 1,
      });
      debug(result);
      await expect(
        paginatedStylesResponseSchema.validate(result),
      ).resolves.toBeTruthy();
    });
  });

  describe('Customers', () => {
    it('can list customers', async () => {
      const result = await checkcheck.customers.list({
        page: 1,
        limit: 10,
      });
      debug(result);
      await expect(
        paginatedCustomersResponseSchema.validate(result),
      ).resolves.toBeTruthy();
    });
    it('can create, get, and delete a customer', async () => {
      let result;

      // Create a new customer
      const createBody = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      };
      await expect(
        createCustomerBodySchema.validate(createBody),
      ).resolves.toBeTruthy();
      result = await checkcheck.customers.create(createBody);
      debug(result);
      await expect(
        customerResponseSchema.validate(result),
      ).resolves.toBeTruthy();
      const newCustomerId = result.id;

      // Get the customer
      result = await checkcheck.customers.get(newCustomerId);
      debug(result);
      await expect(
        customerResponseSchema.validate(result),
      ).resolves.toBeTruthy();

      // Delete the customer
      result = await checkcheck.customers.delete(newCustomerId);
      expect(result).toEqual(true);
    });
  });

  describe('Service Levels', () => {
    it('can list service levels', async () => {
      const result = await checkcheck.serviceLevels.list({
        category_id: 1,
        page: 1,
        limit: 10,
      });
      debug(result);
      await expect(
        paginatedServiceLevelsResponseSchema.validate(result),
      ).resolves.toBeTruthy();
    });
  });

  describe('Plans', () => {
    it('can list plans', async () => {
      const result = await checkcheck.plans.list({
        page: 1,
        limit: 10,
      });
      debug(result);
      await expect(
        paginatedPlansResponseSchema.validate(result),
      ).resolves.toBeTruthy();
    });
  });

  describe('Plan Orders', () => {
    it('can create a plan order', async () => {
      // Create a new customer
      const { id: customerId } = await checkcheck.customers.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
      });
      // Get first plan
      const {
        data: [{ id: planId }],
      } = await checkcheck.plans.list();

      const result = await checkcheck.planOrders.create({
        plan_id: planId,
        customer_id: customerId,
      });
      debug(result);
      await expect(
        planOrderResponseSchema.validate(result),
      ).resolves.toBeTruthy();
    });
  });

  describe('Webhooks', () => {
    it('can list webhooks', async () => {
      const result = await checkcheck.webhooks.list({
        page: 1,
        limit: 10,
      });
      debug(result);
      await expect(
        paginatedWebhooksResponseSchema.validate(result),
      ).resolves.toBeTruthy();
    });
    it('can create, get, update, and delete a webhook', async () => {
      let result;

      // Create a new webhook
      const createBody = {
        endpoint_url: faker.internet.url(),
      };
      await expect(
        createWebhookBodySchema.validate(createBody),
      ).resolves.toBeTruthy();
      result = await checkcheck.webhooks.create(createBody);
      debug(result);
      await expect(
        webhookResponseSchema.validate(result),
      ).resolves.toBeTruthy();
      const newWebhookId = result.id;

      // Get the webhook
      result = await checkcheck.webhooks.get(newWebhookId);
      debug(result);
      await expect(
        webhookResponseSchema.validate(result),
      ).resolves.toBeTruthy();

      // Update the webhook
      const updateBody = {
        endpoint_url: faker.internet.url(),
        enabled: false,
      };
      await expect(
        updateWebhookBodySchema.validate(updateBody),
      ).resolves.toBeTruthy();
      result = await checkcheck.webhooks.update(newWebhookId, updateBody);
      debug(result);
      await expect(
        webhookResponseSchema.validate(result),
      ).resolves.toBeTruthy();

      // Delete the webhook
      result = await checkcheck.webhooks.delete(newWebhookId);
      expect(result).toEqual(true);
    });
  });

  describe('Uploads', () => {
    it('can upload a file', async () => {
      // Create a new customer
      const { id: customerId } = await checkcheck.customers.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
      });
      const result = await checkcheck.files.upload({
        file: generateMockImage(),
        customer_id: customerId,
      });

      // Validate with schema
      await expect(
        fileUploadResponseSchema.validate(result),
      ).resolves.toBeTruthy();
    });
  });

  describe('CheckRequests', () => {
    const customerId = 11;
    let serviceLevelId: number;
    let styleId: number;
    let imageUrl: string;
    let checkRequestId: number;

    beforeAll(async () => {
      // Create a new check request
      const testImage = generateMockImage();
      const uploadResponse = await checkcheck.files.upload({
        file: testImage,
        customer_id: customerId,
      });
      imageUrl = uploadResponse.url;
      const styleResponse = await checkcheck.styles.list({
        page: 1,
        limit: 1,
        brand_id: 1,
      });
      styleId = styleResponse.data[0]?.id || 1;
      const serviceLevelsResponse = await checkcheck.serviceLevels.list({
        page: 1,
        limit: 1,
        category_id: 1,
      });
      serviceLevelId = serviceLevelsResponse.data[0]?.id || 1;
      const checkRequestResponse = await checkcheck.checkRequests.create({
        customer_id: customerId,
        style_id: styleId,
        service_level_id: serviceLevelId,
        images: [
          {
            image_url: imageUrl,
            label: 'Test Image',
          },
          {
            image_url: imageUrl,
            label: 'Test Image',
          },
          {
            image_url: imageUrl,
            label: 'Test Image',
          },
          {
            image_url: imageUrl,
            label: 'Test Image',
          },
        ],
      });
      checkRequestId = checkRequestResponse.id;
    });

    it('can list check requests', async () => {
      const result = await checkcheck.checkRequests.list({
        page: 1,
        limit: 10,
      });

      await expect(
        paginatedCheckRequestsResponseSchema.validate(result),
      ).resolves.toBeTruthy();
    });

    it('can create a check request', async () => {
      const createData = {
        style_id: styleId,
        customer_id: customerId,
        service_level_id: serviceLevelId,
        images: [
          {
            image_url: imageUrl,
            label: 'Test Image',
          },
          {
            image_url: imageUrl,
            label: 'Test Image',
          },
          {
            image_url: imageUrl,
            label: 'Test Image',
          },
          {
            image_url: imageUrl,
            label: 'Test Image',
          },
        ],
      };

      await expect(
        createCheckRequestBodySchema.validate(createData),
      ).resolves.toBeTruthy();
      await checkcheck.checkRequests.create(createData);
    });

    it('can get a check request by id', async () => {
      const result = await checkcheck.checkRequests.get(checkRequestId);
      await expect(
        checkRequestResponseSchema.validate(result),
      ).resolves.toBeTruthy();
    });

    it('can add additional photos to a check request', async () => {});
  });
});
