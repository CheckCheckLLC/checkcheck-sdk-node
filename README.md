# CheckCheck Node SDK

## 🚀 Using the SDK

### Install the SDK
```sh
npm install checkcheck-node
```

### Initialize the SDK
```typescript
import CheckCheck from 'checkcheck-node';

const checkcheck = new CheckCheck('your-api-key');
```

### Make Calls
```typescript
// Create a user
checkcheck.users.create({ email: 'test@example.com', name: 'John Doe' }).then(console.log);

// Retrieve user details
checkcheck.users.retrieve({ id: 'user-id' }).then(console.log);
```

## 📂 Folder Structure

The SDK follows a structured and scalable design to ensure maintainability and clarity.

```
├── src                      # SDK source code
│   ├── index.ts             # SDK entry point
│   ├── BaseResource.ts      # Base resource class (handles requests)
│   ├── client.ts            # API client setup
│   ├── config.ts            # Configuration settings
│   ├── resources            # API resource modules
│   │   ├── Users.ts         # Users API resource
│   │   ├── Payments.ts      # Payments API resource
│   │   ├── CheckRequests.ts # Check Requests API resource
│   │   ├── Webhooks.ts      # Webhooks API resource
│   │   ├── Categories.ts    # Categories API resource
│   │   ├── Brands.ts        # Brands API resource
│   │   ├── Styles.ts        # Styles API resource
│   │   ├── StylePhotos.ts   # Style Photos API resource
│   │   ├── CheckRequestImages.ts # Check Request Images API resource
│   │   ├── ...              # More API resource files
│   ├── utils                # Utility/helper functions
│   │   ├── error-handler.ts  # Handles error responses
│   │   ├── request-helper.ts # Handles API request formatting
│   │   ├── ...               # More utility files
├── tests                    # Jest test cases
├── package.json             # NPM package config
├── tsconfig.json            # TypeScript config
├── README.md                # SDK documentation
├── .gitignore               # Git ignore rules
├── .npmignore               # NPM ignore rules
├── ...                      # Other project files
```

## 📌 Naming Conventions

This SDK follows **TypeScript best practices** for file naming:

| **Category**            | **Naming Convention**                  | **Example**                             |
|-------------------------|----------------------------------------|-----------------------------------------|
| **Resource Modules**    | **PascalCase** (UpperCamelCase)        | `Users.ts`, `Payments.ts`               |
| **Utility Files**       | **kebab-case** (lowercase-with-dashes) | `error-handler.ts`, `request-helper.ts` |
| **Config Files**        | **camelCase** or **kebab-case**        | `config.ts`, `api-config.ts`            |

### ✅ Why PascalCase for Resources?
- Each **resource file** exports a **class**, so it follows **TypeScript’s class naming convention**.

### ✅ Why kebab-case for Utility Files?
- Utility files contain **functions, not classes**, so they follow **Node.js convention**.

## 📌 Resource Method Naming
Each **resource module** should implement these standard RESTful methods:

```typescript
checkcheck.[resource].create({...})       // POST /[resource]
checkcheck.[resource].retrieve({ id })    // GET /[resource]/{id}
checkcheck.[resource].list()              // GET /[resource]
checkcheck.[resource].update({ id, ... }) // PATCH /[resource]/{id}
checkcheck.[resource].delete({ id })      // DELETE /[resource]/{id}
```

For **custom actions**, follow **clear action-based naming**:

```typescript
checkcheck.[resource].activate({ id })    // POST /[resource]/{id}/activate
checkcheck.[resource].suspend({ id })     // POST /[resource]/{id}/suspend
checkcheck.[resource].resetPassword({ id }) // POST /[resource]/{id}/reset-password
```

✅ *All API routes should follow kebab-case naming conventions.*
