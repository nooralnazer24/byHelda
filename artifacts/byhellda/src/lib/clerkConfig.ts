import { publishableKeyFromHost } from '@clerk/react/internal';

export interface ClerkBootstrapOptions {
  hostname: string;
  publishableKeyEnv?: string;
  proxyUrlEnv?: string;
  basePath?: string;
}

export interface ClerkBootstrapResult {
  publishableKey: string;
  proxyUrl: string;
  basePath: string;
  isConfigured: boolean;
}

export function getClerkBootstrap(options: ClerkBootstrapOptions): ClerkBootstrapResult {
  const basePath = (options.basePath ?? '').replace(/\/$/, '');
  const publishableKey = publishableKeyFromHost(
    options.hostname,
    options.publishableKeyEnv ?? '',
  );

  const proxyUrl = options.proxyUrlEnv ?? '';
  const isConfigured = Boolean(publishableKey && options.publishableKeyEnv);

  return {
    publishableKey,
    proxyUrl,
    basePath,
    isConfigured,
  };
}
