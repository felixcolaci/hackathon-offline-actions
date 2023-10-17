export interface PostLoginEventTransaction {
    acr_values: Array<String>,
        linking_id: String | undefined,
        locale: String,
        login_hint: String | undefined,
        prompt: Array<String> | undefined,
        protocol: "oidc-basic-profile" | "oidc-implicit-profile" | "samlp" | "wsfed" | "wstrust-usernamemixed" | "oauth2-device-code" | "oauth2-resource-owner" | "oauth2-resource-owner-jwt-bearer" | "oauth2-password" | "oauth2-access-token" | "oauth2-refresh-token" | "oauth2-token-exchange" | "oidc-hybrid-profile" | undefined,
        redirect_uri: String | undefined,
        requested_authorization_details: PostLoginEventTransactionRequestedAuthorizationDetails | undefined,
        requested_scopes: Array<String>,
        response_mode: String | undefined,
        response_type: Array<String> | undefined,
        state: String | undefined,
        ui_locales: Array<String>
}

interface PostLoginEventTransactionRequestedAuthorizationDetails {
    type:String
}
