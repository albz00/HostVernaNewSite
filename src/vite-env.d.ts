/// <reference types="svelte" />
/// <reference types="vite/client" />

interface Window {
  gtag?: (...args: unknown[]) => void;
  _paq?: unknown[][];
}

interface ImportMetaEnv {
  readonly VITE_CLIENT_PORTAL_URL?: string;
  readonly VITE_HONEYBOOK_PORTAL_URL?: string;
}
