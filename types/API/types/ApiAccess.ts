import { PostLoginAPI } from "../PostLoginAPI";

/**
 * Modify the user's login access, such as by rejecting the login attempt.
 */
export interface ApiAccess {
  /**
   * Mark the current login attempt as denied. This will prevent the end-user from completing the login flow. This will NOT cancel other user-related side effects (such as metadata changes) requested by this Action. The login flow will immediately stop following the completion of this action and no further Actions will be executed.
   * @param reason A human-readable explanation for rejecting the login. This may be presented directly in end-user interfaces.
   * @returns Returns a reference to the api object.
   */
  deny(reason?: String): void;
}
