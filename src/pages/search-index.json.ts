import type { APIRoute } from 'astro';
import { SEARCH_DOCS } from '../lib/searchData';

// Fetched by the search box the first time it is used.
export const GET: APIRoute = () =>
  new Response(JSON.stringify(SEARCH_DOCS), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
