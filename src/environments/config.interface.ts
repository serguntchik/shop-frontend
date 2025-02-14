export type ApiEndpoint = 'products' | 'order' | 'import' | 'bff' | 'cart';

export interface Config {
  production: boolean;
  apiEndpoints: Record<ApiEndpoint, string>;
  apiEndpointsEnabled: Record<ApiEndpoint, boolean>;
}
