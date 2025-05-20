# CheckCheck Node SDK

Official Node.js SDK for the CheckCheck API.

## Installation

Create a .npmrc file in your project root (same level as package.json) and add the following line:

```
@checkcheckllc:registry=https://npm.pkg.github.com
//registry.npmjs.org/:_authToken=${GH_TOKEN}
```

For more information on how to generate a GitHub token, please refer to [GitHub's documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token).

Then, install the SDK using npm or yarn:

```sh
npm install @checkcheckllc/checkcheck
# or
yarn add @checkcheckllc/checkcheck
```

## Quick Start

```typescript
import CheckCheck from "@checkcheckllc/checkcheck";

const checkcheck = new CheckCheck('YOUR_API_TOKEN', {
   env: 'sandbox', // or 'live'
});

const main = async () => {
   // List categories
   const categories = await checkcheck.categories.list({
      page: 1,
      limit: 10,
   });
   console.log(categories);
}

main()
```

## Contributing

## Project Structure

```
├── src                      # SDK source code
│   ├── index.ts            # SDK entry point
│   ├── client.ts           # Http client setup
│   ├── config.ts           # Configuration settings
│   ├── errors.ts           # Custom error classes
│   ├── resources           # API resource modules
│   │   ├── categories.ts   # Categories API resource
│   │   ├── ...             # More API resource files
├── tests                   # Jest test cases
├── ...                    # Other project files
```

## Available Resources

The SDK provides access to the following API resources and methods:

### Categories

- `list(params)`: Get a paginated list of categories
- `get(id)`: Retrieve a specific category by ID

### Brands

- `list(params)`: Get a paginated list of brands
- `get(id)`: Retrieve a specific brand by ID

### Styles

- `list(params)`: Get a paginated list of styles
- `get(id)`: Retrieve a specific style by ID

### Customers

- `list(params)`: Get a paginated list of customers
- `get(id)`: Retrieve a specific customer by ID
- `create(data)`: Create a new customer
- `delete(id)`: Delete a specific customer

### Files

- `uploadImage(data)`: Upload an image with customer association

### CheckRequests

- `list(params)`: Get a paginated list of check requests
- `get(id)`: Retrieve a specific check request by ID
- `create(data)`: Create a new check request with image
- `addAdditionalPhotos(id, data)`: Add additional photos to an existing check request

### Plans

- `list(params)`: Get a paginated list of subscription plans

### PlanOrders

- `create(data)`: Create a new plan order/subscription

### Webhooks

- `list(params)`: Get a paginated list of webhooks
- `get(id)`: Retrieve a specific webhook by ID
- `create(data)`: Create a new webhook
- `update(id, data)`: Update an existing webhook
- `delete(id)`: Delete a specific webhook

### ServiceLevels

- `list(params)`: Get a paginated list of service levels

### Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/checkcheck/checkcheck-node.git
   cd checkcheck-node
   ```

2. Install dependencies:

   ```sh
   yarn install
   ```

3. Run tests:

   ```sh
   yarn test
   ```

### Development Guidelines

1. **Code Style**

   - Follow the established naming conventions
   - Use TypeScript for all new files

2. **Testing**

   - Write unit tests for new features
   - Ensure all tests pass before submitting PRs
   - Use Jest for testing

3. **Pull Requests**

   - Create a feature branch from `dev`
   - Follow conventional commits
   - Update documentation as needed
