import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

addEventListener("fetch", (event) => {
  try {
    event.respondWith(getAssetFromKV(event));
  } catch (e) {
    // Asset bulunamazsa index.html döndür (SPA fallback)
    event.respondWith(
      getAssetFromKV(event, {
        mapRequestToAsset: () => new Request("/index.html"),
      })
    );
  }
});
