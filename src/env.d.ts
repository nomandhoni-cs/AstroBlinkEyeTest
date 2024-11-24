/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  readonly LEMON_SQUEEZY_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}