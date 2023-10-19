import { ApiAccess, ApiAuthentication, ApiCache, ApiRedirect } from "./types";

export interface PasswordResetPostChallengeAPI {
  /**
   * Modify the user's login access, such as by rejecting the login attempt.
   */
  access: ApiAccess;
  /**
   * Request changes to the access token being issued.
   */
  authentication: ApiAuthentication;
  /**
   * Store and retrieve data that persists across executions.
   */
  cache: ApiCache;

  redirect: ApiRedirect;
}
