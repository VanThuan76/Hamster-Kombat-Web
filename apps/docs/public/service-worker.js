/**
 * Service worker that intercepts requests for images
 * and other static assets used by this site.
 *
 * It puts retrieved images in cache for 14 days.
 * If image not found responds with fallback.
 *
 * Based on https://gist.github.com/dsheiko/8a5878678371f950d37f3ee074fe8031#file-service-worker-js
 */

/**
 * RecordKey type.
 * The complete Triforce, or one or more components of the Triforce.
 *
 * @typedef {Object} RecordKey
 * @property {String} ns - namespace
 * @property {String} url - request identifier
 * @property {String} ver - record varsion
 */

/**
 * ExtendableEvent type.
 * @typedef {Object} ExtendableEvent
 *
 * @property {function} waitUntil - Extend the lifetime of the event. See: https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil
 * @returns {Promise<void>}
 */

/**
 * Helper to get current timestamp
 * @returns {Number}
 */
function _now() {
  const d = new Date();
  return d.getTime();
}

function _debug() {
  console.debug.apply(console, ["[service-worker]:", ...arguments]);
}

// const CURRENT_URL = `${self.location.protocol}//${self.location.host}`

const DOMAIN_WHITELIST = [
  "localhost",
  "hamster-admin.alphasius.com",
  "hamster-kombat-sigma.vercel.app",
]; // add any domain you need assets from here
const PROD_DOMAINS = ["example.com"];

const EXTENSION_WHITELIST = [
  "woff",
  "woff2",
  "ttf",
  "eot",
  "otf",
  "png",
  "jpg",
  "jpeg",
  "gif",
  "svg",
  "webp",
];
const PROD_EXTENSIONS = ["css", "js"];
const FALLBACK_IMG = "/fallbacks/fallbacks.jpg";

if (PROD_DOMAINS.includes(self.location.hostname)) {
  // Add extras on production
  DOMAIN_WHITELIST.push(...PROD_DOMAINS);
  EXTENSION_WHITELIST.push(...PROD_EXTENSIONS);
}

const INVALIDATION_INTERVAL = 14 * 24 * 60 * 60 * 1000; // 14 days
const NS = "ASSET";
const SEPARATOR = "::";
const VERSION = Math.ceil(_now() / INVALIDATION_INTERVAL);

/**
 * Build cache storage key that includes namespace, url and record version
 * @param {URL} url
 * @returns {String}
 */
function _buildBucketKey(url) {
  return NS + SEPARATOR + url.hostname + SEPARATOR + "v" + VERSION;
}

/**
 * Parse cache key
 * @param {String} key
 * @returns {RecordKey}
 */
function _parseKey(key) {
  const parts = key.split(SEPARATOR);
  return {
    ns: parts[0],
    key: parts[1],
    ver: parseInt(parts[2].replace(/^[0-9]/gi, ""), 10),
  };
}

/**
 * Invalidate records matching actual version
 *
 * @param {Cache} caches
 * @returns {Promise}
 */
async function _purgeExpiredRecords(caches) {
  _debug("Purging expired assets...");
  return caches.keys().then(function (keys) {
    return Promise.all(
      keys.map(function (key) {
        const record = _parseKey(key);
        if (record.ns === NS && record.ver !== VERSION) {
          _debug("deleting", key);
          return caches.delete(key, record);
        }
      })
    );
  });
}

/**
 * Proxy request using cache-first strategy
 *
 * @param {Cache} caches
 * @param {Request} request
 * @param {URL} url
 * @returns {Promise}
 */
async function _proxyRequest(caches, request, requestUrl) {
  const bucketKey = _buildBucketKey(requestUrl);
  // set namespace
  return caches.open(bucketKey).then(function (cacheBucket) {
    // check cache
    return cacheBucket.match(request).then(function (cachedResponse) {
      if (cachedResponse) {
        _debug("using cache for", request.url);
        return cachedResponse;
      }
      // { mode: "no-cors" } gives opaque response, so we cannot get info about response status
      // https://fetch.spec.whatwg.org/#concept-filtered-response-opaque
      return fetch(request.clone())
        .then(function (networkResponse) {
          if (
            networkResponse.type !== "opaque" &&
            networkResponse.ok === false
          ) {
            throw new Error(
              "[service-worker] Resource not available " + request.url
            );
          }
          _debug(
            "fetching via network 🛜",
            request.url,
            networkResponse.status,
            networkResponse.ok,
            networkResponse.type
          );
          cacheBucket.put(request, networkResponse.clone());
          return networkResponse;
        })
        .catch(function () {
          // TODO: throw if not an image
          return fetch(FALLBACK_IMG, { mode: "no-cors" });
        });
    });
  });
}

self.addEventListener(
  "install",
  /**
   * @param {ExtendableEvent} event
   */
  function (event) {
    event.waitUntil(self.skipWaiting());
  }
);

self.addEventListener(
  "activate",
  /**
   * @param {ExtendableEvent} event
   */
  function (event) {
    event.waitUntil(_purgeExpiredRecords(caches));
  }
);

self.addEventListener("fetch", function (event) {
  const request = event.request;

  //   _debug('Detected request', request.url)
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (!DOMAIN_WHITELIST.includes(url.hostname)) {
    return;
  }

  const exts = EXTENSION_WHITELIST.join("|");
  if (!request.url.match(new RegExp(`\\.(${exts})$`, "gi"))) {
    return;
  }

  //   _debug('Accepted request', request.url)
  event.respondWith(_proxyRequest(caches, request, url));
});
