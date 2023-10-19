import { ApiCache } from "./types/ApiCache";
import { ApiRedirect } from "./types/ApiRedirect";
import { ApiAccess } from "./types/ApiAccess";
import { ApiAuthentication } from "./types/ApiAuthentication";

export interface PasswordResetPostChallengeAPI {
    /**
     * Modify the user's login access, such as by rejecting the login attempt.
     */
    access: ApiAccess,
    /**
     * Request changes to the access token being issued.
     */
    authentication: ApiAuthentication,
    /**
     * Store and retrieve data that persists across executions.
     */
    cache: ApiCache,

    redirect: ApiRedirect,

}