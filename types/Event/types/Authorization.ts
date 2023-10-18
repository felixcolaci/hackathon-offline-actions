/**
 * An object containing information describing the authorization granted to the user who is logging in.
 */
export interface EventAuthorization {
  /**
   * An array containing the names of a user's assigned roles.
   */
  roles: Array<string>;
}
