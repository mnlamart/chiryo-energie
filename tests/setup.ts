import { beforeEach, afterEach, vi } from 'vitest';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

// Setup test directories
const TEST_CACHE_DIR = join(process.cwd(), 'build', 'test-cache');
const TEST_ASSETS_DIR = join(process.cwd(), 'tests', 'fixtures');

beforeEach(() => {
  // Clean test cache directory before each test
  if (existsSync(TEST_CACHE_DIR)) {
    rmSync(TEST_CACHE_DIR, { recursive: true, force: true });
  }
  
  // Ensure test fixtures directory exists
  if (!existsSync(TEST_ASSETS_DIR)) {
    mkdirSync(TEST_ASSETS_DIR, { recursive: true });
  }
});

afterEach(() => {
  // Clean up after tests
  vi.clearAllMocks();
});

export { TEST_CACHE_DIR, TEST_ASSETS_DIR };

