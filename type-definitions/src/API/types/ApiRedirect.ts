import { PostLoginAPI } from "../PostLoginAPI";

export interface ApiRedirect {
  /**
   * Create a session token suitable for using as a query string parameter redirect target (via sendUserTo) that contains data whose authenticity must be provable by the target endpoint. The target endpoint can verify the authenticity and integrity of the data by checking the JWT's signature using a shared secret.
   * @param options Configure how sensitive data is encoded into the query parameters of the resulting url.
   * @returns Returns a JWT string.
   */
  encodeToken(options: {
    /**
     * Number of seconds before this token will expire (defaults to 900).
     */
    expiresInSeconds: number;
    /**
     * The data intended to be passed to the target of the redirect and whose authenticity and integrity must be provable.
     */
    payload: { [key: string]: any };
    /**
     * A secret that will be used to sign a JWT that is shared with the redirect target. The secret value should be stored as a secret and retrieved using event.secrets['SECRET_NAME'].
     */
    secret: string;
  }): string;
  /**
   * Trigger a browser redirect to the target `url` immediately after this action completes.
   * @param url The url in which to redirect the user.
   * @param options An object representing additional query string parameters that should be appended to the redirect URL.
   * @returns Returns a reference to the api object.
   */
  sendUserTo(
    url: string,
    options: {
      /**
       * Additional query string parameters that should be appended to the redirect URL.
       */
      query: { [key: string]: string };
    }
  ): void;
  /**
   * Retrieve the data encoded in a JWT token passed to the /continue endpoint while verifying the authenticity and integrity of that data.
   * @param options Options for retrieving the data encoded in a JWT token passed to the /continue endpoint following a redirect.
   * @returns Returns payload of the JWT token.
   */
  validateToken(options: {
    /**
     * Secret used to encode the token.
     */
    secret: string;
    /**
     * The name of the query or body parameter that was sent to the /continue endpoint. (defaults to session_token)
     */
    tokenParameterName: string;
  }): { [key: string]: any };
}
