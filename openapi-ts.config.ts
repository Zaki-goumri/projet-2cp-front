import { createClient } from '@hey-api/openapi-ts';

createClient({
  input: './public/api-docs.json',
  output: './client',
  plugins: ['@hey-api/client-fetch'],
});
