# Testing

This project uses [Vitest](https://vitest.dev) for unit and integration testing.

## Setup

After cloning the repository, install dependencies:

```bash
npm install
```

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Structure

- `app/utils/__tests__/` - Tests for utility functions
- `app/routes/__tests__/` - Tests for route loaders
- `tests/fixtures/` - Test fixtures and sample data
- `tests/setup.ts` - Test setup and teardown

## Image Service Tests

The image transformation service tests require:
- Source images in `assets/images-raw/` for the categories being tested
- Write permissions for `build/cache/images/` directory

## Writing Tests

Tests follow Vitest conventions:
- Use `describe()` blocks to group related tests
- Use `it()` or `test()` for individual test cases
- Use `expect()` for assertions
- Use `beforeEach()` and `afterEach()` for setup/teardown
- Mock external dependencies with `vi.mock()`

Example:

```typescript
import { describe, it, expect } from 'vitest';

describe('MyFunction', () => {
  it('should do something', () => {
    const result = myFunction();
    expect(result).toBe(expected);
  });
});
```

