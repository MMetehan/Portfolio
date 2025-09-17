// functions/index.js
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    try {
      return await env.ASSETS.fetch(request);
    } catch (err) {
      // fallback to index.html for SPA routing
      return env.ASSETS.fetch(new Request(`${url.origin}/index.html`, request));
    }
  },
};
