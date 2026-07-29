import assert from 'node:assert/strict';
import test from 'node:test';

import { getClerkBootstrap } from './clerkConfig.ts';

test('returns a disabled auth state when the publishable key env var is missing', () => {
  const config = getClerkBootstrap({
    hostname: 'localhost',
    publishableKeyEnv: '',
    proxyUrlEnv: '',
    basePath: '',
  });

  assert.equal(config.isConfigured, false);
  assert.equal(config.proxyUrl, '');
  assert.equal(config.publishableKey.startsWith('pk_'), true);
});

test('keeps auth enabled when a publishable key env var is provided', () => {
  const config = getClerkBootstrap({
    hostname: 'shop.example.com',
    publishableKeyEnv: 'pk_test_123',
    proxyUrlEnv: '/api/__clerk',
    basePath: '/shop',
  });

  assert.equal(config.isConfigured, true);
  assert.equal(config.proxyUrl, '/api/__clerk');
  assert.equal(config.basePath, '/shop');
  assert.equal(config.publishableKey, 'pk_test_123');
});
