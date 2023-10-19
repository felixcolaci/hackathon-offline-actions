/**
 * Store and retrieve data that persists across executions.
 */
export interface ApiCache {
  /**
   * Delete a record describing a cached value at the supplied key if it exists.
   * @param key The key of the record stored in the cache.
   * @returns Returns a CacheWriteResult object with type: "success" if a value was removed from the cache. A failed operation returns type: "error". For errors, the returned object will have a code property that indicates the nature of the failure.
   */
  delete(key: string): {
    type: "success" | "error";
    code: any | undefined;
  };
  /**
     * Retrieve a record describing a cached value at the supplied key, if it exists. If a record is found, the cached value can be found at the value property of the returned object.

    Important: This cache is designed for short-lived, ephemeral data. Items may not be available in later transactions even if they are within their supplied their lifetime.
     * @param key The key of the record stored in the cache.
    @returns Returns a cache record if an item is found in the cache for the supplied key. Cache records are objects with a value property holding the cached value as well as an expires_at property indicating the maximum expiry of the record in milliseconds since the Unix epoch.
     */
  get(key: string):
    | {
        value: string;
        expires_at: number;
      }
    | undefined;
  /**
     * Store or update a string value in the cache at the specified key.

    Values stored in this cache are scoped to the Trigger in which they are set. They are subject to the {@link https://auth0.com/docs/customize/actions/limitations Actions Cache Limits}.

    alues stored in this way will have lifetimes of up to the specified ttl or expires_at values. If no lifetime is specified, a default of lifetime of 15 minutes will be used. Lifetimes may not exceed the maximum duration listed at {@link https://auth0.com/docs/customize/actions/limitations Actions Cache Limits}.
     * @param key The key of the record stored in the cache.
     * @param value The value of the record to be stored.
     * @param options Options for adjusting cache behavior.
     */
  set(
    key: string,
    value: string,
    options:
      | {
          /**
         * The absolute expiry time in milliseconds since the unix epoch. While cached records may be evicted earlier, they will never remain beyond the the supplied expires_at.

        Note: This value should not be supplied if a value was also provided for ttl. If both options are supplied, the earlier expiry of the two will be used.
         */
          expires_at: number | undefined;
          /**
         * The time-to-live value of this cache entry in milliseconds. While cached values may be evicted earlier, they will never remain beyond the the supplied ttl.

        Note: This value should not be supplied if a value was also provided for expires_at. If both options are supplied, the earlier expiry of the two will be used.
         */
          ttl: number | undefined;
        }
      | undefined
  ): {
    type: "success";
    error: Error;
  };
}
