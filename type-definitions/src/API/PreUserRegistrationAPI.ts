import { ApiAccess, ApiCache, ApiUser } from "./types";

export interface PreUserRegistrationAPI {
  /**
   * Modify the user's login access, such as by rejecting the login attempt.
   */
  access: ApiAccess;
  /**
   * Store and retrieve data that persists across executions.
   */
  cache: ApiCache;

  /**
     * Make application-specific changes to the metadata of the user that is logging in.

    NOTE: Invoking these methods won't update the metadata immediately. You can call them several times throughout multiple actions of the same flow and the engine will aggregate the changes and update the metadata at once before the flow is completed.
     */
  user: ApiUser;
}
