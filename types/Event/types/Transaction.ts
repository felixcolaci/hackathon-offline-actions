/**
 * Details about the current transaction.
 */
export interface EventTransaction {
    /**
     * Any acr_values provided in the original authentication request.
     */
    acr_values: Array<String>,
    /**
     * Dynamic Linking ID that allows developers to reference this transaction.
    */
    linking_id: String | undefined,
    /**
     * The locale to be used for this transaction as determined by comparing the browser's requested languages to the tenant's language settings.
     */
    locale: String,
    /**
     * Hint to the Authorization Server about the login identifier the End-User might use to log in (if necessary).
     */
    login_hint: String | undefined,
    /**
     * List of instructions indicating whether the user may be prompted for re-authentication and consent.
     */
    prompt: Array<String> | undefined,
    protocol: "oidc-basic-profile" | "oidc-implicit-profile" | "samlp" | "wsfed" | "wstrust-usernamemixed" | "oauth2-device-code" | "oauth2-resource-owner" | "oauth2-resource-owner-jwt-bearer" | "oauth2-password" | "oauth2-access-token" | "oauth2-refresh-token" | "oauth2-token-exchange" | "oidc-hybrid-profile" | undefined,
    /**
     * The URL to which Auth0 will redirect the browser after the transaction is completed.
     */
    redirect_uri: String | undefined,
    /**
     * The details of a rich authorization request per Section 2 of the Rich Authorization Requests spec at https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rar#section-2.
     */
    requested_authorization_details: EventTransactionRequestedAuthorizationDetails | undefined,
/**
 * The scopes requested (if any) when starting this authentication flow.
 */
    requested_scopes: Array<String>,
    /**
     * Informs the Authorization Server of the mechanism to be used for returning parameters from the Authorization Endpoint.
     */
    response_mode: String | undefined,
    /**
     * Denotes the kind of credential that Auth0 will return.
     */
    response_type: Array<String> | undefined,
    /**
     * An opaque arbitrary alphanumeric string your app adds to the initial request that Auth0 includes when redirecting back to your application.
     */
    state: String | undefined,
    /**
     * The ui_locales provided in the original authentication request.
     */
    ui_locales: Array<String>
}
/**
     * The details of a rich authorization request per Section 2 of the Rich Authorization Requests spec at https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rar#section-2.
     */
interface EventTransactionRequestedAuthorizationDetails {
    type: String
}
