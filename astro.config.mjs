// @ts-check
import { defineConfig } from 'astro/config';

// TODO: trocar pelo domínio final quando existir (ex.: https://bandacontracultura.com.br)
export default defineConfig({
  site: 'https://bandacontracultura.netlify.app',
  trailingSlash: 'ignore',
});
