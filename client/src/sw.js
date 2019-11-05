if ('workbox' in self) {
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
  workbox.routing.registerNavigationRoute(
    workbox.precaching.getCacheKeyForURL('/index.html')
  );
}
