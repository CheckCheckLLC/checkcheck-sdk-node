# CheckCheck Node SDK

Official Node.js SDK for the CheckCheck API.

## Installation

```sh
npm install checkcheck
# or
yarn add checkcheck
```

## Quick Start

```typescript
import { CheckCheck } from 'checkcheck';

const client = new CheckCheck('your-secret-key');

// Create a user
const user = await client.users.create({
  email: 'test@example.com',
  name: 'John Doe'
});

// Retrieve user details
const userDetails = await client.users.retrieve(user.id);
```



## Contributing

## Project Structure

```
├── src                      # SDK source code
│   ├── index.ts            # SDK entry point
│   ├── base-resource.ts    # Base resource class (handles requests)
│   ├── client.ts           # API client setup
│   ├── config.ts           # Configuration settings
│   ├── resources           # API resource modules
│   │   ├── users.ts        # Users API resource
│   │   ├── payments.ts     # Payments API resource
│   │   ├── check-requests.ts # Check Requests API resource
│   │   ├── webhooks.ts     # Webhooks API resource
│   │   ├── categories.ts   # Categories API resource
│   │   ├── ...             # More API resource files
│   ├── utils               # Utility/helper functions
│   │   ├── error-handler.ts # Handles error responses
│   │   ├── ...             # More utility files
├── tests                   # Jest test cases
├── ...                    # Other project files
```

## Resource Methods

Each resource follows RESTful conventions:

```typescript
// Standard Methods
client.users.create(data)              // POST /users
client.users.retrieve(id)              // GET /users/:id
client.users.update(id, data)          // PATCH /users/:id
client.users.delete(id)                // DELETE /users/:id
client.users.list(params)              // GET /users

// Custom Actions
client.users.activate(id)              // POST /users/:id/activate
client.users.resetPassword(id)         // POST /users/:id/reset-password
```

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
