/**
 * Set the requirement for multifactor authentication on the login attempt.
 */
export interface ApiMultifactor {
  /**
   * Enable multifactor authentication for this login flow. When enabled, users must complete the configured multifactor challenge. The actual multifactor challenge will be deferred to the end of the login flow.
   * @param provider The name of the multifactor provider to use or the value any to use any of the configured providers.
   * @param options Additional options for enabling multifactor challenges.
   * @returns Returns a reference to the api object.
   */
  enable(
    provider: "any" | "duo" | "google-authenticator" | "guardian" | "none",
    options: {
      /**
       * Determines if browser should be remembered, so that the multifactor challenge can later be skipped. Defaults to false.
       */
      allowRememberBrowser: boolean | undefined;
      /**
       * Additional options to configure the challenge, only available for the duo provider.
       */
      providerOptions:
        | {
            host: string;
            ikey: string;
            skey: string;
            username: string | undefined;
          }
        | undefined;
    }
  ): void;
}
