export default {
  async fetch(request, env, ctx) {
    try {
      // assets klasöründen isteği getir
      return await env.ASSETS.fetch(request);
    } catch (err) {
      // SPA fallback: index.html
      const url = new URL(request.url);
      return await env.ASSETS.fetch(
        new Request(`${url.origin}/index.html`, request)
      );
    }
  },
};
