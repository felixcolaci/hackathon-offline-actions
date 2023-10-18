import { ApiCache } from "./types/APICache"
import { ApiIdToken } from "./types/APIIdToken"
import { ApiMultifactor } from "./types/APIMultifactor"
import { ApiRedirect } from "./types/APIRedirect"
import { ApiSAMLResponse } from "./types/APISAMLResponse"
import { ApiUser } from "./types/APIUser"
import { ApiAccess } from "./types/ApiAccess"
import { ApiAccessToken } from "./types/ApiAccessToken"
import { ApiAuthentication } from "./types/ApiAuthentication"

export interface PostLoginAPI {
    /**
     * Modify the user's login access, such as by rejecting the login attempt.
     */
    access: ApiAccess,
    /**
     * Request changes to the access token being issued.
     */
    accessToken: ApiAccessToken,
    /**
     * Request changes to the authentication state of the current user's session.
     */
    authentication: ApiAuthentication,
    /**
     * Store and retrieve data that persists across executions.
     */
    cache: ApiCache,
    /**
     * Request changes to the ID token being issued.
     */
    idToken: ApiIdToken,
    /**
     * Set the requirement for multifactor authentication on the login attempt.
     */
    multifactor: ApiMultifactor,
    /**
     * Make application-specific changes to the metadata of the user that is logging in.

    NOTE: Invoking these methods won't update the metadata immediately. You can call them several times throughout multiple actions of the same flow and the engine will aggregate the changes and update the metadata at once before the flow is completed.
     */
    user: ApiUser,
    redirect: ApiRedirect,
    /**
     * Modify the SAML Response for the user that is logging in.
     */
    samlResponse: ApiSAMLResponse
}