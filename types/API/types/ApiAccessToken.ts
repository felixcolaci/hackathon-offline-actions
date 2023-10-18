import { PostLoginAPI } from "../PostLoginAPI";

/**
 * Request changes to the access token being issued.
 */
export interface ApiAccessToken {
    /**
     * Set a custom claim on the Access Token that will be issued upon completion of the login flow.
     * @param name Name of the claim (note that this may need to be a fully-qualified URL).
     * @param value The value of the claim.
     * @returns Returns a reference to the api object.
     */
    setCustomClaim(name: String, value: String): PostLoginAPI,
    /**
     * Add a scope on the Access Token that will be issued upon completion of the login flow.
     * @param scope The scope to be added.
     * @returns Returns a reference to the api object.
     */
    addScope(scope: String): PostLoginAPI,
    /**
     * Remove a scope on the Access Token that will be issued upon completion of the login flow.
     * @param scope The scope to be removed.
     * @returns Returns a reference to the api object.
     */
    removeScope(scope: String): PostLoginAPI
}