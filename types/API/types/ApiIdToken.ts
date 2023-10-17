import { PostLoginAPI } from "../PostLoginAPI";

/**
 * Request changes to the ID token being issued.
 */
export interface ApiIdToken {
    /**
     * Set a custom claim on the ID token that will be issued upon completion of the login flow.
     * @param name Name of the claim (note that this may need to be a fully-qualified URL).
     * @param value The value of the claim.
     * @returns Returns a reference to the api object.
     */
    setCustomClaim(name: String, value: any): PostLoginAPI
}